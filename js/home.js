class Project {
    constructor(name, properties, lastUpdated) {
        this.name = name;
        this.lastUpdated = lastUpdated;
        this.properties = properties;
    }

    GetName() {
        return this.name;
    }

    GetLastUpdated() {
        return this.lastUpdated;
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

class Time {
    constructor(datetime) {
        try {
            let time = datetime.split("T")[1].replace("Z", "").split(":");
            this.hour = parseInt(time[0]);
            this.minute = parseInt(time[1]);
            this.second = parseInt(time[2]);
        } catch (e) {
            console.error(e);
        }
    }

    Add(seconds) {
        let s = seconds;
        let m = Math.floor(seconds / 60);
        s -= m * 60;
        let h = Math.floor(m / 60);
        m -= h * 60;

        if (h > 23) {
            h -= 24;
        }
        if (m > 59) {
            h++;
            m -= 59;
        }
        if (s > 59) {
            m++;
            s -= 59;
        }
        this.hour += h;
        this.minute += m;
        this.second += s;
    }

    Remove(seconds) {
        let s = seconds;
        let m = Math.floor(seconds / 60);
        s -= m * 60;
        let h = Math.floor(m / 60);
        m -= h * 60;

        if (h < 0) {
            h += 23;
        }
        if (m < 0) {
            if (h > 1) {
                h--;
            } else if (h == 1) {
                h += 22;
            } else {
                h += 23;
            }
            m += 59;
        }
        if (s < 0) {
            if (m > 1) {
                m--;
            } else if (m == 1) {
                if (h > 1) {
                    h--;
                } else if (h == 1) {
                    h += 22;
                } else {
                    h += 23;
                }
                m += 58
            } else {
                if (h > 1) {
                    h--;
                } else if (h == 1) {
                    h += 22;
                } else {
                    h += 23;
                }
                m += 59
            }
            s += 59;
        }

        this.hour -= h;
        this.minute -= m;
        this.second -= s;
    }
}

class Datestamp {
    constructor(datetime) {
        try {
            let time = datetime.split("T")[0].split("-");
            this.year = parseInt(time[0]);
            this.month = parseInt(time[1]);
            this.day = parseInt(time[2]);
        } catch (e) {
            console.error(e);
        }
    }
}

const colorField = {
    "JAVASCRIPT": "#f5e042",
    "HTML": "#f56342",
    "CSS": "#c040f7",
    "PYTHON": "#c9b81a",
    "JAVA": "#a86f32",
    "OTHER": "#7d7d7d"
}

function formatIntToLength(number, len) {
    let isNegative = number < 0
    let num = Math.abs(number)
    let x = ("0" + num).slice(-len);
    if (isNegative) {
        return -x;
    } else {
        return x;
    }
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
const SITE_NAME = "kty990.github.io"

let months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEPT",
    "OCT",
    "NOV",
    "DEC"
]

let daysPerMonth = {
    "JAN": 31,
    "FEB": 28,
    "MAR": 31,
    "APR": 30,
    "MAY": 31,
    "JUN": 30,
    "JUL": 31,
    "AUG": 31,
    "SEPT": 30,
    "OCT": 31,
    "NOV": 30,
    "DEC": 31
}

function ConvertToTime(timestamp) {
    let t = new Time(timestamp);
    t.Add(19 * 60 * 60);
    return `${t.hour}:${formatIntToLength(t.minute, 2)}:${formatIntToLength(t.second, 2)} ET`;
}

function ConvertToDate(timestamp) {
    let d = new Datestamp(timestamp);
    let year = d.year;
    let month = months[d.month - 1];
    let day = d.day;
    return `${day} ${month}, ${year}`;
}

function GetDateTime(timestamp) {
    let t = new Time(timestamp);
    // console.log(`Old time: ${t.hour}:${t.minute}:${t.second}`);
    t.Add(19 * 60 * 60);
    // console.log(`New time: ${t.hour}:${t.minute}:${t.second}`);
    let d = new Datestamp(timestamp);
    d.month--;
    let year = d.year;
    let month = months[d.month];
    let day = d.day;

    // console.log(`Hour: ${t.hour}`);
    while (t.hour > 23) {
        t.hour -= 23;
        day++;
        if (day > daysPerMonth[month]) {
            d.day -= daysPerMonth[month];
            d.month++;
            if (d.month > 12) {
                d.year++;
                d.month -= 12;
            }
            month = months[d.month - 1];

        }
    }

    if (t.hour < 0) {
        // console.log("Yes");
        if (day > 1) {
            day--;
        } else if (month > 1) {
            d.month--;
            month = months[d.month - 1];
            d.day = daysPerMonth[month];
            day = d.day;
        } else {
            d.year--;
            d.month += 11;
            month = months[d.month - 1];
            d.day = daysPerMonth[month];
            day = d.day;
        }
        t.hour = 12 + Math.abs(t.hour);
    }

    day--;

    return `${t.hour}:${formatIntToLength(t.minute, 2)}:${formatIntToLength(t.second, 2)} ET, ${day} ${month}, ${year}`
}

function load_projects() {
    return new Promise((resolve, reject) => {
        getJSON(repo_url, function (err, data) {
            if (err != null) {
                console.error(`Error in getJson occured: ${err}`);
                reject(`An error occured trying to load github url: ${err}`);
            } else {
                for (let x = 0; x < data.length; x++) {
                    let repo_name = data[x].name;
                    if (repo_name == SITE_NAME) {
                        document.getElementById("site-last-update").textContent = `Updated: ${GetDateTime(data[x].pushed_at)}`;
                    }
                    let language_url = `https://api.github.com/repos/${username}/${repo_name}/languages`;
                    getJSON(language_url, function (e, d) {
                        if (e != null) {
                            console.error(`Error in language obtain: ${e}`);
                        } else {
                            let language_tmp = {};
                            let total = 0;
                            for (const [language, count] of Object.entries(d)) {
                                // console.log(`L: ${language}\tC: ${count}`);
                                if (language.toUpperCase() == "HACK") {
                                    if (language_tmp.keys.includes("php")) {
                                        language_tmp['php'] += count;
                                    } else {
                                        language_tmp['php'] = count;
                                    }
                                }
                                language_tmp[language] = count;
                                total = total + count;
                            }
                            for (const [l, c] of Object.entries(language_tmp)) {
                                language_tmp[l] = c / total;
                            }
                            myProjects.push(new Project(repo_name, language_tmp, GetDateTime(data[x].pushed_at)));
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

function encodeProjects() {
    const PROJ_SEP = "!";
    const SEP = "@";
    const ARG_SEP = "_";
    let data = "";
    
    for (let x = 0; x < myProjects.length; x++) {
        let p = myProjects[x];
        let args = "";
        for (const [l, v] of Object.entries(myProjects[x].properties)) {
            args += `${l}#${v}${ARG_SEP}`;
        }
        let tmp = `${p.GetName()}${SEP}${p.lastUpdated}${SEP}${args}${PROJ_SEP}`;
        data += tmp;
    }
    return data;
}

function decodeProjects(data) {
    const PROJ_SEP = "!";
    const SEP = "@";
    const ARG_SEP = "_";
    let projects = data.split(PROJ_SEP);
    let tmp = [];
    for (let x = 0; x < projects.length; x++) {
        let splitString = projects[x].split(SEP);
        let name = splitString.splice(0,1)[0];
        let update = splitString.splice(0,1)[0];
        let args = {};
        let arg_string = splitString[i].split(ARG_SEP);
        for (let i = 0; i < arg_string.length; i++) {
            let tmp = arg_string[i].split("#");
            args[tmp[0]] = parseFloat(tmp[1]);
        }
        tmp.push(new Project(name, args, update));
    }
    return tmp;
}

function saveData() {
    localStorage.setItem("last_save", "");
    localStorage.setItem("projects", encodeProjects());
}

function loadData() {
    let success = true;
    try {
        let tmp = decodeProjects(localStorage.getItem("projects"));
        if (tmp.length == 0) {
            success = false;
        }
    } catch (e) {
        success = false;
    }
    return success;
}

function hashString(str) {
    return encodeURIComponent(str);
}

async function main() {
    if (!loadData()) {
        await load_projects();
        saveData();
    } else if (getTimeSince(parseInt(localStorage.getItem("last_save"))) > 30) {
        // if there has been 30 minutes or more since last save
        await load_projects();
        saveData();
    }

    let target = document.getElementById("project-flex");
    for (let project of myProjects) {
        let obj = document.createElement("div");
        obj.classList.add("project");
        let p = document.createElement("p");
        p.style.color = "#fff";
        p.style.textAlign = "center";
        p.style.width = "100%";
        p.style.fontSize = "calc(var(--vh, 1vh) * 2)"
        p.textContent = project.GetName();
        let lastUpdated = document.createElement("p");
        lastUpdated.textContent = "Last updated: " + project.GetLastUpdated();
        lastUpdated.style.color = "#fff";
        lastUpdated.style.textAlign = "center";
        lastUpdated.style.width = "100%";
        lastUpdated.style.fontSize = "calc(var(--vwh, 1vh) * 1)";
        lastUpdated.style.padding = "0";
        lastUpdated.style.margin = "0";
        lastUpdated.style.position = "relative";
        lastUpdated.style.bottom = "calc(var(--vh, 1vh) * 1)";

        let slide = document.createElement("div");
        slide.style.position = "relative";
        slide.style.top = "calc(var(--vh,1vh)*1.2)";
        slide.style.width = "75%";
        slide.style.height = "25%";
        slide.style.left = "12.5%";
        slide.style.display = "flex";
        slide.style.flexDirection = "row";
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
            // console.log(`Check:\tX: ${x}\project.properties.keys.length: ${Object.keys(project.properties).length}`);
            x++;
            lang.style.backgroundColor = GetColorFromLang(key.toUpperCase());
            lang.style.width = `${value * 100}%`;
            lang.style.filter = "hue-rotate(270deg)";
            lang.style.height = "calc(var(--vh,1vh)*2)";
            lang.style.padding = "0";
            lang.textContent = `${Math.round(value * 1000) / 10}%`;
            lang.style.fontSize = "calc(var(--vwh,1vh)*1)";
            lang.style.fontFamily = "'Yanone Kaffeesatz', sans-serif";
            lang.style.textAlign = "center";
            lang.style.lineHeight = "calc(var(--vh,1vh)*2.5)";
            lang.style.position = "relative";
            lang.style.bottom = "calc(var(--vh,1vh)*2)";

            /* TOOLTIP CREATION */
            let tooltip_div = document.createElement("div");
            tooltip_div.classList.add("tooltip");
            tooltip_div.style.width = "100%";
            tooltip_div.style.height = "100%";

            let tooltip_text = document.createElement("p");
            tooltip_text.classList.add("tooltip-text");
            tooltip_text.textContent = `${key.toUpperCase()}`;

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
        obj.append(lastUpdated);
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
    new Media("instagram.png", "Instagram", "t.kutcher", "https://www.instagram.com/t.kutcher/"),
    new Media("instagram.png", "Instagram", "t.kutcher", "https://www.instagram.com/t.kutcher/"),
    new Media("instagram.png", "Instagram", "t.kutcher", "https://www.instagram.com/t.kutcher/")
]

for (let x = 0; x < medias.length; x++) {
    display(medias[x]);
}
