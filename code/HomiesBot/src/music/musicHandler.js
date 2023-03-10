// ** Dependancies **

const { createAudioResource, createAudioPlayer, AudioPlayerStatus, NoSubscriberBehavior } = require('@discordjs/voice');
const ytdl = require('ytdl-core');
const { getInfo } = require('ytdl-core');
const { GuildMember } = require('discord.js');
const embed = require('../homiesEmbed');

class Timer {
    constructor(duration) {
        this.duration = duration;
        this.left = duration;
        this.running = false;
    }

    start(duration, iteration) {
        if (this.running && !iteration) {
            console.warn("Can't start if already running...");
            return;
        }
        if (duration !== null && duration !== undefined) {
            this.duration = duration;
            this.left = duration;
        }
        this.running = true;
        setTimeout(() => {
            if (!this.running) {
                console.log("Track no longer running, pausing timer.");
                return;
            }
            this.left = this.left - 0.1;
            if (this.left <= 0) {
                this.left = 0;
                this.running = false;
                console.log("Track timer has finished, terminating timer.");
                return;
            }
            this.start(null, true);
        }, 100)
    }

    stop() {
        this.running = false;
    }

    destroy() {
        this.running = null;
        this.left = null;
        this.duration = null;
    }
}

/**
 * A Track stores all of the music data for each song requested through the 'play' command.
 */
class Track {
    /**
     * 
     * @param {string} url 
     * @param {GuildMember} requester 
     * @param {*} info 
     */
    constructor(url, requester, info) {
        this.url = url;
        this.requester = requester;
        this.timer = new Timer(0); // will be set on start
        this.audioResource = null; // set on createAudioResource() call.

        this.info = info;
        this.title = info.videoDetails.title;
        this.duration = info.videoDetails.lengthSeconds;

        // Thumbnail
        var thumbnails = info.videoDetails.thumbnails;
        var thumbnail = thumbnails[0];
        for (var x = 0; x < thumbnails.length; x++) {
            if (thumbnails[x].width >= thumbnail.width) {
                thumbnail = thumbnails[x];
            }
        }
        this.thumbnail = thumbnail;
    }

    /**
     * This method attempts to create a <Readable> object of audio for discordjs.AudioPlayer to play.
     * 
     * @returns Promise<AudioResource>
     */
    createAudioResource() {
        return new Promise((resolve, reject) => {
            const stream = ytdl(this.url, { filter: 'audioonly' });
            if (stream) {
                let result = createAudioResource(stream);
                this.audioResource = result;
                resolve(result);
            }
            else reject(new Error("Unable to load stream data."));
        })
    }
}

/**
 * A subscription is used for each VoiceConnection that the bot plays music for.
 */
class Subscription {


    /*
    Has to be added later:
    
    var countdown = SONG_DURATION;
    
    const interval = setInterval(() => {
    track.timeLeft--;
     if (track.timeLeft < 0 || SONG_IS_PAUSED || SONG_NO_EXISTS) clearInterval(interval);
    }, 1000);
    */


    constructor(client, message, voiceConnection, voiceChannel, onPlay, onAdd) {
        if (voiceConnection === null || voiceConnection === undefined) {
            throw new Error("Unable to initialize Subscription for null or undefined connection.");
        }
        this.voiceChannel = voiceChannel;
        this.voiceConnection = voiceConnection;
        this.readyLock = false;
        this.queueLock = false;
        this.queue = [];
        this.queueLength = 0;
        this.queueLoop = false;
        this.currentTrack = null;
        this.onPlay = onPlay;
        this.client = client;
        this.onAdd = onAdd;
        this.audioPlayer = createAudioPlayer({
            behaviors: {
                noSubscriber: NoSubscriberBehavior.Pause,
            }
        });
        this.voiceConnection.subscribe(this.audioPlayer);
        this.audioPlayer.on('stateChange', (oldState, newState) => {
            try {
                if (newState.status === AudioPlayerStatus.Idle) {
                    console.log("Idle has been detected, attempting to restart player using new track");
                    this.processQueue();
                    if (this.currentTrack !== null) {
                        this.currentTrack.timer.stop();
                    }
                } else {
                    if (!this.currentTrack.timer.running) {
                        this.currentTrack.timer.start();
                    }
                    console.error(`State "${newState.status}" has been detected`);
                }
            } catch (e) {
                console.warn(`\n\nAn error occured at stateChange: ${e}\n\n`)
            }
        });

        this.audioPlayer.on('error', error => {
            console.warn(`\n\nAn unhandled audioPlayer error occured: ${error}\n\n`);
            try {
                embed(this.client, e => {
                    e.color = 0xeb4034;
                    if (`${error}`.length >= 1025) {
                        e.description = `Error message too long to send`;
                    } else {
                        e.description = `${error}`;
                    }
                    e.title = `An unexpected AudioPlayer error occured!`;
                    e.footer.text = "An error occured.";
                    message.channel.send({
                        embeds: [e],
                    })
                        .catch(console.error);
                });
            } catch (e) {
                console.error(e);
            }
        });
    }

