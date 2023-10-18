"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.address = exports.time = exports.ins = exports.mark = exports.abbr = exports.q = exports.cite = exports.small = exports.strong = exports.em = exports.code = exports.pre = exports.blockquote = exports.submit = exports.checkbox = exports.radio = exports.legend = exports.fieldset = exports.option = exports.select = exports.label = exports.button = exports.textarea = exports.input = exports.form = exports.table = exports.ol = exports.li = exports.ul = exports.img = exports.span = exports.hr = exports.br = exports.header = exports.base = exports.script = exports.style = exports.link = exports.title = exports.meta = exports.a = exports.p = exports.div = exports.Route = exports.Router = exports.Root = void 0;
var event_1 = require("./event");
var routes_1 = require("./routes");
var Style = /** @class */ (function () {
    function Style(styleAttr) {
        this.attr = styleAttr;
    }
    return Style;
}());
var cElement = /** @class */ (function (_super) {
    __extends(cElement, _super);
    function cElement(classList, id, children) {
        if (classList === void 0) { classList = []; }
        if (id === void 0) { id = ''; }
        if (children === void 0) { children = []; }
        var _this = _super.call(this) || this;
        _this.style = new Style({});
        _this.classList = classList;
        _this.id = id;
        _this.children = children;
        _this.type = _this.constructor.name;
        return _this;
    }
    cElement.prototype.generate = function () {
        var _this = this;
        this.element = document.createElement(this.type.toLowerCase());
        this.classList.forEach(function (v, i, arr) {
            _this.element.classList.add(v);
        });
        this.element.id = this.id;
        var _loop_1 = function (x) {
            this_1.element.addEventListener(x, function (eventData) {
                _this.emit(x, eventData);
            });
        };
        var this_1 = this;
        for (var _i = 0, _a = this.getSupportedEvents(this.type); _i < _a.length; _i++) {
            var x = _a[_i];
            _loop_1(x);
        }
    };
    cElement.prototype.getSupportedEvents = function (elementType) {
        var eventTypes = [];
        var testElement = document.createElement(elementType);
        for (var key in window) {
            if (key.substring(0, 2) === 'on') {
                var eventType = key.substring(2);
                testElement.addEventListener(eventType, function () { }, false);
                if (typeof testElement['on' + eventType] !== 'function') {
                    eventTypes.push(eventType);
                }
            }
        }
        return eventTypes;
    };
    cElement.prototype.getAttributes = function () {
        var attributes = {};
        var elementAttributes = this.element.attributes;
        for (var i = 0; i < elementAttributes.length; i++) {
            var attribute = elementAttributes[i];
            attributes[attribute.name] = attribute.value;
        }
        return attributes;
    };
    return cElement;
}(event_1.CustomEventEmitter));
var Root = /** @class */ (function (_super) {
    __extends(Root, _super);
    function Root(rootId) {
        var _this = _super.call(this) || this;
        _this._compiled = [];
        var GenerateRandomName = function (size) {
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var result = '';
            var charactersLength = characters.length;
            for (var i = 0; i < size; i++) {
                var randomIndex = Math.floor(Math.random() * charactersLength);
                result += characters.charAt(randomIndex);
            }
            return result;
        };
        var root = document.getElementById(rootId);
        if (!root) {
            throw new Error("Error: Root is undefined. Element with ID ".concat(rootId, " does not exist"));
        }
        else {
            _this._root = document.createElement("div");
            _this._root.id = "_".concat(GenerateRandomName(7), "root");
            _this._routeDetector = new routes_1.RouteDetector();
            _this._routeDetector.on("New_Route-like_object", function (data) {
                _this.emit("new", data);
            });
        }
        return _this;
    }
    Root.prototype.compileElements = function (elements) {
        for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
            var e = elements_1[_i];
            this.compileElement(e);
        }
    };
    Root.prototype.compileElement = function (e) {
        if (!e.element) {
            e.generate();
        }
        this._compiled.push(e);
        this._root.appendChild(e.element);
    };
    Root.prototype.recompileAll = function () {
        this._root.innerHTML = "";
        this.compileElements(this._compiled);
    };
    return Root;
}(event_1.CustomEventEmitter));
exports.Root = Root;
var Router = /** @class */ (function (_super) {
    __extends(Router, _super);
    function Router() {
        var _this = _super.call(this, [], '', []) || this;
        _this.onchange = function () { };
        _this.on("click", function (e) {
            _this.onchange(e);
        });
        var attrs = _this.getAttributes();
        for (let [key, value] of Object.entries(attrs)) {
            if (key.toLowerCase() == "dest") {
                _this.dest = value;
            }
            else if (key.toLowerCase() == "text") {
                _this.text = value;
            }
        }
        if (!_this.dest) {
            throw new Error("Router tag requires a 'dest' attribute of type string, got undefined");
        }
        return _this;
    }
    return Router;
}(cElement));
exports.Router = Router;
var Route = /** @class */ (function (_super) {
    __extends(Route, _super);
    function Route() {
        var _this = _super.call(this, [], '', []) || this;
        _this.on("click", function (e) {
            _this.redirect();
        });
        var attrs = _this.getAttributes();
        for (let [key, value] of Object.entries(attrs)) {
            if (key.toLowerCase() == "dest") {
                _this.dest = value;
            }
            else if (key.toLowerCase() == "text") {
                _this.text = value;
            }
        }
        if (!_this.dest) {
            throw new Error("Route tag requires a 'dest' attribute of type string, got undefined");
        }
        return _this;
    }
    Route.prototype.redirect = function () {
        // Should be a DOM-wide event fired 'route-change' that includes the new 'dest'
    };
    return Route;
}(cElement));
exports.Route = Route;
var div = /** @class */ (function (_super) {
    __extends(div, _super);
    function div(classList, id, children) {
        if (classList === void 0) { classList = []; }
        if (id === void 0) { id = ''; }
        if (children === void 0) { children = []; }
        return _super.call(this, classList, id, children) || this;
    }
    return div;
}(cElement));
exports.div = div;
var p = /** @class */ (function (_super) {
    __extends(p, _super);
    function p(classList, id, children) {
        if (classList === void 0) { classList = []; }
        if (id === void 0) { id = ''; }
        if (children === void 0) { children = []; }
        var _this = _super.call(this, classList, id, children) || this;
        _this.type = "p";
        return _this;
    }
    return p;
}(cElement));
exports.p = p;
var a = /** @class */ (function (_super) {
    __extends(a, _super);
    function a(classList, id, children) {
        if (classList === void 0) { classList = []; }
        if (id === void 0) { id = ''; }
        if (children === void 0) { children = []; }
        var _this = _super.call(this, classList, id, children) || this;
        _this.type = "a";
        return _this;
    }
    return a;
}(cElement));
exports.a = a;
var meta = /** @class */ (function (_super) {
    __extends(meta, _super);
    function meta(classList, id, children) {
        if (classList === void 0) { classList = []; }
        if (id === void 0) { id = ''; }
        if (children === void 0) { children = []; }
        return _super.call(this, classList, id, children) || this;
    }
    return meta;
}(cElement));
exports.meta = meta;
var title = /** @class */ (function (_super) {
    __extends(title, _super);
    function title(classList, id, children) {
        if (classList === void 0) { classList = []; }
        if (id === void 0) { id = ''; }
        if (children === void 0) { children = []; }
        return _super.call(this, classList, id, children) || this;
    }
    return title;
}(cElement));
exports.title = title;
var link = /** @class */ (function (_super) {
    __extends(link, _super);
    function link(classList, id, children) {
        if (classList === void 0) { classList = []; }
        if (id === void 0) { id = ''; }
        if (children === void 0) { children = []; }
        return _super.call(this, classList, id, children) || this;
    }
    return link;
}(cElement));
exports.link = link;
var style = /** @class */ (function (_super) {
    __extends(style, _super);
    function style(classList, id, children) {
        if (classList === void 0) { classList = []; }
        if (id === void 0) { id = ''; }
        if (children === void 0) { children = []; }
        return _super.call(this, classList, id, children) || this;
    }
    return style;
}(cElement));
exports.style = style;
var script = /** @class */ (function (_super) {
    __extends(script, _super);
    function script(classList, id, children) {
        if (classList === void 0) { classList = []; }
        if (id === void 0) { id = ''; }
        if (children === void 0) { children = []; }
        return _super.call(this, classList, id, children) || this;
    }
    return script;
}(cElement));
exports.script = script;
var base = /** @class */ (function (_super) {
    __extends(base, _super);
    function base(classList, id, children) {
        if (classList === void 0) { classList = []; }
        if (id === void 0) { id = ''; }
        if (children === void 0) { children = []; }
        return _super.call(this, classList, id, children) || this;
    }
    return base;
}(cElement));
exports.base = base;
var header = /** @class */ (function (_super) {
    __extends(header, _super);
    function header(classList, id, children, hValue) {
        if (classList === void 0) { classList = []; }
        if (id === void 0) { id = ''; }
        if (children === void 0) { children = []; }
        if (hValue === void 0) { hValue = 1; }
        var _this = _super.call(this, classList, id, children) || this;
        _this.hValue = hValue;
        return _this;
    }
    return header;
}(cElement));
exports.header = header;
var br = /** @class */ (function (_super) {
    __extends(br, _super);
    function br(classList, id, children) {
        if (classList === void 0) { classList = []; }
        if (id === void 0) { id = ''; }
        if (children === void 0) { children = []; }
        return _super.call(this, classList, id, children) || this;
    }
    return br;
}(cElement));
exports.br = br;
var hr = /** @class */ (function (_super) {
    __extends(hr, _super);
    function hr(classList, id, children) {
        if (classList === void 0) { classList = []; }
        if (id === void 0) { id = ''; }
        if (children === void 0) { children = []; }
        return _super.call(this, classList, id, children) || this;
    }
    return hr;
}(cElement));
exports.hr = hr;
var span = /** @class */ (function (_super) {
    __extends(span, _super);
    function span(classList, id, children) {
        if (classList === void 0) { classList = []; }
        if (id === void 0) { id = ''; }
        if (children === void 0) { children = []; }
        return _super.call(this, classList, id, children) || this;
    }
    return span;
}(cElement));
exports.span = span;
var img = /** @class */ (function (_super) {
    __extends(img, _super);
    function img(classList, id, children) {
        if (classList === void 0) { classList = []; }
        if (id === void 0) { id = ''; }
        if (children === void 0) { children = []; }
        return _super.call(this, classList, id, children) || this;
    }
    return img;
}(cElement));
exports.img = img;
var ul = /** @class */ (function (_super) {
    __extends(ul, _super);
    function ul(classList, id, children) {
        if (classList === void 0) { classList = []; }
        if (id === void 0) { id = ''; }
        if (children === void 0) { children = []; }
        return _super.call(this, classList, id, children) || this;
    }
    return ul;
}(cElement));
exports.ul = ul;
var li = /** @class */ (function (_super) {
    __extends(li, _super);
    function li(classList, id, children) {
        if (classList === void 0) { classList = []; }
        if (id === void 0) { id = ''; }
        if (children === void 0) { children = []; }
        return _super.call(this, classList, id, children) || this;
    }
    return li;
}(cElement));
exports.li = li;
var ol = /** @class */ (function (_super) {
    __extends(ol, _super);
    function ol(classList, id, children) {
        if (classList === void 0) { classList = []; }
        if (id === void 0) { id = ''; }
        if (children === void 0) { children = []; }
        return _super.call(this, classList, id, children) || this;
    }
    return ol;
}(cElement));
exports.ol = ol;
var table = /** @class */ (function (_super) {
    __extends(table, _super);
    function table(classList, id, children) {
        if (classList === void 0) { classList = []; }
        if (id === void 0) { id = ''; }
        if (children === void 0) { children = []; }
        return _super.call(this, classList, id, children) || this;
    }
    return table;
}(cElement));
exports.table = table;
var form = /** @class */ (function (_super) {
    __extends(form, _super);
    function form(classList, id, children) {
        if (classList === void 0) { classList = []; }
        if (id === void 0) { id = ''; }
        if (children === void 0) { children = []; }
        return _super.call(this, classList, id, children) || this;
    }
    return form;
}(cElement));
exports.form = form;
var input = /** @class */ (function (_super) {
    __extends(input, _super);
    function input(classList, id, children) {
        if (classList === void 0) { classList = []; }
        if (id === void 0) { id = ''; }
        if (children === void 0) { children = []; }
        return _super.call(this, classList, id, children) || this;
    }
    return input;
}(cElement));
exports.input = input;
var textarea = /** @class */ (function (_super) {
    __extends(textarea, _super);
    function textarea(classList, id, children) {
        if (classList === void 0) { classList = []; }
        if (id === void 0) { id = ''; }
        if (children === void 0) { children = []; }
        return _super.call(this, classList, id, children) || this;
    }
    return textarea;
}(cElement));
exports.textarea = textarea;
var button = /** @class */ (function (_super) {
    __extends(button, _super);
    function button(classList, id, children) {
        if (classList === void 0) { classList = []; }
        if (id === void 0) { id = ''; }
        if (children === void 0) { children = []; }
        return _super.call(this, classList, id, children) || this;
    }
    return button;
}(cElement));
exports.button = button;
var label = /** @class */ (function (_super) {
    __extends(label, _super);
    function label(classList, id, children) {
        if (classList === void 0) { classList = []; }
        if (id === void 0) { id = ''; }
        if (children === void 0) { children = []; }
        return _super.call(this, classList, id, children) || this;
    }
    return label;
}(cElement));
exports.label = label;
var select = /** @class */ (function (_super) {
    __extends(select, _super);
    function select(classList, id, children) {
        if (classList === void 0) { classList = []; }
        if (id === void 0) { id = ''; }
        if (children === void 0) { children = []; }
        return _super.call(this, classList, id, children) || this;
    }
    return select;
}(cElement));
exports.select = select;
var option = /** @class */ (function (_super) {
    __extends(option, _super);
    function option(classList, id, children) {
        if (classList === void 0) { classList = []; }
        if (id === void 0) { id = ''; }
        if (children === void 0) { children = []; }
        return _super.call(this, classList, id, children) || this;
    }
    return option;
}(cElement));
exports.option = option;
var fieldset = /** @class */ (function (_super) {
    __extends(fieldset, _super);
    function fieldset(classList, id, children) {
        if (classList === void 0) { classList = []; }
        if (id === void 0) { id = ''; }
        if (children === void 0) { children = []; }
        return _super.call(this, classList, id, children) || this;
    }
    return fieldset;
}(cElement));
exports.fieldset = fieldset;
var legend = /** @class */ (function (_super) {
    __extends(legend, _super);
    function legend(classList, id, children) {
        if (classList === void 0) { classList = []; }
        if (id === void 0) { id = ''; }
        if (children === void 0) { children = []; }
        return _super.call(this, classList, id, children) || this;
    }
    return legend;
}(cElement));
exports.legend = legend;
var radio = /** @class */ (function (_super) {
    __extends(radio, _super);
    function radio(classList, id, children) {
        if (classList === void 0) { classList = []; }
        if (id === void 0) { id = ''; }
        if (children === void 0) { children = []; }
        return _super.call(this, classList, id, children) || this;
    }
    return radio;
}(cElement));
exports.radio = radio;
var checkbox = /** @class */ (function (_super) {
    __extends(checkbox, _super);
    function checkbox(classList, id, children) {
        if (classList === void 0) { classList = []; }
        if (id === void 0) { id = ''; }
        if (children === void 0) { children = []; }
        return _super.call(this, classList, id, children) || this;
    }
    return checkbox;
}(cElement));
exports.checkbox = checkbox;
var submit = /** @class */ (function (_super) {
    __extends(submit, _super);
    function submit(classList, id, children) {
        if (classList === void 0) { classList = []; }
        if (id === void 0) { id = ''; }
        if (children === void 0) { children = []; }
        return _super.call(this, classList, id, children) || this;
    }
    return submit;
}(cElement));
exports.submit = submit;
var blockquote = /** @class */ (function (_super) {
    __extends(blockquote, _super);
    function blockquote(classList, id, children) {
        if (classList === void 0) { classList = []; }
        if (id === void 0) { id = ''; }
        if (children === void 0) { children = []; }
        return _super.call(this, classList, id, children) || this;
    }
    return blockquote;
}(cElement));
exports.blockquote = blockquote;
var pre = /** @class */ (function (_super) {
    __extends(pre, _super);
    function pre(classList, id, children) {
        if (classList === void 0) { classList = []; }
        if (id === void 0) { id = ''; }
        if (children === void 0) { children = []; }
        return _super.call(this, classList, id, children) || this;
    }
    return pre;
}(cElement));
exports.pre = pre;
var code = /** @class */ (function (_super) {
    __extends(code, _super);
    function code(classList, id, children) {
        if (classList === void 0) { classList = []; }
        if (id === void 0) { id = ''; }
        if (children === void 0) { children = []; }
        return _super.call(this, classList, id, children) || this;
    }
    return code;
}(cElement));
exports.code = code;
var em = /** @class */ (function (_super) {
    __extends(em, _super);
    function em(classList, id, children) {
        if (classList === void 0) { classList = []; }
        if (id === void 0) { id = ''; }
        if (children === void 0) { children = []; }
        return _super.call(this, classList, id, children) || this;
    }
    return em;
}(cElement));
exports.em = em;
var strong = /** @class */ (function (_super) {
    __extends(strong, _super);
    function strong(classList, id, children) {
        if (classList === void 0) { classList = []; }
        if (id === void 0) { id = ''; }
        if (children === void 0) { children = []; }
        return _super.call(this, classList, id, children) || this;
    }
    return strong;
}(cElement));
exports.strong = strong;
var small = /** @class */ (function (_super) {
    __extends(small, _super);
    function small(classList, id, children) {
        if (classList === void 0) { classList = []; }
        if (id === void 0) { id = ''; }
        if (children === void 0) { children = []; }
        return _super.call(this, classList, id, children) || this;
    }
    return small;
}(cElement));
exports.small = small;
var cite = /** @class */ (function (_super) {
    __extends(cite, _super);
    function cite(classList, id, children) {
        if (classList === void 0) { classList = []; }
        if (id === void 0) { id = ''; }
        if (children === void 0) { children = []; }
        return _super.call(this, classList, id, children) || this;
    }
    return cite;
}(cElement));
exports.cite = cite;
var q = /** @class */ (function (_super) {
    __extends(q, _super);
    function q(classList, id, children) {
        if (classList === void 0) { classList = []; }
        if (id === void 0) { id = ''; }
        if (children === void 0) { children = []; }
        return _super.call(this, classList, id, children) || this;
    }
    return q;
}(cElement));
exports.q = q;
var abbr = /** @class */ (function (_super) {
    __extends(abbr, _super);
    function abbr(classList, id, children) {
        if (classList === void 0) { classList = []; }
        if (id === void 0) { id = ''; }
        if (children === void 0) { children = []; }
        return _super.call(this, classList, id, children) || this;
    }
    return abbr;
}(cElement));
exports.abbr = abbr;
var mark = /** @class */ (function (_super) {
    __extends(mark, _super);
    function mark(classList, id, children) {
        if (classList === void 0) { classList = []; }
        if (id === void 0) { id = ''; }
        if (children === void 0) { children = []; }
        return _super.call(this, classList, id, children) || this;
    }
    return mark;
}(cElement));
exports.mark = mark;
var ins = /** @class */ (function (_super) {
    __extends(ins, _super);
    function ins(classList, id, children) {
        if (classList === void 0) { classList = []; }
        if (id === void 0) { id = ''; }
        if (children === void 0) { children = []; }
        return _super.call(this, classList, id, children) || this;
    }
    return ins;
}(cElement));
exports.ins = ins;
var time = /** @class */ (function (_super) {
    __extends(time, _super);
    function time(classList, id, children) {
        if (classList === void 0) { classList = []; }
        if (id === void 0) { id = ''; }
        if (children === void 0) { children = []; }
        return _super.call(this, classList, id, children) || this;
    }
    return time;
}(cElement));
exports.time = time;
var address = /** @class */ (function (_super) {
    __extends(address, _super);
    function address(classList, id, children) {
        if (classList === void 0) { classList = []; }
        if (id === void 0) { id = ''; }
        if (children === void 0) { children = []; }
        return _super.call(this, classList, id, children) || this;
    }
    return address;
}(cElement));
exports.address = address;