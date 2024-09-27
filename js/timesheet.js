function getCookie(name) {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();

        if (cookie.indexOf(name + '=') === 0) {
            return cookie.substring(name.length + 1);

        }
    }
    return null;
}

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires
            = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value
        + expires + "; path=/";
}

class Calendar {

    /**
     * 
     * @param {HTMLDivElement} div 
     */
    constructor(div, month, year) {
        this.div = div;
        this.month = month;
        this.year = year;
        if (!Array.from(this.div.classList).includes('calendar')) {
            this.div.classList.add("calendar");
        }
    }

    async generate() {
        const remove = () => {
            return new Promise((resolve) => {
                for (let c of Array.from(this.div.children)) {
                    c.remove();
                }
                if (Array.from(this.div.children).length == 0) {
                    resolve();
                } else {
                    throw "Something went wrong...";
                }
            })
        }
        await remove().then(() => {
            console.log(Array.from(this.div.children).length)
        });
        function getFirstDayOfMonth(year, month) {
            // Create a new Date object for the first day of the specified month and year
            const date = new Date(year, month, 1);

            // Get the day of the week (0-6, where 0 is Sunday)
            const dayOfWeek = date.getDay();

            // Return the day of the week as a string
            return dayOfWeek;
        }

        function isLeapYear(year) {
            // A leap year is divisible by 4, but not by 100 unless it's also divisible by 400
            return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
        }

        function newEmpty() {
            let e = document.createElement("div");
            let date = document.createElement("p");
            let descriptors = document.createElement("div");
            e.appendChild(date);
            e.appendChild(descriptors);
            return e;
        }
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];
        const daysInMonth = [
            31, "?", 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
        ]
        const daysOfWeek = [
            "Sun",
            "Mon",
            "Tues",
            "Wed",
            "Thurs",
            "Fri",
            "Sat"
        ]
        let day = getFirstDayOfMonth(this.year, this.month)
        let days = daysInMonth[this.month];
        console.warn(day, days, this.div.innerHTML);
        for (let i = 0; i < 7; i++) {
            let d = document.createElement("p");
            d.textContent = daysOfWeek[i];
            this.div.appendChild(d);
        }
        if (day != 0) {
            for (let i = 0; i < day; i++) {
                this.div.appendChild(newEmpty());
                console.log('empty');
            }
        }
        if (days != "?") {
            console.error("Not ?")
            for (let i = 0; i < days; i++) {
                let e = newEmpty();
                e.querySelector("p").textContent = `${i + 1}`;
                let descriptorContainer = e.querySelector("div");
                // Load descriptors from cookies
                this.div.appendChild(e);
                console.log("day added", e)
            }
        } else {
            if (!isLeapYear(this.year)) {
                for (let i = 0; i < 28; i++) {
                    let e = newEmpty();
                    e.querySelector("p").textContent = `${i + 1}`;
                    let descriptorContainer = e.querySelector("div");
                    // Load descriptors from cookies
                    this.div.appendChild(e);
                }
            } else {
                for (let i = 0; i < 29; i++) {
                    let e = newEmpty();
                    e.querySelector("p").textContent = `${i + 1}`;
                    let descriptorContainer = e.querySelector("div");
                    // Load descriptors from cookies
                    this.div.appendChild(e);
                }
            }
        }

        document.getElementById("month-year").textContent = `${months[this.month]} ${this.year}`;
    }

    next() {
        console.log(`.next() Debug: ${this.year},${this.month}`)
        this.month++;
        if (this.month > 11) {
            this.month -= 12;
            this.year++;
        }
        this.generate();
    }

    prev() {
        console.log(`.prev() Debug: ${this.year},${this.month}`)
        this.month--;
        if (this.month < 0) {
            this.month += 12;
            this.year--;
        }
        this.generate();
    }
}

class HourSelect {

}


let c = new Calendar(document.getElementById('calendar'), 8, 2024);
c.generate();
const prev = document.getElementById("prev");
const next = document.getElementById("next");

console.warn(prev, next);

document.addEventListener("mousedown", (e) => {
    if (e.target.id == "next") {
        c.next();
    } else if (e.target.id == "prev") {
        c.prev();
    }
})