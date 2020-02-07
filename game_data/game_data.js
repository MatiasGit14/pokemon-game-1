import Draw from './class/canvas/canvas.js';
const render = new Draw(document.querySelector('#view-port'));
render
  .registerADD({ register: 'AH', type: 'val', ref: '' })
  .registerADD({ register: 'DL', type: 'val', ref: 'Lucas' })
  .registerADD({
    register: 'AL',
    type: 'image',
    ref: 'https://www.stickpng.com/assets/images/580b585b2edbce24c47b26b8.png',
  })
  .add('image', [
    120,
    600,
    150,
    100,
    {
      src:
        'https://www.stickpng.com/assets/images/580b585b2edbce24c47b26b8.png',
    },
  ])
  .add('image', [
    220,
    600,
    150,
    100,
    {
      src:
        'https://www.stickpng.com/assets/images/580b585b2edbce24c47b26b8.png',
    },
  ])
  .build();
console.log(render.registerUSE('AL'));
//Render Buffer ...
render.build();
