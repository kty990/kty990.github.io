let hamburger = document.getElementById("hamburger");
const navContainer = document.getElementById("nav-container");

if (!hamburger) {
    throw new Error("Unable to adjust for hamburger... must have been eaten!")
}

function toggle() {
    if (navContainer.id == "nav-container") {
        navContainer.id = "nav-container_active";
    } else {
        navContainer.id = "nav-container";
    }
}

function setActive() {
    let url = window.location.href;
    console.log(`URL: ${url}`);
}

hamburger.addEventListener("mousedown", () => {
    toggle();
});

setActive();
