/* Debugging version control */
let v = 5;
const ERROR_LENGTH = 3000; // 3 seconds
console.log(`Version: ${v}`);

/* Functions */
function toggle() {
    let navContainer = document.getElementById("nav-container") || document.getElementById("nav-container_active");
    let discordNav = document.getElementsByClassName("discord")[0] || document.getElementsByClassName("discord_nav_active")[0];

    if (navContainer.id == "nav-container") {
        navContainer.id = "nav-container_active";
    } else {
        navContainer.id = "nav-container";
        if (discordNav.classList.contains("discord_nav_active")) {
            toggleDiscord();
            console.log("Toggled");
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

async function main() {
    let res = await fetch("/../main/navbar.html");
    let txt = await res.text();
    let oldelem = document.getElementById("replace-with-navbar");
    if (!oldelem) {
        return;
    }
    let newelem = document.createElement("div");
    newelem.innerHTML = txt;
    oldelem.parentNode.replaceChild(newelem,oldelem);
}

async function setActive() {
    await main().catch(console.log);
    
    let url = window.location.href;
    let commandsNav = document.getElementById("cmds");
    let aboutNav = document.getElementById("about");
    let faqNav = document.getElementById("faq");
    let homeNav = document.getElementById("home");
    let discordNav = document.getElementsByClassName("discord")[0] || document.getElementsByClassName("discord_nav_active")[0];
    let hamburger = document.getElementById("hamburger");
    if (url.indexOf("commands") != -1) {
        commandsNav.id = "nav-active";
        discordNav.id = "discord-page";
    } else if (url.indexOf("about") != -1) {
        aboutNav.id = "nav-active";
        discordNav.id = "discord-page";
    } else if (url.indexOf("faq") != -1) {
        faqNav.id = "nav-active";
        discordNav.id = "discord-page";
    } else if (url.indexOf("home") != -1) {
        homeNav.id = "nav-active";
        discordNav.id = "discord";
    }

    if (!hamburger) {
        throw new Error("The hamburger was eaten!");
    }
    
    hamburger.addEventListener("mousedown", () => {
        toggle();
    });
    
    let discord = document.getElementById("discord") || document.getElementById("discord-page");

    discord.addEventListener("mousedown", () => {
        toggleDiscord();
    });
}

/* Events & Run */

window.addEventListener("resize", (event) => {
    let navContainer = document.getElementById("nav-container") || document.getElementById("nav-container_active");
    if (window.innerWidth <= 1080 && navContainer.id == "nav-container_active") {
        navContainer.id = "nav-container";
    }
});

let vh = window.innerHeight * 0.01;
let vw = window.innerWidth * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
document.documentElement.style.setProperty('--vw', `${vw}px`);

window.addEventListener('resize', () => {
  let vh = window.innerHeight * 0.01;
  let vw = window.innerWidth * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  document.documentElement.style.setProperty('--vw', `${vw}px`);
});

setActive().catch(console.log);


addEventListener('error', (event) => {
    let error = event.message;
    let errObj = document.createElement("div");
    errObj.style.position = "fixed";
    errObj.style.right = "calc(var(--vw, 1vw) * 5)";
    errObj.style.color = "#fff";
    errObj.style.backgroundColor = "#cccccc7d";
    errObj.style.borderRadius = "50px";
    errObj.style.borderColor = "#000000cc";
    errObj.style.borderStyle = "solid";
    errObj.style.zIndex = "99"; // should be on top of everything
    errObj.style.backdropFilter = "blur(3)";
    errObj.style.textAlign = "center";
    errObj.style.fontSize = "calc(var(--vh, 1vh) * 1.5)";
    errObj.style.padding = "5px";
    errObj.textContent = error;
    document.appendChild(errObj);
    setTimeout(() => {
        errObj.remove();
    },ERROR_LENGTH);
});