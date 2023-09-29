function wait(ms) {
    return new Promise((resolve,reject) => {
        setTimeout(resolve,ms);
    })
}

class MyElement {
    content: string;

    constructor(inHTML) {
        this.content = inHTML;
    }
}

class Day {
    month: number;
    day: number;

    constructor(month,day) {
        this.month = month;
        this.day = day;
    }
}

function getStartAndEndDate(month:number, year:number) {
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

class Calendar {
    month: number;
    year: number;
    weeks: [Array<string>, Array<string>, Array<string>, Array<string>, Array<string>] = [[], [], [], [], []];
    index = [
        "SUN",
        "MON",
        "TUES",
        "WED",
        "THURS",
        "FRI",
        "SAT"
    ]
    monthAbbreviations = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
    ].map(month => month.toUpperCase());

    last_render: string;

    constructor(month,year) {
        this.month = month;
        this.year = year;
    }

    render(active:Array<any> | null) {
        let data = "", eList: Array<any> = [];
        if (active != null) {
            const {start, end} = getStartAndEndDate(this.month,this.year);
            let start_i = this.index.indexOf(`${start}`.split(" ")[0].toUpperCase());
            let end_i = parseInt(`${end}`.split(" ")[2]);
            console.log(`end_i: ${end_i}`);
            let c_i = start_i;
            let date = 1;
            let current_week = 0;
            for (let i = 0; i < start_i-1; i++) {
                this.weeks[current_week].push(`<div class="empty-day"></div>`);
            }
            while (true) {
                if (c_i == 8) {
                    c_i = 1;
                    current_week++;
                }
                let color = '#1d99dc';
                for (let i = 0; i < active.length; i++) {
                    let a = active[i];
                    if (`${a.month}`.toUpperCase() == this.monthAbbreviations[this.month-1].toUpperCase() && a.day.replace(":","") == date) {
                        color = '#6445a3';
                        break;
                    }
                }
                this.weeks[current_week].push(`<div style="background-color:${color}" class="date"><p>${date}</p></div>`);
                eList.push(new MyElement(`<div style="background-color:${color}" class="date"><p>${date}</p></div>`));
    
                date++;
                if (date > end_i) {
                    break;
                }
            }
            for (let x of this.weeks) {
                data = data + x.join("\n");
            }
        } else {
            const {start, end} = getStartAndEndDate(this.month,this.year);
            let start_i = this.index.indexOf(`${start}`.split(" ")[0].toUpperCase());
            let end_i = parseInt(`${end}`.split(" ")[2]);
            console.log(`end_i: ${end_i}, end: ${end}`);
            let c_i = start_i;
            let date = 1;
            let current_week = 0;
            for (let i = 0; i < start_i; i++) {
                this.weeks[current_week].push(`<div class="empty-day"></div>`);
            }
            while (true) {
                if (c_i == 8) {
                    c_i = 1;
                    current_week++;
                }
                let color = '#1d99dc';
                this.weeks[current_week].push(`<div style="background-color:${color}" class="date"><p>${date}</p></div>`); //style="color:${'black'}"
    
                date++;
                if (date > end_i) {
                    break;
                }
            }
            for (let x of this.weeks) {
                data = data + x.join("\n");
            }
        }
        return {data:data,elements:eList}
    }
}

async function main() {
    await wait(200);
    let calendar = document.getElementById("display")!;

    let timeDisplay = document.getElementById("list")?.querySelector("#time");

    let date = new Date();
    let c = new Calendar(date.getMonth() + 1,date.getFullYear());
    let {data,elements} = c.render(null);
    const cal_innerHTML = calendar.innerHTML
    calendar.innerHTML = cal_innerHTML + data;

}

export {main};