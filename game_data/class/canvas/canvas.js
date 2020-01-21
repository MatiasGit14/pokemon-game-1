"use strict";
var Draw = /** @class */ (function () {
    function Draw(target) {
        var _this = this;
        this.registerADD = function (_a) {
            var _b = _a.register, register = _b === void 0 ? 'A' : _b, _c = _a.type, type = _c === void 0 ? '' : _c, _d = _a.ref, ref = _d === void 0 ? '' : _d;
            switch (type) {
                case 'image':
                    var _img_1 = new Image();
                    _img_1.src = ref;
                    var _canvas = document.createElement("canvas");
                    _canvas.width = _img_1.width;
                    _canvas.height = _img_1.height;
                    var _ctx = _canvas.getContext("2d");
                    var dataURL = _canvas.toDataURL("image/png");
                    _img_1.addEventListener('load', function () {
                        _ctx.drawImage(_img_1, 0, 0);
                    });
                    _this.REGISTER[register] = dataURL;
                    break;
            }
            return _this;
        };
        this.registerMOV = function (_old, _new) {
            _this.REGISTER[_new] = _this.REGISTER[_old];
            _this.REGISTER[_old] = null;
        };
        this.registerDELETE = function (_a) {
            var _b = _a.register, register = _b === void 0 ? 'A' : _b;
            return _this;
        };
        this.registerUSE = function (register) {
            return _this.REGISTER[register];
        };
        this.registerCHECK = function () {
            console.table(_this.REGISTER);
        };
        this.add = function (type, args) {
            var bufferId;
            bufferId = Object.keys(_this.buffer).length;
            _this.buffer[_this.bufferSize] = {
                id: bufferId,
                type: type,
                arguments: args
            };
            _this.bufferSize++;
            return _this;
        };
        this.draw = function (inComming) {
            if (inComming === void 0) { inComming = {}; }
            var id = inComming['id'];
            var type = inComming['type'];
            var args = inComming['arguments'];
            _this.ctx.fillStyle = "#000000";
            switch (type) {
                case 'pixel':
                    _this.ctx.fillStyle = args[2]['color'] || args[2]['color'];
                    _this.ctx.fillRect(args[0], args[1], 5, 5);
                    break;
                case 'method':
                    //Array of pixels
                    break;
                case 'rect':
                    _this.ctx.fillStyle = args[4]['color'];
                    _this.ctx.fillRect(args[0], args[1], args[2], args[3]);
                    break;
                case 'text':
                    //A simple text
                    break;
                case 'image':
                    var image = new Image();
                    image.src = args[4]['src'];
                    image.addEventListener('load', function () {
                        //image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight
                        _this.ctx.drawImage(image, args[0], args[1]);
                    });
                    break;
                default:
                    throw new Error('');
                    return null;
                    break;
            }
        };
        this.refresh = function () { return _this.ctx.clearRect(0, 0, 1200, 720); };
        this.buffer = {};
        this.bufferSize = 0;
        this.targetDraw = target;
        this.ctx = this.targetDraw.getContext("2d");
        this.REGISTER = {
            AH: "",
            AL: "",
            BH: "",
            BL: "",
            CH: "",
            CL: "",
            DH: "",
            DL: ""
        };
        Object.preventExtensions(this.REGISTER);
    }
    Draw.prototype.getBase64Image = function (img) {
    };
    Draw.prototype.build = function () {
        var _this = this;
        this.refresh();
        var bufferKeys = Object.keys(this.buffer);
        bufferKeys.forEach(function (pixel) { return _this.draw(_this.buffer[pixel]); });
        this.buffer = {};
        this.bufferSize = 0;
    };
    return Draw;
}());
export default Draw;
