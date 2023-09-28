function wait(ms) {
    return new Promise((resolve,reject) => {
        setTimeout(resolve,ms);
    })
}

async function main() {
    await wait(200);
    let calendar = document.getElementById("display");

    let timeDisplay = document.getElementById("list").querySelector("#time");

    function getStartAndEndDate(month, year) {
        // Ensure month is between 1 (January) and 12 (December)
        if (month < 1 || month > 12) {
        throw new Error('Month should be between 1 and 12.');
        }

        // Create a new Date object with the given year and month
        const startDate = new Date(year, month - 1, 1); // Note: Months are zero-based (0 = January, 11 = December)
        
        // Calculate the end date of the month
        const endDate = new Date(year, month, 0); // Setting day to 0 gives the last day of the previous month

        return { start: startDate, end: endDate };
    }

    let monthAbbreviations = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
    ].map(month => month.toUpperCase());

    class Day {
        constructor(month,day) {
            this.month = month;
            this.day = day;
        }
    }

    class Calendar {
        constructor(month,year) {
            this.month = month;
            this.year = year;
            this.index = [
                "SUN",
                "MON",
                "TUES",
                "WED",
                "THURS",
                "FRI",
                "SAT"
            ]
            this.last_render = null;
        }

        render(active=null) {
            if (active != null) {
                const {start, end} = getStartAndEndDate(this.month,this.year);
                let weeks = [[],[],[],[],[]];
                let start_i = this.index.indexOf(`${start}`.split(" ")[0].toUpperCase());
                let end_i = this.index.indexOf(`${end}`.split(" ")[0].toUpperCase());
                console.log(`end_i: ${end_i}`);
                let c_i = start_i;
                let date = 1;
                let current_week = 0;
                for (let i = 0; i < start_i-1; i++) {
                    weeks[current_week].push(`<div class="empty-day"></div>`);
                }
                while (true) {
                    if (c_i == 8) {
                        c_i = 1;
                        current_week++;
                    }
                    let color = '#1d99dc';
                    for (let i = 0; i < active.length; i++) {
                        let a = active[i];
                        if (`${a.month}`.toUpperCase() == monthAbbreviations[this.month-1].toUpperCase() && a.day.replace(":","") == date) {
                            color = '#6445a3';
                            break;
                        }
                    }
                    weeks[current_week].push(`<div style="background-color:${color}" class="date"><p>${date}</p></div>`); //style="color:${'black'}"
        
                    date++;
                    if (date > end_i) {
                        break;
                    }
                }
                let data = "";
                for (let x of weeks) {
                    data = data + x.join("\n");
                }
                return data;
            } else {
                const {start, end} = getStartAndEndDate(this.month,this.year);
                let weeks = [[],[],[],[],[]];
                let start_i = this.index.indexOf(`${start}`.split(" ")[0].toUpperCase());
                let end_i = this.index.indexOf(`${end}`.split(" ")[0].toUpperCase());
                console.log(`end_i: ${end_i}, end: ${end}`);
                let c_i = start_i;
                let date = 1;
                let current_week = 0;
                for (let i = 0; i < start_i; i++) {
                    weeks[current_week].push(`<div class="empty-day"></div>`);
                }
                while (true) {
                    if (c_i == 8) {
                        c_i = 1;
                        current_week++;
                    }
                    let color = '#1d99dc';
                    weeks[current_week].push(`<div style="background-color:${color}" class="date"><p>${date}</p></div>`); //style="color:${'black'}"
        
                    date++;
                    if (date > end_i) {
                        break;
                    }
                }
                let data = "";
                for (let x of weeks) {
                    data = data + x.join("\n");
                }
                return data;
            }
        }
    }
    let date = new Date();
    let c = new Calendar(date.getMonth() + 1,date.getFullYear());
    let data = c.render();
    const cal_innerHTML = calendar.innerHTML
    calendar.innerHTML = cal_innerHTML + data;

    let timesheet = document.getElementById("timesheet-input");

    timesheet.addEventListener("input", () => {
        // Split timesheet data into entries
        let entries = timesheet.value.split("\n");

        let active_dates = [];

        for (let x of entries) {
            active_dates.push(new Day(x.split(" ")[0], x.split(" ")[1]));
        }

        let data = c.render(active_dates);
        calendar.innerHTML = cal_innerHTML + data;

        // Initialize total duration
        let t = { h: 0, m: 0, s: 0 };

        // Define the CTime class
        class CTime {
            constructor(timeDict) {
                this.h = timeDict.h;
                this.m = timeDict.m;
                this.s = timeDict.s;
            }

            subtract(timeDict) {
                let tmp = {};
                tmp.h = this.h - timeDict.h;
                tmp.m = this.m - timeDict.m;
                tmp.s = this.s - timeDict.s;
                return tmp;
            }
        }

        function ProcessTimesheet() {
            const convertToDict = (t) => {
                return {
                    h:t.split(":")[0],
                    m:t.split(":")[1],
                    s:t.split(":")[2]
                }
            }
            for (let e of entries) {
                if (e.length <= 1) continue;
                let trange = e.split(" ")[2].split("-");
                let start = new CTime(convertToDict(trange[0]));
                let end = new CTime(convertToDict(trange[1]));
                end.h = (parseInt(end.h) + 12);
                let duration = end.subtract(start);
                for (let [k, v] of Object.entries(duration)) {
                    t[k] += v;
                }
            }
            if (isNaN(t.s)) {
                t.s = 0;
            }
            if (isNaN(t.m)) {
                t.m = 0;
            }
            if (isNaN(t.h)) {
                t.h = 0;
            }
            while (t.s < 0) {
                t.s += 60;
                t.m--;
            }
            while (t.m < 0) {
                if (t.h > 0) {
                    t.h--;
                    t.m += 60;
                }
            }
            while (t.s > 59) {
                t.s -= 60;
                t.m++;
            }
            while (t.m > 59) {
                t.m -= 60;
                t.h++;
            }
            timeDisplay.textContent = `${t.h}:${t.m}:${t.s}`;
        }

        ProcessTimesheet();


    })
}

export {main};