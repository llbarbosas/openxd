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