/* Debugging version control */
let v = 9.1;
const ERROR_LENGTH = 4 * 1000; // 4 seconds
console.log(`Version: ${v}`);

if (localStorage.getItem("flashing") == undefined || localStorage.getItem("flashing") == null) {
    localStorage.setItem("flashing", "true");
}

/* Functions */
let cache = {};
const request = (url, params = {}, method = 'GET') => {
    // Quick return from cache.
    let cacheKey = JSON.stringify({ url, params, method });
    if (cache[cacheKey]) {
        return cache[cacheKey];
    }
    let options = {
        method
    };
    if (method === 'GET') {
        url += '?' + (new URLSearchParams(params)).toString();
    } else { // Post
        options.body = JSON.stringify(params);
    }

    const result = fetch(url, options).then(response => response.json());
    cache[cacheKey] = result;
    return result;
};

function toggle() {
    let navContainer = document.getElementById("nav-container") || document.getElementById("nav-container_active");
    let discordNav = document.getElementsByClassName("discord")[0] || document.getElementsByClassName("discord_nav_active")[0];

    if (localStorage.getItem("flashing") == "true") {
        localStorage.setItem("flashing", "false");
        let flash = document.getElementById("hamburger-flash");
        flash.style.visibility = "hidden";
    }

    if (navContainer.id == "nav-container") {
        navContainer.id = "nav-container_active";
    } else {
        navContainer.id = "nav-container";
        if (discordNav.classList.contains("discord_nav_active")) {
            toggleDiscord();
            // console.log("Toggled");
        } else {
            console.log(`List: ${discordNav.classList}\nContains: ${discordNav.classList.contains("discord-active")}\n`);
        }
    }
}

function toggleDiscord() {
    let dropdown = document.getElementsByClassName("side-drop")[0] || document.getElementsByClassName("discord-active")[0];
    let discordNav = document.getElementsByClassName("discord")[0] || document.getElementsByClassName("discord_nav_active")[0];

    if (dropdown.classList.contains("discord-active")) {
        dropdown.classList.remove("discord-active");
        dropdown.classList.add("side-drop");
        discordNav.classList.remove("discord_nav_active");
        discordNav.classList.add("discord");
    } else {
        dropdown.classList.add('discord-active');
        dropdown.classList.remove("side-drop");
        discordNav.classList.add("discord_nav_active");
        discordNav.classList.remove("discord");
    }
}

function hashString(str) {
    return encodeURIComponent(str);
}

async function main() {
    // Navbar
    let res = await fetch("/../main/navbar.html");
    let txt = await res.text();
    let oldelem = document.getElementById("replace-with-navbar");
    if (!oldelem) {
        return;
    }
    let newelem = document.createElement("div");
    newelem.innerHTML = txt;
    oldelem.parentNode.replaceChild(newelem, oldelem);
}

