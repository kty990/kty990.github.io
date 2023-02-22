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