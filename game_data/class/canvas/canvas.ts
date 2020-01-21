"use strict"
class Draw {

    buffer : any;
    bufferSize : number;
    targetDraw : any;
    ctx : any;
    REGISTER : any;

    constructor( target : any ) {
        this.buffer = {};
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

    getBase64Image( img :any ) {
        
    }

    registerADD = ( { register = 'A', type = '', ref = '' }  ) => {
        switch( type ){
            case 'image':
                let _img = new Image();
                _img.src = ref;
                var _canvas = document.createElement("canvas");
                _canvas.width = _img.width;
                _canvas.height = _img.height;
                var _ctx : any = _canvas.getContext("2d");
                let dataURL = _canvas.toDataURL("image/png");
                _img.addEventListener( 'load', () => {
                    _ctx.drawImage(_img, 0, 0);
                } );    
                this.REGISTER[ register ] = dataURL;
            break;
        }
        return this;
    }

    registerMOV = ( _old : any, _new : any ) : void => {
        this.REGISTER[ _new ] = this.REGISTER[ _old ];
        this.REGISTER[ _old ] = null;
    }

    registerDELETE = ( { register = 'A' } ) => {
        return this;
    }
    registerUSE = ( register : any ) => {
        return this.REGISTER[ register ];
    }
    registerCHECK = () => {
        console.table( this.REGISTER );
    }

    add = ( type : string, args : Array< any > ) : any => {
        let bufferId : number;
        bufferId = Object.keys( this.buffer ).length;
        this.buffer[ this.bufferSize ] = {
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
                this.ctx.fillStyle = args[ 2 ]['color'] || args[ 2 ]['color'];
                this.ctx.fillRect( args[ 0 ], args[ 1 ], 5, 5 );
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

    refresh = () => this.ctx.clearRect( 0,0,1200,720 ) ;

    build ( ) {
        this.refresh();
        let bufferKeys = Object.keys( this.buffer );
        bufferKeys.forEach( pixel =>  this.draw( this.buffer[ pixel ] ) );
        this.buffer = {};
        this.bufferSize = 0;
    }

}

export default Draw;