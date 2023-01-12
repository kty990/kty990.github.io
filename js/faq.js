let dropdown_flex = document.getElementsByClassName("dropdown-flex")[0];
let q_a = {
    "This is the question":"This is the answer"
}

let template = document.getElementsByTagName("template")[0];
for (const [question, answer] of Object.entries(q_a)) {
    let t = template.content.cloneNode(true);
    let title = t.querySelector("div.title").querySelector("p");
    let desc = t.querySelector("div.description").querySelector("p");
    title.textContent = question;
    desc.textContent = answer;
    let newDiv = document.createElement("div");
    newDiv.classList.add("dropdown");
    newDiv.appendChild(title);
    newDiv.appendChild(desc);
    dropdown_flex.appendChild(newDiv);
}

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
