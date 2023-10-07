import * as React from 'react';
import { createRoot } from 'react-dom/client';
import * as ReactDOM from 'react-dom';

function wait(ms: number) {
    return new Promise((resolve,reject) => {
        setTimeout(resolve,ms);
    })
}

interface eventData {
    target: any,
    timestamp: string | number | undefined,
    __be__data: any;
}

class MyElement {
    content: string;
    calendar: Calendar;
    active: boolean = false;
    activated: boolean = false;
    __class: any;

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
            id: id,
            className: classes.join(' '),
            onClick: onclick,
            children: children,
        };
        console.log(`${content}, ${this.content}, ${elementProps}, ${classes}`);
        return React.createElement(eType, elementProps, (content != undefined) ? content : 'e.404' );
    }

    _getElement(): any {
        for (let c of this.classes) {
            let tmp = document.getElementsByClassName(c);
            for (let e of Array.from(tmp)) {
                if (e.textContent == this.content) {
                    return e;
                }
            }
        }
        return null;
    }

    activate() {
        this.activated = true;
        this.calendar.addListener((event: eventData) => {
            console.log(event);
            let _c = event.__be__data.class;
            if (_c == this.__class) {
                let elem = this._getElement();
                if (elem) {
                    console.log(`Found element, activating...\n`,elem);
                    elem.style.backgroundColor = "#01234ff";
                    this.active = true;
                } else {
                    console.warn(`Error in activation hook <Activate>: No element matching <div class="${c}>${this.content}</div>"`);
                }
            } else {
                let elem = this._getElement();
                if (elem) {
                    elem.style.backgroundColor = null;
                    this.active = false;
                } else {
                    console.warn(`Error in activation hook <Deactivate>: No element matching <div class="${c}>${this.content}</div>"`);
                }
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

    monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ].map(month => month.toUpperCase());

    last_render: Array<MyElement>;
    static listeners: Array<Function>;

    eList: Array<MyElement> = [];

    constructor(month: number,year: number) {
        this.month = month;
        this.year = year;
        Calendar.listeners = [];
    }

    addListener(callback : Function) {
        Calendar.listeners.push(callback);
    }

    onClicked(args:eventData) {
        for (let x = 0; x < Calendar.listeners.length; x++) {
            Calendar.listeners[x](args);
        }
    }

    getMonthName(m: number) {
        return this.monthNames[m-1];
    }

    render() {
        let data = "";
        const {start, end} = getStartAndEndDate(this.month,this.year);
        let start_i = this.index.indexOf(`${start}`.split(" ")[0].toUpperCase());
        let end_i = parseInt(`${end}`.split(" ")[2]);
        console.log(`end_i: ${end_i}, end: ${end}`);
        let c_i = start_i;
        let date = 1;
        for (let i = 0; i < start_i; i++) {
            let tmp = new MyElement(this,[], null);
            tmp.content = `\u2800`; // EMPTY element
            tmp.__class = null;
            tmp.classes.push("date");
            this.eList.push(tmp);
        }
        while (true) {
            if (c_i == 8) {
                c_i = 1;
            }
            let tmp = new MyElement(this,[], null);
            tmp.onclick = function() {
                let eData:eventData = {
                    target: null,
                    timestamp: new Date().toISOString(),
                    __be__data: {
                        class: tmp
                    }
                }
                c.onClicked(eData);
            };
            tmp.content = `${date}`;
            tmp.__class = tmp;
            tmp.classes.push("date");
            this.eList.push(tmp);
            date++;
            if (date > end_i) {
                break;
            }
        }
        let i = 0;
        for (let e of this.eList) {
            e.activate();
            i++;
            console.log("activated");
        }
        this.last_render = this.eList;
        this.eList = [];
        return {data:this.last_render.map(e => e.render(e.content)),elems:this.last_render}; 
    }
}

let date = new Date();
let c = new Calendar(date.getMonth() + 1,date.getFullYear());
let calendar_root: any;
let calendar: any;
let timeDisplay: any;
let monthDisplay: any;

async function main() {
    await wait(300);
    if (!calendar_root) {
        calendar = document.getElementById("display")!;
        calendar_root = createRoot(calendar); 
        monthDisplay = document.getElementById("cal-title");
    }

    timeDisplay = document.getElementById("list")?.querySelector("#time");
    
    let {data,elems} = c.render();
    if (calendar) {
        calendar_root.render(data);
        monthDisplay.textContent = `${c.getMonthName(c.month)} ${c.year}`;
        console.warn("Should have rendered.");
    } else {
        console.log(`Calendar: ${calendar}`);
    }
    return {calendar: c, elements:elems}
}

document.body.addEventListener('update', async function (e) {
    console.log(e);
    const ce = e as CustomEvent<any>;
    const dta = ce.detail.data;
    c.month += parseInt(dta);
    while (c.month > 12) {
        c.month -= 12;
        c.year++;
    }
    while (c.month < 1) {
        c.month += 12;
        c.year--;
    }
    let {data,elems} = c.render();
    if (!calendar_root) {
        calendar = document.getElementById("display")!;
        calendar_root = createRoot(calendar); 
        monthDisplay = document.getElementById("cal-title");
    }
    calendar_root.unmount();
    calendar_root = createRoot(calendar);
    await wait(100);
    calendar_root.render(data);
    monthDisplay.textContent = `${c.getMonthName(c.month)} ${c.year}`;
})

export {main, wait};