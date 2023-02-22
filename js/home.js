class Project {
    constructor(name, properties) {
        this.name = name;
        this.properties = properties;
    }

    GetName() {
        return this.name;
    }
}

class Media {
    constructor(image_path, social_type, display_text, link) {
        this.image = "../res/images/" + image_path;
        this.social_type = social_type;
        this.text = display_text;
        this.href = link;
    }
}

class CustomCSS {
    constructor() {
        this.classes = [];
        this.ids = [];
    }

    CreateCSSClass(className, attributes) {
        if (this.classes.includes(className)) {
            throw new Error(`Unable to create class "${className}". Class already exists.`);
        }
        let style = document.createElement('style');
        let s = `.${className} {\n`;
        for (const [key, value] of Object.entries(attributes)) {
            s = s + `${key}: ${value};`;
        }
        s = s + "\n}";

        style.innerHTML = s;
        document.getElementsByTagName('head')[0].appendChild(style);
        this.classes.push(className);
    }

    CreateCSSId(IDName, attributes) {
        if (this.ids.includes(IDName)) {
            throw new Error(`Unable to create class "${IDName}". Class already exists.`);
        }
        let style = document.createElement('style');
        let s = `#${IDName} {\n`;
        for (const [key, value] of Object.entries(attributes)) {
            s = s + `${key}: ${value};`;
        }
        s = s + "\n}";

        style.innerHTML = s;
        document.getElementsByTagName('head')[0].appendChild(style);
        this.classes.push(IDName);
    }
}

const colorField = {
    "JAVASCRIPT": "#f5e042",
    "HTML": "#f56342",
    "CSS": "#c040f7",
    "PYTHON": "#c9b81a",
    "JAVA": "#a86f32"
}

function getJSON(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
        var status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
};

let myProjects = [];

let username = "kty990"
let repo_url = `https://api.github.com/users/${username}/repos`

function load_projects() {
    return new Promise((resolve, reject) => {
        getJSON(repo_url, function (err, data) {
            if (err != null) {
                console.error(`Error in getJson occured: ${err}`);
                reject(`An error occured trying to load github url: ${err}`);
            } else {
                for (let x = 0; x < data.length; x++) {
                    let repo_name = data[x].name;
                    if (repo_name == "kty990.github.io") {
                        document.getElementById("project-list-subtitle").textContent = data[x].updated_at.split("T")[1].replace("Z", "");
                    }
                    let language_url = `https://api.github.com/repos/kty990/${repo_name}/languages`;
                    getJSON(language_url, function (e, d) {
                        if (e != null) {
                            console.error(`Error in language obtain: ${e}`);
                        } else {
                            let language_tmp = {};
                            let total = 0;
                            for (const [language, count] of Object.entries(d)) {
                                console.log(`L: ${language}\tC: ${count}`);
                                language_tmp[language] = count;
                                total = total + count;
                            }
                            for (const [l, c] of Object.entries(language_tmp)) {
                                language_tmp[l] = c / total;
                            }
                            myProjects.push(new Project(repo_name, language_tmp));
                            if (myProjects.length == data.length) {
                                myProjects = myProjects.sort((a, b) => {
                                    if (a.name > b.name) {
                                        return 1
                                    } else {
                                        return -1
                                    }
                                })
                                resolve();
                            }
                        }
                    });
                }

            }
        });
    });
}

async function main() {
    await load_projects();

    let target = document.getElementById("project-flex");
    for (let project of myProjects) {
        let obj = document.createElement("div");
        obj.classList.add("project");
        let p = document.createElement("p");
        p.style.color = "#fff";
        p.style.textAlign = "center";
        p.style.width = "100%";
        p.style.height = "50%";
        p.style.fontSize = "calc(var(--vh, 1vh) * 2)"
        p.textContent = project.GetName();
        let slide = document.createElement("div");
        slide.style.position = "relative";
        slide.style.width = "75%";
        slide.style.height = "25%";
        slide.style.left = "12.5%";
        slide.style.display = "flex";
        slide.style.flexDirection = "row";
        slide.style.marginTop = "calc(var(--vh,1vh)*-2)";
        slide.style.marginBottom = "10%";
        let x = 0;
        for (const [key, value] of Object.entries(project.properties)) {
            let lang = document.createElement("div");
            if (x == 0) {
                lang.style.borderBottomLeftRadius = "50px";
                lang.style.borderTopLeftRadius = "50px";
            }
            if (x == Object.keys(project.properties).length - 1 || Object.keys(project.properties).length == 1) {
                lang.style.borderBottomRightRadius = "50px";
                lang.style.borderTopRightRadius = "50px";
            }
            console.log(`Check:\tX: ${x}\project.properties.keys.length: ${Object.keys(project.properties).length}`);
            x++;
            lang.style.backgroundColor = GetColorFromLang(key.toUpperCase());
            lang.style.width = `${value * 100}%`;
            lang.style.height = "calc(var(--vh,1vh)*2)";
            lang.style.padding = "0";
            lang.textContent = `${Math.round(value * 1000) / 10}%`;
            lang.style.fontSize = "calc(var(--vwh,1vh)*1.5)";
            lang.style.fontFamily = "'Yanone Kaffeesatz', sans-serif";
            lang.style.textAlign = "center";
            lang.style.lineHeight = "calc(var(--vh,1vh)*2.5)"

            /* TOOLTIP CREATION */
            let tooltip_div = document.createElement("div");
            tooltip_div.classList.add("tooltip");
            tooltip_div.style.width = "100%";
            tooltip_div.style.height = "100%";

            let tooltip_text = document.createElement("p");
            tooltip_text.classList.add("tooltip-text");
            if (key.toLowerCase() == "javascript") {
                tooltip_text.textContent = `JS`;
            } else {
                tooltip_text.textContent = `${key.toUpperCase()}`;
            }

            tooltip_div.appendChild(tooltip_text);
            lang.appendChild(tooltip_div);

            /* END OF TOOLTIP CREATION */

            let empty = document.createElement("p");
            empty.textContent = "If you are reading this... why?";
            empty.style.display = "none";
            lang.appendChild(empty);

            slide.appendChild(lang);
        }

        obj.appendChild(p);
        obj.appendChild(slide);
        target.appendChild(obj);
    }
}



main();

function GetColorFromLang(lang) {
    return colorField[lang] || "#fff"
}


/* Socials */


let parent = document.getElementById("socials");
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
    parent.appendChild(tmp);
}

let medias = [
    new Media("instagram.png", "Instagram", "t.kutcher", "https://www.instagram.com/t.kutcher/"),
    new Media("snaplogo.png", "Snapchat", "kty990", "../res/images/snapcode.png")
]

for (let x = 0; x < medias.length; x++) {
    display(medias[x]);
}