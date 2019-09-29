import './typedef';

import { renderTransformBox } from './'; 

/**
 * Classe responsável pela criação de circulos (é impossível
 * fazer circulos perfeitos com um Path, já que ele usa
 * curvas quadraticas).
 */
export default class Circle {
    /**
     * @param {CircleStyle} style 
     */
    constructor({
        radius=3, position={x:0, y:0}, strokeColor='', 
        fillColor='', strokeWidth=0, shadow={}
    }) {
        this.style = { 
            radius, position, strokeColor, 
            fillColor, strokeWidth, shadow
        };
    }

    /**
     * @param {Position} elementPosition 
     */
    isOn(elementPosition){
        const { radius, position } = this.style;

        const isOn = (
            elementPosition.x <= position.x+radius
            && elementPosition.x >= position.x-radius
            && elementPosition.y <= position.y+radius
            && elementPosition.y >= position.y-radius
        );

        return isOn;
    }

    moveTo({x, y}){
        const { x: oldX, y: oldY } = this.style.position;

        this.style.position = {
            x: oldX + x,
            y: oldY + y
        };
    }

    /**
     * @param {CanvasRenderingContext2D} ctx 
     */
    render(ctx) {
        const { 
            radius, position, strokeColor, 
            fillColor
        } = this.style;

        ctx.save();

        this.stylize(ctx);

        ctx.beginPath();
        ctx.arc(position.x, position.y, radius, 0, 2 * Math.PI);

        if (strokeColor !== '')
            ctx.stroke();
        if (fillColor !== '')
            ctx.fill();

        if(this.showTransformBox)
            this.renderTransformBox(ctx);

        ctx.restore();
    }

    /**
     * @param {CanvasRenderingContext2D} ctx 
     */
    renderTransformBox = (ctx) => renderTransformBox(ctx, this.getPointEnds());

    getPointEnds(){
        const { position, radius } = this.style;
        const max = { x: position.x+radius, y: position.y+radius };
        const min = { x: position.x-radius, y: position.y-radius };

        return { max, min };
    }

    /**
     * @param {CanvasRenderingContext2D} ctx 
     */
    stylize(ctx){
        const { 
            strokeWidth, shadow, fillColor,
            strokeColor
        } = this.style;

        if(Object.keys(shadow).length !== 0){
            const { offset={x: 0, y: 0}, blur=0, color='black' } = shadow;

            ctx.shadowOffsetX = offset.x;
            ctx.shadowOffsetY = offset.y;
            ctx.shadowBlur = blur;
            ctx.shadowColor = color;
        }

        ctx.fillStyle = fillColor;
        ctx.lineWidth = strokeWidth;
        ctx.strokeStyle = strokeColor;

        return this;
    }
}