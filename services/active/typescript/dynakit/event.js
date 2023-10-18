"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomEventEmitter = void 0;
var CustomEventEmitter = /** @class */ (function () {
    function CustomEventEmitter() {
        this.events = {};
    }
    CustomEventEmitter.prototype.on = function (channel, listener) {
        if (!this.events[channel]) {
            this.events[channel] = [];
        }
        this.events[channel].push(listener);
    };
    CustomEventEmitter.prototype.off = function (channel, listener) {
        if (this.events[channel] && this.events[channel].indexOf(listener) !== -1) {
            this.events[channel].splice(this.events[channel].indexOf(listener));
        }
    };
    CustomEventEmitter.prototype.emit = function (channel, data) {
        var listeners = this.events[channel];
        if (listeners) {
            for (var _i = 0, listeners_1 = listeners; _i < listeners_1.length; _i++) {
                var listener = listeners_1[_i];
                listener(data);
            }
        }
    };
    return CustomEventEmitter;
}());
exports.CustomEventEmitter = CustomEventEmitter;
