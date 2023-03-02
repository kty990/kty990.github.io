const arrows = {
    "right":"→",
    "left":"←"
}

class Media {
    constructor(image_path, social_type, display_text, link) {
        this.image = "../res/images/" + image_path;
        this.social_type = social_type;
        this.text = display_text;
        this.href = link;
    }
}

let template = document.getElementsByTagName("template")[0];
function display(media) {
    let tmp = document.createElement("div");
    let a = document.createElement("a");
    a.textContent = media.text;
    a.href = media.href;
    let img = document.createElement("img");
    img.src = media.image;
    img.classList.add("social_icon");
    a.classList.add("social_text");
    tmp.classList.add("social_elem");

    tmp.appendChild(img);
    tmp.appendChild(a);
    template.parentElement.appendChild(tmp);
}

let medias = [
    new Media("instagram.png","Instagram","t.kutcher", "https://www.instagram.com/t.kutcher/"),
    new Media("snaplogo.png","Snapchat","kty990", "../res/images/snapcode.png")
]

for (let x = 0; x < medias.length; x++){
    display(medias[x]);
}

/* "Slideshow" */

let img_template = "../res/images/"
let images = [
    `${img_template}placeholder_img.png`,
    `${img_template}discordicon.png`,
    `${img_template}instagram.png`,
    `${img_template}temp_bg.png`
];

let dots = document.getElementsByClassName("dot");
let slideshow_img = document.getElementById("slideshow_image");
let current_dot = 0;
let arrow_elems = document.getElementsByClassName("arrow-btn");
let left_arrow = null;
let right_arrow = null;

for (let x = 0; x < arrow_elems.length; x++) {
    if (arrow_elems[x].textContent == arrows["left"]) {
        left_arrow = arrow_elems[x];
    }
    if (arrow_elems[x].textContent == arrows["right"]) {
        right_arrow = arrow_elems[x];
    }
}

function decrement() {
    dots[current_dot].classList.remove("active-dot");
    current_dot--;
    if (current_dot < 0) {
        current_dot = dots.length - 1;
    }
    dots[current_dot].classList.add("active-dot");
    slideshow_img.src = images[current_dot];
}

function increment() {
    dots[current_dot].classList.remove("active-dot");
    current_dot++;
    if (current_dot >= dots.length) {
        current_dot = 0;
    }
    dots[current_dot].classList.add("active-dot");
    slideshow_img.src = images[current_dot];
}

left_arrow.addEventListener("mousedown", () => {
    decrement();
});

right_arrow.addEventListener("mousedown", () => {
    increment();
});

const DURATION = 5000;
setTimeout(() => {
    increment();
}, DURATION)