    /**
     * Adds a track to the queue.
     * 
     * @param {Track} track 
     */
    enqueue(track, skip) {
        if (this.queue === null) return;
        this.queue.push(track);
        if (!skip) this.queueLength++;
        this.processQueue();
    }

    /**
     * This method is not working, requires check for tracks, which resolves when check returns true
     * 
     * @param {*} member 
     * @param {*} URLs 
     * @returns Promise
     */
    DevelopPlaylist(member, URLs) {
        return new Promise(async (resolve, reject) => {
            let tracks = {};
            let duration = [];

            function equates() {
                let result = false;
                for (let x = 0; x < URLs.length; x++) {
                    if (tracks[`${x}`] === undefined) {
                        result = true;
                        break;
                    }
                }
                return result;
            }

            /**
             * 
             * Recursive function that waits 
             * @param ms
             * miliseconds and checks whether
             * tracks.length == URLs.length . If it is true,
             * @param finishedCallback
             * is called and the function is terminated.
             */
            function WaitUntil(ms, finishedCallback) {
                setTimeout(() => {
                    if (equates()) {
                        WaitUntil(ms, finishedCallback);
                    } else {
                        finishedCallback();
                        return;
                    }
                }, ms);
            }
            for (let x = 0; x < URLs.length; x++) {
                let url = URLs[x];
                console.log(`Looking at ${url}\n`);
                if (typeof url === "string") {
                    getInfo(url)
                        .then(info => {
                            duration.push(parseInt(info.videoDetails.lengthSeconds));
                            console.log(x);
                            let track = new Track(url, member, info);
                            tracks[`${x}`] = track;
                        })
                        .catch(console.error);
                }

            }
            WaitUntil(300, () => {
                let d = 0;
                for (let x = 0; x < duration.length; x++) {
                    d = d + duration[x];
                }
                resolve({
                    "tracks": tracks,
                    "duration": d,
                });
            });
        });
    }

    async playlistEnqueue(message, URLs) {
        if (this.queue === null) return;
        let member = message.member;
        let result = await this.DevelopPlaylist(member, URLs)
            .catch(console.error);
        let tracks = result['tracks'];
        let duration = result['duration'];
        for (let x = 0; x < URLs.length; x++) {
            this.enqueue(tracks[`${x}`]);
        }
        console.log(`Attempting to process playlist queue`);
        this.processQueue(false, true);
        return {
            'duration': duration,
        }
    }

    /**
     * @param {function} onPlay Callback
     * 
     * @returns void
     */
    SetOnPlay(onPlay) {
        this.onPlay = onPlay;
    }

