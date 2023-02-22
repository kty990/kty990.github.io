let dropdown_flex = document.getElementsByClassName("dropdown-flex")[0];
let q_a = {
    "How do I invite the Homies bot to my server?":"As of right now, you can't! It uses some features that are not meant for public use, but a public version may be released in the future.",
    "What is the homies bot?":"The homies bot is a general purpose discord bot."
}

let faqs = [];

let template = document.getElementsByTagName("template")[0];
for (const [question, answer] of Object.entries(q_a)) {
    let t = template.content.cloneNode(true);
    let title = t.querySelector("div.title").querySelector("p");
    let desc = t.querySelector("div.description").querySelector("p");
    title.textContent = question;
    title.classList.add("title");
    desc.textContent = answer;
    desc.classList.add("description")
    let newDiv = document.createElement("div");
    newDiv.classList.add("dropdown");
    newDiv.appendChild(title);
    newDiv.appendChild(desc);
    dropdown_flex.appendChild(newDiv);
    faqs.push(newDiv);
}

let active_dropdowns = 0;

function toggleFAQ(element) {
    let currentDisplay = element.querySelector(".description").style.display;
    // let _vh = document.documentElement.style.getPropertyValue("--vh");
    // let scrollPosition = document.body.scrollTop;
    if (currentDisplay == "block") {
        element.querySelector(".description").style.display = 'none';
        active_dropdowns--;
        // document.body.scrollTo(scrollPosition - (_vh))
    } else {
        element.querySelector(".description").style.display = 'block';
        active_dropdowns++;
        // document.body.scrollTo(scrollPosition + (_vh))
    }
    document.querySelector(".dropdown-flex").style.padding = `0vh 0vh ${active_dropdowns * 5}vh 0vh`;
}

function activate(element) {
    element.querySelector(".title").addEventListener("mousedown", () => {
        toggleFAQ(element);
    });
}

for (let x = 0; x < faqs.length; x++) {
    activate(faqs[x]);
}
