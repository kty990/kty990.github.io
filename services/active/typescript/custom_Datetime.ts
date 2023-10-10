 class _Time {
    hour: number;
    minute: number;
    second: number;
    
    /* 24-hour format */
    constructor(hour: number, minute: number, second: number) {
        this.hour = hour;
        this.minute = minute;
        this.second = second;
    }

    static add(t0:_Time, t1:_Time) {
        let h = t0.hour + t1.hour;
        let m = t0.minute + t1.minute;
        let s = t0.second + t1.second;
        while (s > 59) {
            m++;
            s -= 60;
        }
        while (m > 59) {
            h++;
            m -= 60;
        }     
        return new _Time(h,m,s);   
    }

    static subtract(t0:_Time, t1:_Time) {
        let h = t0.hour - t1.hour;
        let m = t0.minute - t1.minute;
        let s = t0.second - t1.second;
        while (h < 0 && m >= 60) {
            h++;
            m -= 60;
        }
        while (m < 0 && s >= 60) {
            m++;
            s -= 60;
        }  
        return new _Time(h,m,s);
    }
 }

 class _Date {
    day: number;
    month: string | number;
    year: number;

    static months: Array<string> = [
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
    ].map(m => m.toUpperCase());

    static monthDates: Array<number> = [
        31,28,31,30,31,30,31,31,30,31,30,31
    ]

    constructor(y: number, m: string | number, d: number) {
        this.year = y;
        this.month = m;
        this.day = d;
    }

    static add(d0: _Date, d1: _Date) {
        let y = d0.year + d1.year;
        let m = 1; // Default value, changed later in this function
        let d = d0.day + d1.day;
        if (typeof(d0.month) == "string") {
            let monthValue = _Date.months.indexOf(d0.month);
            if (typeof(d1.month) == "string") {
                let monthValue2 = _Date.months.indexOf(d1.month);
                m = monthValue + monthValue2;
            } else {
                m = monthValue + d1.month;
            }
        } else {
            if (typeof(d1.month) == "string") {
                let monthValue2 = _Date.months.indexOf(d1.month);
                m = d0.month + monthValue2;
            } else {
                m = d0.month + d1.month;
            }
        }
        while (d > _Date.monthDates[m-1]) {
            d -= _Date.monthDates[m-1];
            m++;
        }
        while (m > 12) {
            y++;
            m -= 12;
        }
        return new _Date(y,m,d);
    }

    /* Will be completed at a later date */
    static subtract(d0: _Date, d1: _Date) {
        let y = d0.year - d1.year;
        throw new Error("_Date.{static}subtract is not completed.")
    }

    /* Will be completed at a later date */
    static getMonthStart(m: number) {
        throw new Error("_Date.{static}getMonthStart is not completed.")
    }

    /* Will be completed at a later date */
    static getMonthEnd(m: number) {
        throw new Error("_Date.{static}getMonthEnd is not completed.")
    }
 }