    /**
     * Untested method: May not work as intended.
     * 
     * @returns Promise
     */
    shuffle() {
        if (this.queue === null) return;
        let currentIndex = this.queue.length, randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex != 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [this.queue[currentIndex], this.queue[randomIndex]] = [
                this.queue[randomIndex], this.queue[currentIndex]];
        }
    }

    /**
     * Destroys the subscription.
     */
    destroy() {
        try {
            this.voiceChannel = null;
            this.voiceConnection = null;
            this.readyLock = null;
            this.queueLock = null;
            this.queue = null;
            this.currentTrack = null;
            this.onPlay = null;
            this.onAdd = null;
            this.onEmpty = null;
            this.audioPlayer.removeAllListeners();
            this.audioPlayer = null;
            if (this.currentTrack !== null) {
                if (this.currentTrack.timer != null) {
                    this.currentTrack.timer.destroy();
                    this.currentTrack.timer = null;
                }
            }
        } catch (e) {
            console.error(`Error on Subscription.destroy(): ${e}`);
        }
    }

    /**
     * @param {function} onAdd Callback
     * 
     * @returns void
     */
    SetOnAdd(onAdd) {
        this.onAdd = onAdd;
    }

    /**
     * @param {function} onEmpty Callback
     * 
     * @returns void
     */
    SetOnEmpty(onEmpty) {
        this.onEmpty = onEmpty;
    }

    /**
     * Returns the current queue
     * 
     * @returns queue : Track
     */
    GetQueue() {
        return {
            'playing': this.currentTrack,
            'queue': this.queue
        };
    }

    /**
     * Stops the current track.
     * 
     * @returns void
     */
    Stop() {
        if (this.queue === null) return;
        try {
            this.queue = [];
            if (this.currentTrack) {
                this.currentTrack.timer.destroy();
            }
            this.currentTrack = null;
            this.audioPlayer.stop(true);
            console.log("Forced stop! @ musicHandler.js");
        } catch (e) {
            console.error(`Error at Subscription.Stop(): ${e}`);
        }
    }

    /**
     * 
     */
    SkipTrack() {
        if (this.queue === null) throw new Error("Unable to skip **null** track.");
        if (this.currentTrack === null) throw new Error("Unable to skip **null** track.");
        if (this.queue.length === 0) {
            this.Stop();
        };
        if (this.currentTrack) {
            this.currentTrack.timer.stop();
        }
        if (this.queue.length !== 0) {
            this.processQueue(true, false);
        }
        // } else {
        //     if (this.onEmpty) {
        //         this.onEmpty();
        //         console.log("---EMPTY QUEUE---");
        //     }
        // }
    }

    /**
     * Not implemented
     */
    PauseTrack() {
        if (this.queue === null) return;
        try {
            this.audioPlayer.pause();
            this.currentTrack.timer.stop();
        } catch (e) {
            console.error(`Error at Subscription.PauseTrack(): ${e}`);
        }
    }

    /**
     * Not implemented
     */
    ResumeTrack() {
        if (this.queue === null) return;
        try {
            this.audioPlayer.unpause();
            this.currentTrack.timer.start();
        } catch (e) {
            console.error(`Error at Subscription.ResumeTrack(): ${e}`);
        }
    }

    /**
     * This method attempts to play an item from the queue
     * @param {boolean | null} skip 
     * 
     * @returns boolean
     */
    async processQueue(skip, isPlaylist) {
        if (this.queue === null) return;
        try {
            if ((skip === false || skip === null || skip === undefined) && (this.queueLock || this.audioPlayer.state.status !== AudioPlayerStatus.Idle || this.queue.length === 0)) {
                console.debug(`Unable to process queue: \nQueueLock: ${this.queueLock}\nStatus: ${this.audioPlayer.state.status}\nQueue: ${this.queue.length}`);
                if (this.audioPlayer.state.status === AudioPlayerStatus.Playing) {
                    if (this.onAdd) {
                        try { // for debugging purposes
                            if (!isPlaylist) this.onAdd(this.queue[this.queue.length - 1]);
                        } catch (e) {
                            console.error(e);
                        }
                    }
                }
                if (this.queue.length === 0 && !this.queueLock && (this.audioPlayer.state.status === AudioPlayerStatus.Idle || this.audioPlayer.state.status === AudioPlayerStatus.AutoPaused)) {
                    if (this.onEmpty) {
                        this.onEmpty();
                        console.log("...EMPTY QUEUE...");
                    }
                }
                return;
            }
            // Lock the queue to guarantee safe access
            this.queueLock = true;

            // Take the first item from the queue. This is guaranteed to exist due to the non-empty check above.
            if (this.queueLoop && this.currentTrack) {
                this.queue.push(this.currentTrack);
            }
            this.currentTrack = this.queue.shift();
            try {
                // Attempt to convert the Track into an AudioResource (i.e. start streaming the video)
                const resource = await this.currentTrack.createAudioResource();
                if (this.currentTrack.timer.running) {
                    this.currentTrack.timer.stop();
                    this.currentTrack.timer.destroy();
                    this.currentTrack.timer = null;
                    this.currentTrack.timer = new Timer(this.currentTrack.duration);
                }
                this.currentTrack.timer.start(this.currentTrack.duration);

                this.audioPlayer.play(resource);
                if (this.onPlay) {
                    this.onPlay(this.currentTrack);
                }


                this.queueLock = false;
            } catch (error) {
                // If an error occurred, try the next item of the queue instead
                this.queueLock = false;
                return this.processQueue();
            }
        } catch (e) {
            console.error(`Error at Subscription.processQueue(): ${e}`);
        }
    }
}

module.exports = { Track, Subscription };
