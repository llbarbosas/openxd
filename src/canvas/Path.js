import './typedef';

export default class Path {
    /**
     * @param {PathStyle} style 
     */
    constructor({
        points = [], fillColor = '', strokeColor = '', strokeWidth = 0,
        opacity = 1, shadow = {}, dashedStroke = false
    }) {
        /*
         * O construtor da classe Path foi definido dessa forma (recebendo um
         * objeto) para quetodos os parâmetros fossem nomeados (new Path({ 
         * points: ..., fillColor: ... })) e para que todos os parâmetros 
         * possam ter valores default sem muita complicação (se o parâmetro
         * strokeColor não for definido, ele assumirá o valor '', por exemplo).
         * 
         * Se definida de forma convencional (new Path([], '', '', ...)) a 
         * instanciação seria muito mais complicada, já que os parâmetros 
         * deveriam seguir uma ordem específica e parâmetros com valores default
         * deveriam ser recebidos por ultimo na chamada.
         */
        this.style = {
            points, fillColor, strokeColor, strokeWidth,
            opacity, shadow, dashedStroke
        };
    }

    /**
     * @param {CanvasRenderingContext2D} ctx 
     */
    render(ctx) {
        /*
         * A renderização de algo no canvas acontece sempre em 3 etapas,
         * estilização (preparação), desenho e pintura. Nesta classe
         * cada uma das etapas está dividida em um método.
         * 
         * A estilização prepara o canvas com os estilos do elemento que
         * será renderizado. Serão definidas cor de preenchimento, cor e 
         * tamanho da borda, etc (ps.: Esses valores serão apenas definidos.
         * A pintura acontece apenas na ultima etapa).
         * 
         * O etapa de desenho é como desenhar com um lápis. Você define as
         * formas e contornos do desenho para depois pintá-lo e ter um desenho
         * completo. Nesta classe essa etapa é a mais complicada, porque ela
         * é genérica para qualquer polígono. O desenho de apenas um retângulo
         * seria assim:
         * 
         * ctx.rect(x, y, width, height);
         * 
         * ou, combinando as etapas de desenho e pintura:
         * 
         * ctx.fillRect(x, y, width, height); // para um retângulo preenchido
         * ctx.strokeRect(x, y, width, height); // para um retângulo com apenas bordas
         * 
         * A pintura é a parte mais simples. É onde acontece o preenchimento e/ou
         * contorno do desenho feito na etapa anterior com o estilo definido na
         * primeira etapa. Se o elemento terá alguma cor de preenchimento, chamamos
         * ctx.fill() e se terá bordas, chamamos ctx.stroke().
         * 
         * Os métodos ctx.save() e ctx.restore() servem para salvar e restaurar o
         * estilo anterior do canvas, impedindo que os proximos elementos que serão
         * renderizados tenham, por acidente, o mesmo estilo do ultimo elemento
         * renderizado.
         */
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
            opacity, shadow, dashedStroke
        } = this.style;
        const hasShadow = (Object.keys(shadow).length !== 0);

        if(hasShadow) {
            const { offset = { x: 0, y: 0 }, blur = 0, color = 'black' } = shadow;

            ctx.shadowOffsetX = offset.x;
            ctx.shadowOffsetY = offset.y;
            ctx.shadowBlur = blur;
            ctx.shadowColor = color;
        }

        if (dashedStroke)
            ctx.setLineDash([5, 6]);

        ctx.fillStyle = fillColor;
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = strokeWidth;
        ctx.globalAlpha = opacity;

        /*
         * O retorno do this serve para encadeamento de chamadas.
         *    this.stylize(ctx);
         *    this.drawPoints(ctx);
         *    this.paint(ctx);
         * se torna: 
         *    this.stylize(ctx).drawPoints(ctx).paint(ctx);
         */
        return this;
    }

    /**
     * @param {CanvasRenderingContext2D} ctx 
     */
    drawPoints(ctx) {
        const { points } = this.style;
        const drawLineTo = (point, controlPoint) => {
            if (controlPoint) // https://www.w3schools.com/Tags/canvas_quadraticcurveto.asp  
                ctx.quadraticCurveTo(controlPoint.x, controlPoint.y, point.x, point.y);
            else
                ctx.lineTo(point.x, point.y);
        }

        if (points.length < 3) // Um polígono tem no mínimo 3 pontos (triângulo)
            return this;

        ctx.beginPath(); // Indicando para o canvas que vamos iniciar um desenho
        ctx.moveTo( // Posicionando o "lápis" no primeiro ponto do polígono
            points[0].x,
            points[0].y
        );

        points.slice(1).forEach((point, index) => {
            const { controlPoint } = points[index]; // points[index-1]
            drawLineTo(point, controlPoint); // Movimentando o lápis até o próximo ponto
        })

        const { controlPoint } = points[points.length - 1];
        drawLineTo(points[0], controlPoint); // Voltando novamente ao primeiro ponto

        return this;
    }

    /**
     * @param {CanvasRenderingContext2D} ctx 
     */
    paint(ctx) {
        const { fillColor, strokeColor } = this.style;

        if (fillColor !== '')
            ctx.fill();
        if (strokeColor !== ''){
            ctx.stroke();
            console.log("Stroking", strokeColor);
        }
            

        return this;
    }
}