async function setActive() {

    await main().catch(console.log);

    let url = window.location.href;
    let commandsNav = document.getElementById("cmds");
    let aboutNav = document.getElementById("about");
    let mainAbout = document.getElementById("main_about");
    let faqNav = document.getElementById("faq");
    let codeNav = document.getElementById("code");
    let homeNav = document.getElementById("home");
    let discordNav = document.getElementsByClassName("discord")[0] || document.getElementsByClassName("discord_nav_active")[0];
    let hamburger = document.getElementById("hamburger");
    if (url.indexOf("commands") != -1) {
        commandsNav.id = "nav-active";
        discordNav.id = "discord-page";
    } else if (url.indexOf("about") != -1) {
        if (url.indexOf("discord") != -1) {
            aboutNav.id = "nav-active";
            discordNav.id = "discord-page";
        } else {
            mainAbout.id = "nav-active";
            discordNav.id = "discord";
        }
    } else if (url.indexOf("faq") != -1) {
        faqNav.id = "nav-active";
        discordNav.id = "discord-page";
    } else if (url.indexOf("home") != -1) {
        homeNav.id = "nav-active";
        discordNav.id = "discord";
    } else if (url.indexOf("code") != -1) {
        codeNav.id = "nav-active";
        discordNav.id = "discord";
    }

    if (!hamburger) {
        throw new Error("The hamburger was eaten!");
    }

    hamburger.addEventListener("mousedown", () => {
        toggle();
    });

    if (window.location.hash == undefined) {
        window.location.hash = hashString("direct");
    } else if (window.location.hash.length == 0) {
        window.location.hash = hashString("direct");
    }

    if (window.location.hash != "#direct") {
        console.error(`Not direct: ${window.location.hash}`);
        if (localStorage.getItem("flashing") == "true") {
            localStorage.setItem("flashing", "false");
            let flash = document.getElementById("hamburger-flash");
            flash.style.visibility = "hidden";
        }
    }

    if (localStorage.getItem("flashing") == "false") {
        let flash = document.getElementById("hamburger-flash");
        flash.style.visibility = "hidden";
    }

    let discord = document.getElementsByClassName("discord")[0] || document.getElementsByClassName("discord_nav_active")[0];

    discord.addEventListener("mousedown", () => {
        // console.debug("Test : Discord");
        toggleDiscord();
    });
}

/* Events & Run */

let vh = window.innerHeight * 0.01;
let vw = window.innerWidth * 0.01;
let last_window_resize_check = null;
document.documentElement.style.setProperty('--vh', `${vh}px`);
document.documentElement.style.setProperty('--vw', `${vw}px`);
document.documentElement.style.setProperty('--vwh', `${Math.min(vh, vw)}px`);

let last_width = window.innerWidth;

window.addEventListener('resize', () => {
    let navContainer = document.getElementById("nav-container") || document.getElementById("nav-container_active");
    if (window.innerWidth <= 1080 && navContainer.id == "nav-container_active") {
        navContainer.id = "nav-container";
    }

    let vh = window.innerHeight * 0.01;
    let vw = window.innerWidth * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    document.documentElement.style.setProperty('--vw', `${vw}px`);
    document.documentElement.style.setProperty('--vwh', `${Math.min(vh, vw)}px`);

    let dropdown = document.getElementsByClassName("side-drop")[0] || document.getElementsByClassName("discord-active")[0];
    if (window.innerWidth <= 1080 && last_width > 1080) {
        if (dropdown.classList.contains("discord-active")) {
            dropdown.classList.remove("discord-active");
            dropdown.classList.add("side-drop");
            discordNav.classList.remove("discord_nav_active");
            discordNav.classList.add("discord");
        }
    } else if (window.innerWidth > 1080 && last_width <= 1080) {
        if (dropdown.classList.contains("discord-active")) {
            dropdown.classList.remove("discord-active");
            dropdown.classList.add("side-drop");
            discordNav.classList.remove("discord_nav_active");
            discordNav.classList.add("discord");
        }
    }

});

setActive().catch(console.log);

function OnError(message) {
    let errObj = document.createElement("div");
    errObj.style.position = "fixed";
    errObj.style.right = "calc(var(--vw, 1vw) * 5)";
    errObj.style.bottom = "0px";
    errObj.style.color = "#fff";
    errObj.style.backgroundColor = "#cccccc7d";
    errObj.style.borderRadius = "50px";
    errObj.style.borderColor = "#000000cc";
    errObj.style.borderStyle = "solid";
    errObj.style.zIndex = "99"; // should be on top of everything
    errObj.style.backdropFilter = "blur(3)";
    errObj.style.textAlign = "center";
    errObj.style.fontSize = "calc(var(--vh, 1vh) * 3)";
    errObj.style.padding = "5px";
    errObj.textContent = message;
    document.body.appendChild(errObj);
    setTimeout(() => {
        errObj.remove();
    }, ERROR_LENGTH);
}

window.onerror = function (message, source, lineno, colno, error) {
    let msg = message;
    if (message == "Script error.") {
        msg = "An unknown script error has occured.";
    }
    OnError(msg);
}


