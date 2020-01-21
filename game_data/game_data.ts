import Draw from './class/canvas/canvas.js';

const render = new Draw( document.querySelector( '#view-port' ) );

//someCode{}
render
.add( "pixel", [920, 20, 150, 100, { "color" : "#FF0000" }] )
.add( "pixel", [20, 20, 150, 100, { "color" : "#FF0000" }] )
.add( "image", [120, 600, 150, 100, { "src" : "https://www.stickpng.com/assets/images/580b585b2edbce24c47b26b8.png" }] )
.add( "image", [220, 600, 150, 100, { "src" : "https://www.stickpng.com/assets/images/580b585b2edbce24c47b26b8.png" }] )

//Some code {}
render
.add( "image", [320, 600, 150, 100, { "src" : "https://www.stickpng.com/assets/images/580b585b2edbce24c47b26b8.png" }] )
.add( "image", [420, 600, 150, 100, { "src" : "https://www.stickpng.com/assets/images/580b585b2edbce24c47b26b8.png" }] )
.add( "image", [520, 600, 150, 100, { "src" : "https://www.stickpng.com/assets/images/580b585b2edbce24c47b26b8.png" }] )
.add( "image", [620, 600, 150, 100, { "src" : "https://www.stickpng.com/assets/images/580b585b2edbce24c47b26b8.png" }] )
.add( "image", [720, 600, 150, 100, { "src" : "https://www.stickpng.com/assets/images/580b585b2edbce24c47b26b8.png" }] )


render.registerADD( { register : 'AH', type : 'image', ref : 'https://www.stickpng.com/assets/images/580b585b2edbce24c47b26b8.png' } )
.registerCHECK();

console.log( render.registerUSE( 'AH ' ) );

//Render Buffer ...
render.build();