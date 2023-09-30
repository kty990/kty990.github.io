function wait(ms: number) {
    return new Promise((resolve,reject) => {
        setTimeout(resolve,ms);
    })
}

class MyElement {
    content: string;
    element: any;
    calendar: Calendar;
    active: boolean = false;

    constructor(inHTML: string, cal: Calendar, element: any) {
        this.content = inHTML;
        this.calendar = cal;
        this.element = element;
    }

    activate() {
        this.calendar.addListener((event: any) => {
            console.log(event);
            let elem = event.target;
            if (elem == this.element) {
                this.element.style.backgroundColor = "#01234ff";
                this.active = true;
            } else {
                this.element.style.backgroundColor = null;
                this.active = false;
            }
        })
    }
}

class Day {
    month: number;
    day: number;

    constructor(month: number,day: number) {
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
    month: number = 1;
    year: number = 1970;
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
    listeners: Array<Function> = [];

    constructor(month: number,year: number) {
        this.month = month;
        this.year = year;
    }

    addListener(callback : Function) {
        this.listeners.push(callback);
    }

    onClicked(args:Array<any>) {
        for (let listener of this.listeners) {
            listener(...args);
        }
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
                let color: string = "";
                for (let i = 0; i < active.length; i++) {
                    let a = active[i];
                    if (`${a.month}`.toUpperCase() == this.monthAbbreviations[this.month-1].toUpperCase() && a.day.replace(":","") == date) {
                        color = '#6445a3';
                        break;
                    }
                }
                console.log({day:date,color:color});
                this.weeks[current_week].push(`<div style=${color == "#6445a3" ? `background-color:${color}`: ``} class="date" onclick=${this.onClicked}><p>${date}</p></div>`);
                eList.push(new MyElement(`<div style=${color == "#6445a3" ? `background-color:${color}`: ``} class="date"><p>${date}</p></div>`,this,null));
    
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
                this.weeks[current_week].push(`<div class="date"><p>${date}</p></div>`); //style="color:${'black'}"
                eList.push(new MyElement(`<div class="date"><p>${date}</p></div>`,this,null));
                date++;
                if (date > end_i) {
                    break;
                }
            }
            for (let x of this.weeks) {
                data = data + x.join("\n");
            }
        }
        let es = document.getElementsByClassName("date");
        let i = 0;
        for (let e of eList) {
            console.log(e);
            e.element = es[i];
            e.activate();
            i++;
            console.log("activated");
        }
        console.log(es);
        console.log('---');
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