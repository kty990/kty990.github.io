const commands = {
    "//aliases [page]": "Display a list of aliases for up to 10 commands per page.",
    "//bugs [page]": "Display a list of known bugs with the bot.",
    "//cmds [page]": "Display a list of up to 10 commands per page.",
    "//coinflip": "Flip a coin. Will it be heads or tails?",
    "//gtw": "Starts a 'guess the word' game. You get 3 guesses.",
    "//help [command name]": "Displays information on the specified command. If no command is provided, it defaults to the 'help' command.",
    "//info": "Display info about a user.",
    "//join": "Forces the bot into your voice channel. If the bot is already in a channel, or you are not in a voice channel it will not join.",
    "//leave": "Forces the bot to leave your voice channel. If you or the bot are not in a voice channel, nothing happens.",
    "//loopqueue": "Loops the song queue.",
    "//nowplaying": "Shows information on the current sound track.",
    "//password [length]": "DMs the user with a randomly generated password with the specified length.",
    "//pause": "Pauses the current sound track.",
    "//play [url / query]": "Add a sound track to the queue. YouTube link or query required.",
    "//premove": "This is not chess! You can't premove here!",
    "//purge [count]": "Purge messages from the channel.",
    "//queue [page]": "Display the current sound track queue.",
    "//resume": "Resume the current sound track if it was paused.",
    "//say [message]": "Forces the bot to say everything after the 'say' command (in the same message).",
    "//serverinfo": "Display info about the current discord server/guild.",
    "//shuffle": "Shuffles the sound track queue.",
    "//skip": "Skips the current sound track if one is playing/paused."
}

let last_cmd = "//skip";

let template = document.getElementsByTagName("template")[0];
let cmdList = document.getElementById("command-list");
for (const [cmd, desc] of Object.entries(commands)) {
    let c = template.content.cloneNode(true);
    for (const child of c.children[0].children) {
        if (child.tagName == "H4") {
            child.textContent = cmd;
        } else {
            child.textContent = desc;
        }
    }
    if (cmd == last_cmd) {
        c.children[1].remove();
    }
    cmdList.appendChild(c);
}



let scrollMsg = document.getElementById("scroll-dir");
if (scrollMsg) {
    document.onscroll = () => {
        let scrollTop = document.body.scrollTop;
        var scrollBottom = document.documentElement.scrollHeight - window.innerHeight - scrollTop;
        if (window.scrollY + 10 >= scrollBottom) {
            scrollMsg.style.display = "none";
        } else {
            scrollMsg.style.display = "block";
        }
        console.log(`sb: ${scrollBottom}\tsy: ${window.scrollY}`);
    }
} else {
    throw new Error("Unable to control scroll message.. scroll message not found.");
}