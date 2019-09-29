import './typedef';

export default class Text {
    /**
     * @param {TextStyle} style 
     */
    constructor({
        text = '', font = 'Arial', size = 20, color = "white", 
        align = "center", position = { x: 0, y: 0 }, shadow={}
    }) {
        this.style = {
            text, font, size, color, 
            align, position, shadow
        };
    }

    /**
     * @param {CanvasRenderingContext2D} ctx 
     */
    render(ctx) {
        const {
            text, font, size, color, 
            align, position, shadow
        } = this.style;

        if(Object.keys(shadow).length !== 0){
            const { offset={x: 0, y: 0}, blur=0, color='black' } = shadow;

            ctx.shadowOffsetX = offset.x;
            ctx.shadowOffsetY = offset.y;
            ctx.shadowBlur = blur;
            ctx.shadowColor = color;
        }

        ctx.font = `${size}px ${font}`;
        ctx.fillStyle = color;
        ctx.textAlign = align;
        ctx.fillText(text, position.x, position.y);
    }
}
