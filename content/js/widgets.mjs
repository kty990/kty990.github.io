function wait(ms) {
    return new Promise((resolve,reject) => {
        setTimeout(resolve,ms);
    })
}

class MyElement {
    constructor(inHTML) {
        this.content = inHTML;
    }
}

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
        let data, eList = [];
        if (active != null) {
            const {start, end} = getStartAndEndDate(this.month,this.year);
            let weeks = [[],[],[],[],[]];
            let start_i = this.index.indexOf(`${start}`.split(" ")[0].toUpperCase());
            let end_i = parseInt(`${end}`.split(" ")[2]);
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
                weeks[current_week].push(`<div style="background-color:${color}" class="date"><p>${date}</p></div>`);
                eList.push(new MyElement(`<div style="background-color:${color}" class="date"><p>${date}</p></div>`));
    
                date++;
                if (date > end_i) {
                    break;
                }
            }
            for (let x of weeks) {
                data = data + x.join("\n");
            }
        } else {
            const {start, end} = getStartAndEndDate(this.month,this.year);
            let weeks = [[],[],[],[],[]];
            let start_i = this.index.indexOf(`${start}`.split(" ")[0].toUpperCase());
            let end_i = parseInt(`${end}`.split(" ")[2]);
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
            for (let x of weeks) {
                data = data + x.join("\n");
            }
        }
        return {data:data,elements:eList}
    }
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

    
    let date = new Date();
    let c = new Calendar(date.getMonth() + 1,date.getFullYear());
    let {data,elements} = c.render();
    const cal_innerHTML = calendar.innerHTML
    calendar.innerHTML = cal_innerHTML + data;

}

export {main};