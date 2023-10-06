import * as React from 'react';
import { createRoot } from 'react-dom/client';
import * as ReactDOM from 'react-dom';

function wait(ms: number) {
    return new Promise((resolve,reject) => {
        setTimeout(resolve,ms);
    })
}

class MyElement {
    content: string;
    calendar: Calendar;
    active: boolean = false;
    activated: boolean = false;
    element: any;

    onclick: Function = () => {}
    classes: Array<string> = [];
    id: string = "";
    eType: string = "div";
    children: Array<any> = [];
    props: { [key: string]: string };

    constructor(cal: Calendar, children: Array<any>, props: any){
        this.calendar = cal;
        this.children = children;
        if (props != null && props != undefined) {
            let tmp = props;
            tmp.className = tmp.classList.join(" ");
            tmp.classList = undefined;
            this.props = tmp;
        }
    }

    render(content?: string) : any {
        const { eType, id, classes, onclick, children } = this;
        const elementProps = {
            id,
            className: classes.join(' '),
            onClick: onclick,
            children,
        };
        console.log(content,this.content);
        this.element = React.createElement(eType, elementProps, content || "E.404");
        return this.element;
    }

    activate() {
        this.activated = true;
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

    eList: Array<MyElement> = [];

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
        let data = "";
        if (active != null) {
            const {start, end} = getStartAndEndDate(this.month,this.year);
            let start_i = this.index.indexOf(`${start}`.split(" ")[0].toUpperCase());
            let end_i = parseInt(`${end}`.split(" ")[2]);
            console.log(`end_i: ${end_i}`);
            let c_i = start_i;
            let date = 1;
            let current_week = 0;
            for (let i = 0; i < start_i-1; i++) {
                let tmp = new MyElement(this,[],null);
                tmp.content = '';
                this.eList.push(tmp);
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
                let tmp = new MyElement(this,[], {classes: ['date']});
                tmp.content = date.toString();
                this.eList.push(tmp);
    
                date++;
                if (date > end_i) {
                    break;
                }
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
                let tmp = new MyElement(this,[], {classList: ['date']});
                tmp.content = '';
                this.eList.push(tmp);
            }
            while (true) {
                if (c_i == 8) {
                    c_i = 1;
                    current_week++;
                }
                let tmp = new MyElement(this,[], {classList: ['date']});
                tmp.content = date.toString();
                this.eList.push(tmp);
                date++;
                if (date > end_i) {
                    break;
                }
            }
        }
        let i = 0;
        for (let e of this.eList) {
            e.activate();
            i++;
            console.log("activated");
        }
    
        return {data:this.eList.map(e => e.render(e.content)),elems:this.eList}
    }
}

let date = new Date();
let c = new Calendar(date.getMonth() + 1,date.getFullYear());

async function main() {
    await wait(300);
    let calendar = document.getElementById("display")!;
    let calendar_root = createRoot(calendar); 

    let timeDisplay = document.getElementById("list")?.querySelector("#time");
    
    let {data,elems} = c.render(null);
    if (calendar) {
        calendar_root.render(data);
        console.warn("Should have rendered.");
    } else {
        console.log(`Calendar: ${calendar}`);
    }
    return {calendar: c, elements:elems}
}

document.body.addEventListener('update', function (e) {
    console.log(e);
    const ce = e as CustomEvent<any>;
    const data = ce.detail.data;
})

export {main, wait};