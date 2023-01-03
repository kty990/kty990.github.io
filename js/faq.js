let dropdowns = document.getElementsByClassName("dropdown");

let active_dropdowns = 0;

function toggleFAQ(element) {
    let currentDisplay = element.querySelector(".description").style.display;
    if (currentDisplay == "block") {
        element.querySelector(".description").style.display = 'none';
        active_dropdowns--;
    } else {
        element.querySelector(".description").style.display = 'block';
        active_dropdowns++;
    }
    document.querySelector(".dropdown-flex").style.padding = `0vh 0vh ${active_dropdowns * 5}vh 0vh`;
}

function activate(element) {
    element.querySelector(".title").addEventListener("mousedown", () => {
        toggleFAQ(element);
    });
}

for (let x = 0; x < dropdowns.length; x++) {
    activate(dropdowns[x]);
}
