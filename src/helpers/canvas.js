/**
 * Definição de alguns tipos recorrentes nas classes
 * utilizando JSDoc
 * 
 * @typedef {{x: number, y: number, controlPoint?: { x: number, y: number } }} Point
 * @typedef {{x: number, y: number }} Position
 * @typedef {{
 *      points: Point[],
 *      fillColor?: string, strokeColor?: string, strokeWidth?: number,
 *      opacity?: number, shadow?: Shadow, dashedStroke?: boolean
 * }} PathStyle
 * @typedef {{
 *      radius: number, position: Position, strokeColor: string, 
 *      fillColor: string, strokeWidth: number, shadow?: Shadow
 * }} CircleStyle
 * @typedef {{
 *      text: string, font: string, size: number, color: string,
 *      align?: string, position: Position, shadow?: Shadow
 * }} TextStyle 
 * @typedef {{
 *      offset: Position, blur: number, color: string
 * }} Shadow 
 */

/**
 * Facilitador que cria os pontos de um retângulo
 * 
 * @param {number} x 
 * @param {number} y 
 * @param {number} width 
 * @param {number} height 
 * @returns {Point[]}
 */
export function Rect(x, y, width, height) {
    return [
        { x, y },
        { x: x + width, y },
        { x: x + width, y: y + height },
        { x, y: y + height }
    ];
}

/**
 * Cria uma array de Paths que compartilham um mesmo estilo
 * 
 * @param {PathStyle} globalStyle 
 * @param {PathStyle[]} pathStyles
 * @returns {Path[]}
 */
export function PathGroup(globalStyle, pathStyles) {
    return pathStyles.map(style => new Path({ ...globalStyle, ...style }));
}

/**
 * Função facilitadora que renderiza um array de Paths
 * num contexto de renderização
 * 
 * @param {CanvasRenderingContext2D} ctx 
 * @param {Path[]} paths 
 */
export function RenderAll(ctx, paths) {
    paths.forEach(path => path.render(ctx));
}

/**
 * Classe responsável pela criação de circulos (é impossível
 * fazer circulos perfeitos com um Path, já que ele usa
 * curvas quadraticas).
 */
export class Circle {
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
     * @param {Position} position 
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

    renderTransformBox(ctx){
        const { radius, position } = this.style;

        const transformBox = new Path({ 
            points: [
                { x: position.x-radius, y: position.y-radius },
                { x: position.x+radius, y: position.y-radius },
                { x: position.x+radius, y: position.y+radius },
                { x: position.x-radius, y: position.y+radius },
            ], strokeWidth: 1, strokeColor: 'cyan', dashedStroke: true
        });

        transformBox.render(ctx);
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

export class Text {
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

export class Path {
    /**
     * @param {PathStyle} style 
     */
    constructor({
        points=[], fillColor='', strokeColor='', strokeWidth=0,
        opacity=1, shadow={}, dashedStroke=false
    }) {
        this.style = {
            points, fillColor, strokeColor, strokeWidth,
            opacity, shadow, dashedStroke
        };
    }

    /**
     * @param {CanvasRenderingContext2D} ctx 
     */
    render(ctx) {
        ctx.save();

        this.stylize(ctx)
            .drawPoints(ctx)
            .paint(ctx);

        ctx.restore();
    }

    /**
     * @param {CanvasRenderingContext2D} ctx 
     */
    stylize(ctx) {
        const {
            fillColor , strokeColor, strokeWidth,
            opacity, shadow
        } = this.style;

        if(Object.keys(shadow).length !== 0){
            const { offset={x: 0, y: 0}, blur=0, color='black' } = shadow;

            ctx.shadowOffsetX = offset.x;
            ctx.shadowOffsetY = offset.y;
            ctx.shadowBlur = blur;
            ctx.shadowColor = color;
        }

        ctx.fillStyle = fillColor;
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = strokeWidth;
        ctx.globalAlpha = opacity;

        return this;
    }

    /**
     * @param {CanvasRenderingContext2D} ctx 
     */
    drawPoints(ctx) {
        const { points, dashedStroke } = this.style;
        const drawLineTo = (point, controlPoint) => {
            if (controlPoint)
                ctx.quadraticCurveTo(controlPoint.x, controlPoint.y, point.x, point.y);
            else
                ctx.lineTo(point.x, point.y);
        }

        if (points.length < 3)
            return this;

        if(dashedStroke)
            ctx.setLineDash([5, 6]);

        ctx.beginPath();
        ctx.moveTo(
            points[0].x,
            points[0].y
        );

        points.slice(1).forEach((point, index) => {
            const { controlPoint } = points[index]; // points[index-1]
            drawLineTo(point, controlPoint);
        })

        // Close path
        const { controlPoint } = points[points.length - 1];
        drawLineTo(points[0], controlPoint);

        return this;
    }

    /**
     * @param {CanvasRenderingContext2D} ctx 
     */
    paint(ctx) {
        const { fillColor, strokeColor } = this.style;

        if (fillColor !== '')
            ctx.fill();
        if (strokeColor !== '')
            ctx.stroke();

        return this;
    }
}