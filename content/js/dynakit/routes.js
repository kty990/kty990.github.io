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
exports.RouteDetector = void 0;
var event_1 = require("./event");
var RouteDetector = /** @class */ (function (_super) {
    __extends(RouteDetector, _super);
    function RouteDetector() {
        var _this = _super.call(this) || this;
        var targetElement = document.querySelector("Root"); // Replace with your desired class name
        var routes = [];
        if (targetElement) {
            var observer = new MutationObserver(function (mutationsList) {
                for (var _i = 0, mutationsList_1 = mutationsList; _i < mutationsList_1.length; _i++) {
                    var mutation = mutationsList_1[_i];
                    if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
                        // Child elements were added to the target element
                        mutation.addedNodes.forEach(function (node) {
                            if (node instanceof Element) {
                                var tagName = node.tagName; // Get the tag name in uppercase
                                if (tagName == "ROUTE" || tagName == "ROUTER") {
                                    _this.emit("New_Route-like_object", { type: tagName, element: node });
                                    routes.push({ "element": node });
                                }
                            }
                        });
                    }
                }
            });
            var config = { childList: true };
            observer.observe(targetElement, config);
        }
        else {
            console.error("Target element not found.");
        }
        return _this;
    }
    return RouteDetector;
}(event_1.CustomEventEmitter));
exports.RouteDetector = RouteDetector;
