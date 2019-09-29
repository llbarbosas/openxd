import './typedef';

export default class Path {
    /**
     * @param {PathStyle} style 
     */
    constructor({
        points = [], fillColor = '', strokeColor = '', strokeWidth = 0,
        opacity = 1, shadow = {}, dashedStroke = false
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
            fillColor, strokeColor, strokeWidth,
            opacity, shadow
        } = this.style;

        if (Object.keys(shadow).length !== 0) {
            const { offset = { x: 0, y: 0 }, blur = 0, color = 'black' } = shadow;

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

        if (dashedStroke)
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