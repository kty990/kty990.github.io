"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wait = exports.main = void 0;
var React = require("react");
var client_1 = require("react-dom/client");
function wait(ms) {
    return new Promise(function (resolve, reject) {
        setTimeout(resolve, ms);
    });
}
exports.wait = wait;
var Cookie = /** @class */ (function () {
    function Cookie() {
    }
    // Set a cookie with a given name, value, and optional expiration date
    Cookie.set = function (name, value, expirationDays) {
        var cookieString = "".concat(name, "=").concat(encodeURIComponent(value));
        if (expirationDays !== undefined) {
            var expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + expirationDays);
            cookieString += "; expires=".concat(expirationDate.toUTCString());
        }
        document.cookie = cookieString;
    };
    // Get the value of a cookie by its name
    Cookie.get = function (name) {
        var cookies = document.cookie.split(';');
        for (var _i = 0, cookies_1 = cookies; _i < cookies_1.length; _i++) {
            var cookie = cookies_1[_i];
            var _a = cookie.trim().split('='), cookieName = _a[0], cookieValue = _a[1];
            if (cookieName === name) {
                return decodeURIComponent(cookieValue);
            }
        }
        return null;
    };
    // Delete a cookie by its name
    Cookie.delete = function (name) {
        document.cookie = "".concat(name, "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;");
    };
    return Cookie;
}());
var MyElement = /** @class */ (function () {
    function MyElement(cal, children, props) {
        this.active = false;
        this.activated = false;
        this.onclick = function () { };
        this.classes = [];
        this.id = "";
        this.eType = "div";
        this.children = [];
        this.calendar = cal;
        this.children = children;
        if (props != null && props != undefined) {
            var tmp = props;
            tmp.className = tmp.classList.join(" ");
            tmp.classList = undefined;
            this.props = tmp;
        }
    }
    MyElement.prototype.render = function (content) {
        var _a = this, eType = _a.eType, id = _a.id, classes = _a.classes, onclick = _a.onclick, children = _a.children;
        var elementProps = {
            id: id,
            className: classes.join(' '),
            onClick: onclick,
            children: children,
        };
        console.log("".concat(content, ", ").concat(this.content, ", ").concat(elementProps, ", ").concat(classes));
        return React.createElement(eType, elementProps, (content != undefined) ? content : 'e.404');
    };
    MyElement.prototype._getElement = function () {
        for (var _i = 0, _a = this.classes; _i < _a.length; _i++) {
            var c_1 = _a[_i];
            var tmp = document.getElementsByClassName(c_1);
            for (var _b = 0, _d = Array.from(tmp); _b < _d.length; _b++) {
                var e = _d[_b];
                if (e.textContent == this.content) {
                    return e;
                }
            }
        }
        return null;
    };
    MyElement.prototype.activate = function () {
        var _this = this;
        this.activated = true;
        this.calendar.addListener(function (event) {
            console.log(event);
            var _c = event.__be__data.class;
            if (_c == _this.__class) {
                var elem = _this._getElement();
                if (elem) {
                    console.log("Found element, activating...\n", elem, elem.style);
                    elem.style.backgroundColor = "#01234f";
                    _this.active = true;
                    console.log("Found element, should now be active...\n", elem, elem.style);
                }
                else {
                    console.warn("Error in activation hook <Activate>: No element matching <div class=\"".concat(_this.classes.join(" "), ">").concat(_this.content, "</div>\""));
                }
            }
            else {
                var elem = _this._getElement();
                if (elem) {
                    elem.style.backgroundColor = null;
                    _this.active = false;
                }
                else {
                    console.warn("Error in activation hook <Deactivate>: No element matching <div class=\"".concat(_this.classes.join(" "), ">").concat(_this.content, "</div>\""));
                }
            }
        });
    };
    return MyElement;
}());
var Day = /** @class */ (function () {
    function Day(month, day) {
        this.month = month;
        this.day = day;
    }
    return Day;
}());
function getStartAndEndDate(month, year) {
    // Ensure month is between 1 (January) and 12 (December)
    if (month < 1 || month > 12) {
        throw new Error('Month should be between 1 and 12.');
    }
    // Create a new Date object with the given year and month
    var startDate = new Date(year, month - 1, 1); // Note: Months are zero-based (0 = January, 11 = December)
    // Calculate the end date of the month
    var endDate = new Date(year, month, 0); // Setting day to 0 gives the last day of the previous month
    return { start: startDate, end: endDate };
}
var Calendar = /** @class */ (function () {
    function Calendar(month, year) {
        this.month = 1;
        this.year = 1970;
        this.weeks = [[], [], [], [], []];
        this.index = [
            "SUN",
            "MON",
            "TUES",
            "WED",
            "THURS",
            "FRI",
            "SAT"
        ];
        this.monthAbbreviations = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
        ].map(function (month) { return month.toUpperCase(); });
        this.monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ].map(function (month) { return month.toUpperCase(); });
        this.eList = [];
        this.month = month;
        this.year = year;
        Calendar.listeners = [];
    }
    Calendar.prototype.addListener = function (callback) {
        Calendar.listeners.push(callback);
    };
    Calendar.prototype.onClicked = function (args) {
        for (var x = 0; x < Calendar.listeners.length; x++) {
            Calendar.listeners[x](args);
        }
    };
    Calendar.prototype.getMonthName = function (m) {
        return this.monthNames[m - 1];
    };
    Calendar.prototype.render = function () {
        var data = "";
        var _a = getStartAndEndDate(this.month, this.year), start = _a.start, end = _a.end;
        var start_i = this.index.indexOf("".concat(start).split(" ")[0].toUpperCase());
        var end_i = parseInt("".concat(end).split(" ")[2]);
        console.log("end_i: ".concat(end_i, ", end: ").concat(end));
        var c_i = start_i;
        var date = 1;
        for (var i_1 = 0; i_1 < start_i; i_1++) {
            var tmp = new MyElement(this, [], null);
            tmp.content = "\u2800"; // EMPTY element
            tmp.__class = null;
            tmp.classes.push("date");
            this.eList.push(tmp);
        }
        var _loop_1 = function () {
            if (c_i == 8) {
                c_i = 1;
            }
            var tmp = new MyElement(this_1, [], null);
            tmp.onclick = function () {
                var eData = {
                    target: null,
                    timestamp: new Date().toISOString(),
                    __be__data: {
                        class: tmp
                    }
                };
                c.onClicked(eData);
            };
            tmp.content = "".concat(date);
            tmp.__class = tmp;
            tmp.classes.push("date");
            this_1.eList.push(tmp);
            date++;
            if (date > end_i) {
                return "break";
            }
        };
        var this_1 = this;
        while (true) {
            var state_1 = _loop_1();
            if (state_1 === "break")
                break;
        }
        var i = 0;
        for (var _i = 0, _b = this.eList; _i < _b.length; _i++) {
            var e = _b[_i];
            e.activate();
            i++;
            console.log("activated");
        }
        this.last_render = this.eList;
        this.eList = [];
        return { data: this.last_render.map(function (e) { return e.render(e.content); }), elems: this.last_render };
    };
    return Calendar;
}());
var date = new Date();
var c = new Calendar(date.getMonth() + 1, date.getFullYear());
var calendar_root;
var calendar;
var timeDisplay;
var monthDisplay;
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, data, elems;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, wait(300)];
                case 1:
                    _b.sent();
                    if (!calendar_root) {
                        calendar = document.getElementById("display");
                        calendar_root = (0, client_1.createRoot)(calendar);
                        monthDisplay = document.getElementById("cal-title");
                    }
                    timeDisplay = document.getElementById("time");
                    _a = c.render(), data = _a.data, elems = _a.elems;
                    if (calendar) {
                        calendar_root.render(data);
                        monthDisplay.textContent = "".concat(c.getMonthName(c.month), " ").concat(c.year);
                        console.warn("Should have rendered.");
                    }
                    else {
                        console.log("Calendar: ".concat(calendar));
                    }
                    return [2 /*return*/, { calendar: c, elements: elems }];
            }
        });
    });
}
exports.main = main;
document.body.addEventListener('update', function (e) {
    return __awaiter(this, void 0, void 0, function () {
        var ce, dta, _a, data, elems;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log(e);
                    ce = e;
                    dta = ce.detail.data;
                    c.month += parseInt(dta);
                    while (c.month > 12) {
                        c.month -= 12;
                        c.year++;
                    }
                    while (c.month < 1) {
                        c.month += 12;
                        c.year--;
                    }
                    _a = c.render(), data = _a.data, elems = _a.elems;
                    if (!calendar_root) {
                        calendar = document.getElementById("display");
                        calendar_root = (0, client_1.createRoot)(calendar);
                        monthDisplay = document.getElementById("cal-title");
                    }
                    calendar_root.unmount();
                    calendar_root = (0, client_1.createRoot)(calendar);
                    return [4 /*yield*/, wait(100)];
                case 1:
                    _b.sent();
                    calendar_root.render(data);
                    monthDisplay.textContent = "".concat(c.getMonthName(c.month), " ").concat(c.year);
                    return [2 /*return*/];
            }
        });
    });
});
document.body.addEventListener('taskUpdate', function (e) {
    return __awaiter(this, void 0, void 0, function () {
        var ce, dta, targt;
        return __generator(this, function (_a) {
            ce = e;
            dta = ce.detail.data;
            targt = ce.detail.target;
            return [2 /*return*/];
        });
    });
});
