'use strict';
/**
 *
 *
 * @class Draw
 */
class Draw {
  constructor(target) {
    this.registerSYNC = () => {
      const baseName = '_i8smdi01ede';
      let isStorage = !!localStorage.getItem(baseName);
      if (!isStorage) {
        let regKeys = Object.keys(this.REGISTER);
        let tmp__ = {};
        regKeys.forEach(a => (tmp__[a] = this.REGISTER[a]));
        tmp__ = JSON.stringify(tmp__);
        localStorage.setItem(baseName, '{ provider : ' + tmp__ + ' }');
      }
      return this;
    };
    this.registerADD = ({ register = 'A', type = '', ref = '' }) => {
      switch (type) {
        case 'image':
          (async () => {
            let _img = new Image();
            _img.src = ref;
            var _canvas = document.createElement('canvas');
            _canvas.width = _img.width;
            _canvas.height = _img.height;
            var _ctx = _canvas.getContext('2d');
            var dataURL;
            await _img.addEventListener('load', () =>
              _ctx.drawImage(_img, 0, 0)
            );
            dataURL = _canvas.toDataURL('image/png');
            this.REGISTER[register] = dataURL;
          })();
          break;
        case 'val':
          this.REGISTER[register] = ref;
          break;
      }
      return this;
    };
    this.registerMOV = (_old, _new) => {
      this.REGISTER[_new] = this.REGISTER[_old];
      this.REGISTER[_old] = null;
      return this;
    };
    this.registerDELETE = ({ register = 'A' }) => {
      this.REGISTER[register] = null;
      return this;
    };
    this.registerUSE = register => this.REGISTER[register];
    this.registerCHECK = () => {
      console.table(this.REGISTER);
      return this;
    };
    this.add = (type, args) => {
      let bufferId;
      bufferId = Object.keys(this.buffer).length;
      this.buffer[this.bufferSize] = {
        // ref : ref,
        id: bufferId,
        type: type,
        arguments: args,
      };
      this.bufferSize++;
      return this;
    };
    this.draw = (inComming = {}) => {
      let id = inComming['id'];
      let type = inComming['type'];
      let args = inComming['arguments'];
      this.ctx.fillStyle = '#000000';
      switch (type) {
        case 'pixel':
          //this.ctx.fillStyle = args[ 2 ]['color'] || args[ 2 ]['color'];
          this.ctx.fillRect(args[0], args[1], 1, 1);
          break;
        case 'method':
          //Array of pixels
          break;
        case 'rect':
          this.ctx.fillStyle = args[4]['color'];
          this.ctx.fillRect(args[0], args[1], args[2], args[3]);
          break;
        case 'text':
          //A simple text
          break;
        case 'image':
          var image = new Image();
          image.src = args[4]['src'];
          image.addEventListener('load', () => {
            //image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight
            this.ctx.drawImage(image, args[0], args[1]);
          });
          break;
        default:
          throw new Error('');
          return null;
          break;
      }
    };
    this.refresh = () => this.ctx.clearRect(0, 0, 1200, 720);
    this.build = () => {
      this.refresh();
      let bufferKeys = Object.keys(this.buffer);
      bufferKeys.forEach(pixel => this.draw(this.buffer[pixel]));
      this.bufferSize = 0;
      console.table(this.buffer);
      window.requestAnimationFrame(() => this.build());
      return this;
    };
    this.buffer = {};
    this.bufferSize = 0;
    this.targetDraw = target;
    this.ctx = this.targetDraw.getContext('2d');
    this.REGISTER = {
      AH: '',
      AL: '',
      BH: '',
      BL: '',
      CH: '',
      CL: '',
      DH: '',
      DL: '',
    };
    Object.preventExtensions(this.REGISTER);
  }
}
export default Draw;
