class Project {
    constructor(name, properties) {
        this.name = name;
        this.properties = properties;
    }

    GetName() {
        return this.name;
    }
}

const colorField = {
    "JS":"#f5e042",
    "HTML":"#f56342",
    "CSS":"#c040f7"
}

const projects = [
    new Project("Homies Bot",{"JS":100}),
    new Project("kty990.github.io",{"HTML":26.9,"JS":25.1,"CSS":48})
]

function GetColorFromLang(lang) {
    return colorField[lang] || "#fff"
}

let target = document.getElementById("project-flex");
for (let project of projects) {
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
    for (const [key, value] of Object.entries(project.properties)) {
        let lang = document.createElement("div");
        lang.style.backgroundColor = GetColorFromLang(key);
        lang.style.width = `${value}%`;
        lang.style.height = "calc(var(--vh,1vh)*2)";
        lang.style.padding = "0";
        lang.textContent = `${value}%`;
        lang.style.fontSize = "calc(var(--vwh,1vh)*2)";
        lang.style.fontFamily = "'Yanone Kaffeesatz', sans-serif";
        lang.style.textAlign = "center";
        lang.style.lineHeight = "calc(var(--vh,1vh)*2.5)"
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

let legendTarget = document.getElementById("project-legend");
for (const [lang, color] of Object.entries(colorField)) {
    let div = document.createElement('div');
    div.style.width = "calc(var(--vh, 1vh) * 3)";
    div.style.height = "calc(var(--vh, 1vh) * 3)";
    div.style.textAlign = "center";
    div.style.display = "flex";
    div.style.justifyContent = "center";
    div.style.alignItems = "center";
    div.style.fontSize = "calc(var(--vh, 1vh) * 1)";
    div.style.padding = "calc(var(--vh, 1vh) * 0.5)"
    div.style.backgroundColor = color;
    div.style.marginRight = "5px";
    div.textContent = lang;
    legendTarget.appendChild(div);
}