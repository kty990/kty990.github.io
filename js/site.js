let hamburger = document.getElementById("hamburger");
const navContainer = document.getElementById("nav-container");

let commandsNav = document.getElementById("cmds");
let aboutNav = document.getElementById("about");
let faqNav = document.getElementById("faq");

function toggle() {
    if (navContainer.id == "nav-container") {
        navContainer.id = "nav-container_active";
    } else {
        navContainer.id = "nav-container";
    }
}

function setActive() {
    let url = window.location.href;
    if (url.indexOf("commands") != -1) {
        commandsNav.id = "nav-active";
    } else if (url.indexOf("about") != -1) {
        aboutNav.id = "nav-active";
    } else if (url.indexOf("faq") != -1) {
        faqNav.id = "nav-active";
    }
}

window.addEventListener("resize", (event) => {
    if (window.innerWidth <= 1080 && navContainer.id == "nav-container_active") {
        navContainer.id = "nav-container";
    }
});

if (!hamburger) {
    throw new Error("Unable to adjust for hamburger... must have been eaten!")
}

hamburger.addEventListener("mousedown", () => {
    toggle();
});

setActive();
