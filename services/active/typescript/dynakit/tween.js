"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tween = exports.TweenInfo = exports.cArgument = void 0;
var cArgument = /** @class */ (function () {
    function cArgument(name, value) {
        this.name = name;
        this.value = value;
    }
    return cArgument;
}());
exports.cArgument = cArgument;
var TweenInfo = /** @class */ (function () {
    /*

        State:
            -1: Placeholder
            0: Initialized / Reset
            1: Playing
            2: Paused
            3: Error

     */
    function TweenInfo() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.duration = 1000; // ms
        this.state = -1;
        this.set = [];
        for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
            var arg = args_1[_a];
            if (arg.name in this) {
                this[arg.name] = arg.value;
                this.set.push(arg.name);
            }
        }
        this.state = 0;
    }
    return TweenInfo;
}());
exports.TweenInfo = TweenInfo;
var Tween = /** @class */ (function () {
    function Tween(element, Properties) {
        this.differences = {};
        this.animationFrameId = null;
        this.startTime = null;
        this.properties = Properties;
        this.element = element;
        for (var prop in Properties) {
            if (Properties.hasOwnProperty(prop)) {
                var propertyValue = Properties[prop];
                for (var _i = 0, _a = Properties.set; _i < _a.length; _i++) {
                    var name_1 = _a[_i];
                    var difference = this.GetDifference(this.element, name_1);
                    this.differences[name_1] = difference;
                }
            }
        }
    }
    Tween.prototype.play = function () {
        if (!this.animationFrameId) {
            // Only start the animation if it's not already running
            this.startTime = performance.now();
            this.animate();
        }
    };
    Tween.prototype.pause = function () {
        if (this.animationFrameId) {
            // Stop the animation if it's running
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
            this.startTime = null;
        }
    };
    Tween.prototype.animate = function () {
        var _this = this;
        if (!this.startTime) {
            this.startTime = performance.now();
        }
        var currentTime = performance.now();
        var deltaTime = currentTime - this.startTime;
        for (var prop in this.properties) {
            if (this.properties.hasOwnProperty(prop)) {
                var initialValue = this.GetDifference(this.element, prop);
                var targetValue = this.properties[prop];
                if (typeof initialValue === 'number' && typeof targetValue === 'number') {
                    // Handle numeric properties with linear interpolation
                    var easedValue = this.ease(deltaTime, initialValue, targetValue, this.properties.duration);
                    this.element.style[prop] = "".concat(easedValue, "px");
                }
                else if (typeof initialValue === 'string' && typeof targetValue === 'string') {
                    if (prop === 'color') {
                        // Handle color properties (assuming they are provided in hex format)
                        var easedValue = this.interpolateColor(initialValue, targetValue, deltaTime, this.properties.duration);
                        this.element.style[prop] = easedValue;
                    }
                    else if (prop === 'rotate') {
                        // Handle rotation properties
                        var easedValue = this.interpolateRotation(initialValue, targetValue, deltaTime, this.properties.duration);
                        this.element.style.transform = "rotate(".concat(easedValue, "deg)");
                    }
                }
            }
        }
        if (deltaTime < this.properties.duration) {
            this.animationFrameId = requestAnimationFrame(function () { return _this.animate(); });
        }
        else {
            this.animationFrameId = null;
            this.startTime = null;
        }
    };
    // Implement an interpolation function for color properties
    Tween.prototype.interpolateColor = function (startColor, endColor, currentTime, duration) {
        // You would need to convert hex colors to RGB, interpolate the RGB values, and then convert back to hex
        // Here's a simplified example (you may need to handle color formats and edge cases differently):
        var startRGB = parseInt(startColor.slice(1), 16);
        var endRGB = parseInt(endColor.slice(1), 16);
        var interpolatedRGB = startRGB + (endRGB - startRGB) * (currentTime / duration);
        var interpolatedColor = "#".concat(Math.round(interpolatedRGB).toString(16));
        return interpolatedColor;
    };
    // Implement an interpolation function for rotation properties
    Tween.prototype.interpolateRotation = function (startRotation, endRotation, currentTime, duration) {
        var startAngle = parseFloat(startRotation);
        var endAngle = parseFloat(endRotation);
        return startAngle + (endAngle - startAngle) * (currentTime / duration);
    };
    Tween.prototype.GetDifference = function (e0, prop) {
        var GetValue = function (v) {
            if (typeof v === 'string') {
                var match = v.match(/([-+]?[0-9]*\.?[0-9]+)([a-zA-Z%]*)/);
                if (match) {
                    var numericalValue = parseFloat(match[1]);
                    var unit = match[2];
                    switch (unit) {
                        case 'px':
                            return numericalValue;
                        case '%':
                            return numericalValue / 100;
                        case 'em':
                            // Conversion factor for em to pixels
                            var emToPixels = 16; // 1em = 16px (default for many browsers)
                            return numericalValue * emToPixels;
                        case 'rem':
                            // Conversion factor for rem to pixels
                            var remToPixels = 16; // 1rem = 16px (default for many browsers)
                            return numericalValue * remToPixels;
                        // Add other units as needed
                        default:
                            return NaN; // Different unit type; return NaN
                    }
                }
            }
            if (typeof v === 'number') {
                return v; // If it's already a number, return it as is.
            }
            return 0; // Default to 0 if the value can't be converted to a number.
        };
        var diff = GetValue(e0[prop]) - GetValue(this[prop]);
        return diff;
    };
    Tween.prototype.SetProperty = function (prop, value) {
        this.properties[prop] = value;
        if (!this.properties.set.indexOf(prop)) {
            this.properties.set.push(prop);
        }
    };
    Tween.prototype.Reset = function (Properties) {
        if (Properties) {
            for (var prop in Properties) {
                if (Properties.hasOwnProperty(prop)) {
                    var propertyValue = Properties[prop];
                    for (var _i = 0, _a = Properties.set; _i < _a.length; _i++) {
                        var name_2 = _a[_i];
                        var difference = this.GetDifference(this.element, name_2);
                        this.differences[name_2] = difference;
                    }
                }
            }
        }
        else {
            for (var _b = 0, _c = this.properties.set; _b < _c.length; _b++) {
                var name_3 = _c[_b];
                var difference = this.GetDifference(this.element, name_3);
                this.differences[name_3] = difference;
            }
        }
    };
    Tween.prototype.ease = function (t, b, c, d) {
        return c * (t / d) + b;
    };
    return Tween;
}());
exports.Tween = Tween;
