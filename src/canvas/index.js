import './typedef';

import Circle from './Circle';
import Text from './Text';
import Path from './Path';
export { Circle, Text, Path };

/**
 * Facilitador que cria os pontos de um retângulo
 * 
 * @param {number} x 
 * @param {number} y 
 * @param {number} width 
 * @param {number} height 
 * @returns {Point[]}
 */
export function Rect(x, y, width, height = width) {
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
 * @param {MouseEvent} mouseEvent 
 * @returns {Position}
 */
export function getMousePosition(mouseEvent) {
    const canvas = mouseEvent.target;
    const { left: boardLeft, top: boardTop } = canvas.getBoundingClientRect();
    const mousePosition = {
        x: mouseEvent.clientX - boardLeft,
        y: mouseEvent.clientY - boardTop
    };

    return mousePosition;
}

/**
 * https://www.w3schools.com/tags/canvas_strokestyle.asp
 * 
 * @param {{
 *      ctx: CanvasRenderingContext2D, initialPosition: Position,
 *      endPosition: Position, colorStops: { offset: number, color: string }[]
 * }} 
 */
export function Gradient({
    ctx, initialPosition={x: 0, y: 0, r: undefined},
    endPosition={x: 0, y: 0, r: undefined},
    colorStops=[]
}){
    const { x: x1, y: y1, r: r1 } = initialPosition;
    const { x: x2=x1, y: y2=y1, r: r2 } = endPosition;
    let gradient;

    if(r1 !== undefined && r2 !== undefined)
        gradient = ctx.createRadialGradient(x1, y1, r1, x2, y2, r2);
    else
        gradient = ctx.createLinearGradient(x1, y1, x2, y2);

    colorStops.forEach(
        colorStop => gradient.addColorStop(colorStop.offset, colorStop.color)
    ); 
    
    return gradient;
}