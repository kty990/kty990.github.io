let hamburger = document.getElementById("hamburger");

if (!hamburger) {
    throw new Error("Unable to adjust for hamburger... must have been eaten!")
}

hamburger.addEventListener("mousedown", () => {
    console.log("Mouse down");
});
