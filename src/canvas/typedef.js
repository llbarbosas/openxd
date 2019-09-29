/**
 * Definição de alguns tipos recorrentes nas classes
 * utilizando JSDoc
 * 
 * @typedef {{x: number, y: number, controlPoint?: { x: number, y: number } }} Point
 * 
 * @typedef {{x: number, y: number }} Position
 *
 * @typedef {{
 *      offset: Position, blur: number, color: string
 * }} Shadow 
 * 
 * @typedef {{
 *      text: string, font: string, size: number, color: string,
 *      align?: string, position: Position, shadow?: Shadow
 * }} TextStyle 
 *
 * @typedef {{
 *      radius: number, position: Position, strokeColor: string, 
 *      fillColor: string, strokeWidth: number, shadow?: Shadow
 * }} CircleStyle
 * 
 * @typedef {{
 *      points: Point[],
 *      fillColor?: string, strokeColor?: string, strokeWidth?: number,
 *      opacity?: number, shadow?: Shadow, dashedStroke?: boolean
 * }} PathStyle
 */