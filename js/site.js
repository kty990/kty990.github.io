let hamburger = document.getElementById("hamburger");
const navContainer = document.getElementById("nav-container");

function toggle() {
    if (navContainer.id == "nav-container") {
        navContainer.id = "nav-container_active";
    } else {
        navContainer.id = "nav-container";
    }
}

async function main() {
    let res = await fetch("/../navbar.html");
    let txt = await res.text();
    let oldelem = document.getElementById("replace-with-navbar");
    let newelem = document.createElement("div");
    newelem.innerHTML = txt;
    oldelem.parentNode.replaceChild(newelem,oldelem);
}

async function setActive() {
    await main();
    let url = window.location.href;
    let commandsNav = document.getElementById("cmds");
    let aboutNav = document.getElementById("about");
    let faqNav = document.getElementById("faq");
    if (url.indexOf("commands") != -1) {
        commandsNav.id = "nav-active";
    } else if (url.indexOf("about") != -1) {
        aboutNav.id = "nav-active";
    } else if (url.indexOf("faq") != -1) {
        faqNav.id = "nav-active";
    }

    if (!hamburger) {
        throw new Error("Unable to adjust for hamburger... must have been eaten!")
    }
    
    hamburger.addEventListener("mousedown", () => {
        console.log("Clicked!");
        toggle();
    });
}

window.addEventListener("resize", (event) => {
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
