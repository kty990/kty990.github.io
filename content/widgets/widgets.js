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
            this.props = props;
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
        console.log(content, this.content);
        this.element = React.createElement(eType, this.props || elementProps, content || "E.404");
        return this.element;
    };
    MyElement.prototype.activate = function () {
        var _this = this;
        this.activated = true;
        this.calendar.addListener(function (event) {
            console.log(event);
            var elem = event.target;
            if (elem == _this.element) {
                _this.element.style.backgroundColor = "#01234ff";
                _this.active = true;
            }
            else {
                _this.element.style.backgroundColor = null;
                _this.active = false;
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
        this.listeners = [];
        this.eList = [];
        this.month = month;
        this.year = year;
    }
    Calendar.prototype.addListener = function (callback) {
        this.listeners.push(callback);
    };
    Calendar.prototype.onClicked = function (args) {
        for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
            var listener = _a[_i];
            listener.apply(void 0, args);
        }
    };
    Calendar.prototype.render = function (active) {
        var data = "";
        if (active != null) {
            var _a = getStartAndEndDate(this.month, this.year), start = _a.start, end = _a.end;
            var start_i = this.index.indexOf("".concat(start).split(" ")[0].toUpperCase());
            var end_i = parseInt("".concat(end).split(" ")[2]);
            console.log("end_i: ".concat(end_i));
            var c_i = start_i;
            var date_1 = 1;
            var current_week = 0;
            for (var i_1 = 0; i_1 < start_i - 1; i_1++) {
                var tmp = new MyElement(this, [], null);
                tmp.content = '';
                this.eList.push(tmp);
            }
            while (true) {
                if (c_i == 8) {
                    c_i = 1;
                    current_week++;
                }
                var color = "";
                for (var i_2 = 0; i_2 < active.length; i_2++) {
                    var a = active[i_2];
                    if ("".concat(a.month).toUpperCase() == this.monthAbbreviations[this.month - 1].toUpperCase() && a.day.replace(":", "") == date_1) {
                        color = '#6445a3';
                        break;
                    }
                }
                console.log({ day: date_1, color: color });
                var tmp = new MyElement(this, [], { classes: ['date'] });
                tmp.content = date_1.toString();
                this.eList.push(tmp);
                date_1++;
                if (date_1 > end_i) {
                    break;
                }
            }
        }
        else {
            var _b = getStartAndEndDate(this.month, this.year), start = _b.start, end = _b.end;
            var start_i = this.index.indexOf("".concat(start).split(" ")[0].toUpperCase());
            var end_i = parseInt("".concat(end).split(" ")[2]);
            console.log("end_i: ".concat(end_i, ", end: ").concat(end));
            var c_i = start_i;
            var date_2 = 1;
            var current_week = 0;
            for (var i_3 = 0; i_3 < start_i; i_3++) {
                var tmp = new MyElement(this, [], { classes: ['date'] });
                tmp.content = '';
                this.eList.push(tmp);
            }
            while (true) {
                if (c_i == 8) {
                    c_i = 1;
                    current_week++;
                }
                var tmp = new MyElement(this, [], { classes: ['date'] });
                tmp.content = date_2.toString();
                this.eList.push(tmp);
                date_2++;
                if (date_2 > end_i) {
                    break;
                }
            }
        }
        var i = 0;
        for (var _i = 0, _c = this.eList; _i < _c.length; _i++) {
            var e = _c[_i];
            e.activate();
            i++;
            console.log("activated");
        }
        return { data: this.eList.map(function (e) { return e.render(e.content); }), elems: this.eList };
    };
    return Calendar;
}());
var date = new Date();
var c = new Calendar(date.getMonth() + 1, date.getFullYear());
function main() {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var calendar, calendar_root, timeDisplay, _b, data, elems;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, wait(300)];
                case 1:
                    _c.sent();
                    calendar = document.getElementById("display");
                    calendar_root = (0, client_1.createRoot)(calendar);
                    timeDisplay = (_a = document.getElementById("list")) === null || _a === void 0 ? void 0 : _a.querySelector("#time");
                    _b = c.render(null), data = _b.data, elems = _b.elems;
                    if (calendar) {
                        calendar_root.render(data);
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
    console.log(e);
});
