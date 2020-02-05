declare module "game_data/class/canvas/canvas" {
    class Draw {
        buffer: any;
        bufferSize: number;
        targetDraw: any;
        ctx: any;
        REGISTER: any;
        constructor(target: any);
        getBase64Image(img: any): void;
        registerADD: ({ register, type, ref }: {
            register?: string | undefined;
            type?: string | undefined;
            ref?: string | undefined;
        }) => this;
        registerMOV: (_old: any, _new: any) => void;
        registerDELETE: ({ register }: {
            register?: string | undefined;
        }) => this;
        registerUSE: (register: any) => any;
        registerCHECK: () => void;
        add: (type: string, args: any[]) => any;
        private draw;
        refresh: () => any;
        build(): void;
    }
    export default Draw;
}
declare module "game_data/game_data" { }
//# sourceMappingURL=out.d.ts.map