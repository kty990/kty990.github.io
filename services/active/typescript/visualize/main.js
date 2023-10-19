"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._2D_Visualizer = exports.Point = exports._3D_Visualizer = void 0;
var THREE = require("three");
var _3D_Visualizer = /** @class */ (function () {
    function _3D_Visualizer(container) {
        if (!(container instanceof HTMLElement)) {
            throw new Error("_3D_Visualizer requires a parameter 'container' of type HTMLElement, got ".concat(typeof container));
        }
        this.container = container;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();
        this.plugins = [];
        this.init();
    }
    _3D_Visualizer.prototype.init = function () {
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.container.appendChild(this.renderer.domElement);
    };
    _3D_Visualizer.prototype.addPlugin = function (plugin) {
        this.plugins.push(plugin);
        if (typeof plugin.init === 'function') {
            plugin.init(this.scene, this.camera, this.renderer);
        }
    };
    _3D_Visualizer.prototype.render = function () {
        var _this = this;
        requestAnimationFrame(function () { return _this.render(); });
        // Add your rendering logic here, combining 2D and 3D rendering as needed
        this.renderer.render(this.scene, this.camera);
    };
    return _3D_Visualizer;
}());
exports._3D_Visualizer = _3D_Visualizer;
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.prototype.getX = function () {
        return this.x;
    };
    Point.prototype.getY = function () {
        return this.y;
    };
    return Point;
}());
exports.Point = Point;
var _2D_Visualizer = /** @class */ (function () {
    function _2D_Visualizer(container) {
        this.validTypesMsg = "Valid types are:\n0: Type not chosen\n 1: Bar graph\n 2: Scatter plot (discrete)\n 3: Scatter plot (continuous)\n 4: Pie chart\n 5: Histogram";
        /*
          0: Type not chosen
          1: Bar graph
          2: Scatter plot (discrete)
          3: Scatter plot (continuous)
          4: Pie chart
          5: Histogram
        */
        this.type = 0;
        if (!(container instanceof HTMLElement)) {
            throw new Error("_2D_Visualizer requires a parameter 'container' of type HTMLElement, got ".concat(typeof container));
        }
        this.container = container;
        this._renderer = document.createElement("canvas");
        this._renderer_ctx = this._renderer.getContext('2d');
        // Set width and height attributes
        this._renderer.width = 1000; // Set the desired width
        this._renderer.height = 1000; // Set the desired height
        this._renderer.id = "renderer-visualize-2d";
        this.AddCSS();
        this.plugins = [];
    }
    _2D_Visualizer.prototype.AddCSS = function () {
        var renderCSS = document.createElement('link');
        renderCSS.rel = "stylesheet";
        renderCSS.href = './css/renderer.css';
        document.head.appendChild(renderCSS);
    };
    _2D_Visualizer.prototype.addPlugin = function (plugin) {
        this.plugins.push(plugin);
        if (typeof plugin.init === 'function') {
            plugin.init();
        }
    };
    _2D_Visualizer.prototype.setType = function (type) {
        this.type = type;
    };
    _2D_Visualizer.prototype.render = function (data) {
        /*
        0: Type not chosen
        1: Bar graph
        2: Scatter plot (discrete)
        3: Scatter plot (continuous)
        4: Pie chart
        5: Histogram
      */
        var values = data.values;
        var categories = data.categories;
        var x_values = data.x_values;
        switch (this.type) {
            case 0:
                throw new Error("Cannot render type 0 - Uninitialzed type. ".concat(this.validTypesMsg));
            case 1:
                this.DisplayBarGraph(categories, values);
            // Bar graph
            case 2:
                this.DisplayScatterPlot('discrete', x_values, values); // Categories = values on x axis
            //Scatter plot (discrete)
            case 3:
                this.DisplayScatterPlot('continuous', x_values, values); // Categories = values on x axis
            //Scatter plot (continuous)
            case 4:
                this.DisplayPieChart(categories, values);
            //Pie chart
            case 5:
                this.DisplayHistogram(values);
            //Histogram
        }
    };
    _2D_Visualizer.prototype.DisplayBarGraph = function (x_axis, y_axis) {
    };
    _2D_Visualizer.prototype.DisplayScatterPlot = function (type, x_axis, y_axis) {
        var _this = this;
        var GetRangeOfArr = function (arr) {
            return { min: Math.min.apply(Math, arr), max: Math.max.apply(Math, arr) };
        };
        var DrawDot = function (point) {
            _this._renderer_ctx.beginPath();
            _this._renderer_ctx.arc(point.getX(), point.getY(), 10, 0, 2 * Math.PI);
            _this._renderer_ctx.fillStyle = "#000";
            _this._renderer_ctx.fill();
            _this._renderer_ctx.closePath();
        };
        var DrawLine = function (start, end) {
            _this._renderer_ctx.beginPath(); // Start a new path
            _this._renderer_ctx.moveTo(start.getX(), start.getY()); // Starting point
            _this._renderer_ctx.lineTo(end.getX(), end.getY()); // Ending point
            _this._renderer_ctx.strokeStyle = "#000"; // Line color
            _this._renderer_ctx.lineWidth = 2; // Line width
            _this._renderer_ctx.stroke(); // Draw the line
        };
        var range_x = GetRangeOfArr(x_axis);
        var range_y = GetRangeOfArr(y_axis);
        var xScale = Math.abs(range_x.min - range_x.max) * this._renderer.width;
        var yScale = Math.abs(range_y.min - range_y.max) * this._renderer.height;
        var points = [];
        for (var x = 0; x < x_axis.length; x++) {
            for (var y = 0; y < y_axis.length; y++) {
                var point = new Point(x_axis[x], y_axis[y]);
                points.push(point);
            }
        }
        if (type == "discrete") {
            for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
                var point = points_1[_i];
                DrawDot(point);
            }
        }
        else if (type == "continuous") {
            var lastPoint = null;
            for (var _a = 0, points_2 = points; _a < points_2.length; _a++) {
                var point = points_2[_a];
                DrawDot(point);
                if (lastPoint) {
                    DrawLine(lastPoint, point);
                }
                lastPoint = point;
            }
        }
    };
    _2D_Visualizer.prototype.DisplayPieChart = function (x_axis, y_axis) {
        var ConvertToStringArr = function (arr) {
            var tmp = [];
            for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
                var x_1 = arr_1[_i];
                tmp.push("".concat(x_1));
            }
            return tmp;
        };
        var x = ConvertToStringArr(x_axis);
        var y = y_axis;
    };
    _2D_Visualizer.prototype.DisplayHistogram = function (values) {
    };
    return _2D_Visualizer;
}());
exports._2D_Visualizer = _2D_Visualizer;
