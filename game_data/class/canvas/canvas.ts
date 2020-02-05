"use strict"
/**
 *
 *
 * @class Draw
 */
class Draw {

    buffer : any;
    bufferSize : number;
    targetDraw : any;
    ctx : any;
    REGISTER : any;

    constructor( target : any ) {
        this.buffer = { };
        this.bufferSize = 0;
        this.targetDraw = target;
        this.ctx = this.targetDraw.getContext( "2d" );
        this.REGISTER = {
            AH : "",
            AL : "",
            BH : "",
            BL : "",
            CH : "",
            CL : "",
            DH : "",
            DL : ""
        }
        Object.preventExtensions( this.REGISTER );
    }

    registerSYNC = () => {
        const baseName = "_i8smdi01ede";
        let isStorage = !!localStorage.getItem( baseName );
        if( !isStorage ) {
            let regKeys = Object.keys( this.REGISTER );
            let tmp__ : any = { };
            regKeys.forEach( a =>  tmp__[ a ] = this.REGISTER[ a ] );
            tmp__ = JSON.stringify( tmp__ );
            localStorage.setItem( baseName, '{ provider : '+ tmp__ +' }' );
        }
        return this;
    }

    registerADD = ( { register = 'A', type = '', ref = '' }  ) => {
        switch( type ){
            case 'image':
                ( async ( ) => {
                    let _img = new Image( );
                    _img.src = ref;
                    var _canvas = document.createElement("canvas");
                    _canvas.width = _img.width;
                    _canvas.height = _img.height;
                    var _ctx : any = _canvas.getContext("2d");
                    var dataURL;
                    await _img.addEventListener( 'load', ( ) =>  _ctx.drawImage(_img, 0, 0) );    
                    dataURL = _canvas.toDataURL( "image/png" );
                    this.REGISTER[ register ] = dataURL;
                })()
            break;

            case 'val':
                this.REGISTER[ register ] = ref;
            break;
        }
        return this;
    }

    registerMOV = ( _old : any, _new : any ) => {
        this.REGISTER[ _new ] = this.REGISTER[ _old ];
        this.REGISTER[ _old ] = null;
        return this;
    }

    registerDELETE = ( { register = 'A' } ) => {
        this.REGISTER[ register ] = null;
        return this;
    }

    registerUSE = ( register : any ) =>  this.REGISTER[ register ];

    registerCHECK = () => {
        console.table( this.REGISTER );
        return this;
    }

    add = ( type : string, args : Array< any > ) : any => {
        let bufferId : number;
        bufferId = Object.keys( this.buffer ).length;
        this.buffer[ this.bufferSize ] = {
           // ref : ref, 
            id : bufferId,
            type : type,
            arguments : args
        };
        this.bufferSize++;
        return this;
    }

    private draw = ( inComming : any = {} ) => {
        let id = inComming['id'];
        let type = inComming['type'];
        let args = inComming['arguments'];
        this.ctx.fillStyle = "#000000";
        switch( type ) {
            case 'pixel':
                //this.ctx.fillStyle = args[ 2 ]['color'] || args[ 2 ]['color'];
                this.ctx.fillRect( args[ 0 ], args[ 1 ], 1, 1 );
            break;

            case 'method':
                //Array of pixels
            break; 

            case 'rect':
                this.ctx.fillStyle = args[ 4 ]['color'];
                this.ctx.fillRect( args[ 0 ], args[ 1 ], args[ 2 ], args[ 3 ] );
            break; 

            case 'text':
                //A simple text
            break; 

            case 'image':
                var image : any = new Image();
                image.src = args[ 4 ][ 'src' ];
                image.addEventListener( 'load', () => {
                    //image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight
                    this.ctx.drawImage( image, args[ 0 ], args[ 1 ] );
                } );
            break; 
            
            default:
                throw new Error( '' );
                return null;
            break;
        }
    }

    refresh = () => this.ctx.clearRect( 0, 0, 1200, 720 ) ;

    build = ( ) => {
        this.refresh();
        let bufferKeys = Object.keys( this.buffer );
        bufferKeys.forEach( pixel =>  this.draw( this.buffer[ pixel ] ) );
        this.bufferSize = 0;
        console.table( this.buffer );
        window.requestAnimationFrame( () => this.build( ) );
        return this;
    }


}

export default Draw;