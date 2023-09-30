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
exports.main = void 0;
function wait(ms) {
    return new Promise(function (resolve, reject) {
        setTimeout(resolve, ms);
    });
}
var MyElement = /** @class */ (function () {
    function MyElement(inHTML, cal, element) {
        this.active = false;
        this.content = inHTML;
        this.calendar = cal;
        this.element = element;
    }
    MyElement.prototype.activate = function () {
        var _this = this;
        this.calendar.addListener(function (event) {
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
        var data = "", eList = [];
        if (active != null) {
            var _a = getStartAndEndDate(this.month, this.year), start = _a.start, end = _a.end;
            var start_i = this.index.indexOf("".concat(start).split(" ")[0].toUpperCase());
            var end_i = parseInt("".concat(end).split(" ")[2]);
            console.log("end_i: ".concat(end_i));
            var c_i = start_i;
            var date = 1;
            var current_week = 0;
            for (var i_1 = 0; i_1 < start_i - 1; i_1++) {
                this.weeks[current_week].push("<div class=\"empty-day\"></div>");
            }
            while (true) {
                if (c_i == 8) {
                    c_i = 1;
                    current_week++;
                }
                var color = "";
                for (var i_2 = 0; i_2 < active.length; i_2++) {
                    var a = active[i_2];
                    if ("".concat(a.month).toUpperCase() == this.monthAbbreviations[this.month - 1].toUpperCase() && a.day.replace(":", "") == date) {
                        color = '#6445a3';
                        break;
                    }
                }
                console.log({ day: date, color: color });
                this.weeks[current_week].push("<div style=".concat(color == "#6445a3" ? "background-color:".concat(color) : "", " class=\"date\" onclick=").concat(this.onClicked, "><p>").concat(date, "</p></div>"));
                eList.push(new MyElement("<div style=".concat(color == "#6445a3" ? "background-color:".concat(color) : "", " class=\"date\"><p>").concat(date, "</p></div>"), this, null));
                date++;
                if (date > end_i) {
                    break;
                }
            }
            for (var _i = 0, _b = this.weeks; _i < _b.length; _i++) {
                var x = _b[_i];
                data = data + x.join("\n");
            }
        }
        else {
            var _c = getStartAndEndDate(this.month, this.year), start = _c.start, end = _c.end;
            var start_i = this.index.indexOf("".concat(start).split(" ")[0].toUpperCase());
            var end_i = parseInt("".concat(end).split(" ")[2]);
            console.log("end_i: ".concat(end_i, ", end: ").concat(end));
            var c_i = start_i;
            var date = 1;
            var current_week = 0;
            for (var i_3 = 0; i_3 < start_i; i_3++) {
                this.weeks[current_week].push("<div class=\"empty-day\"></div>");
            }
            while (true) {
                if (c_i == 8) {
                    c_i = 1;
                    current_week++;
                }
                this.weeks[current_week].push("<div class=\"date\"><p>".concat(date, "</p></div>")); //style="color:${'black'}"
                eList.push(new MyElement("<div class=\"date\"><p>".concat(date, "</p></div>"), this, null));
                date++;
                if (date > end_i) {
                    break;
                }
            }
            for (var _d = 0, _e = this.weeks; _d < _e.length; _d++) {
                var x = _e[_d];
                data = data + x.join("\n");
            }
        }
        var es = document.getElementsByClassName("date");
        var i = 0;
        for (var _f = 0, eList_1 = eList; _f < eList_1.length; _f++) {
            var e = eList_1[_f];
            e.element = es[i];
            e.activate();
            i++;
        }
        return { data: data, elements: eList };
    };
    return Calendar;
}());
function main() {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var calendar, timeDisplay, date, c, _b, data, elements, cal_innerHTML;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, wait(200)];
                case 1:
                    _c.sent();
                    calendar = document.getElementById("display");
                    timeDisplay = (_a = document.getElementById("list")) === null || _a === void 0 ? void 0 : _a.querySelector("#time");
                    date = new Date();
                    c = new Calendar(date.getMonth() + 1, date.getFullYear());
                    _b = c.render(null), data = _b.data, elements = _b.elements;
                    cal_innerHTML = calendar.innerHTML;
                    calendar.innerHTML = cal_innerHTML + data;
                    return [2 /*return*/];
            }
        });
    });
}
exports.main = main;
