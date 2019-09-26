import React, { Component } from 'react';
import styled from 'styled-components';

import { Path, PathGroup, Circle, Text, Rect, RenderAll } from './../helpers/canvas';

export default class Board extends Component {
    componentDidMount(){
        const canvas = this.refs.canvas;
        canvas.height = 400;
        canvas.width = 300;

        const ctx = canvas.getContext('2d');

        this.drawUi(ctx);
    }

    render(){
        return (
            <div>
                <BoardName>Untitled</BoardName>
                <canvas ref="canvas" />
            </div>
        );
    }

    /**
     * @param {CanvasRenderingContext2D} ctx 
     */
    drawUi(ctx){
        const { canvas } = ctx;
        const { width, height } = canvas;

        const Header = new Path({
            points: [
                { x: 0, y: 0 },
                { x: width, y: 0 },
                { x: width, y: 60 },
                { x: 0, y: 60 },
            ], fillColor: "#212121"
        });

        const BottomSemiCircle = new Path({
            points: [
                { x: width/2, y: height/1.4, controlPoint: { x: width, y: height/1.4 } },
                { x: width+20, y: height },
                { x: -20, y: height, controlPoint: { x: 0, y: height/1.4 } }
            ], fillColor: "#eaeaea"
        });

        const RedStrokeBar = new Path({
            points: Rect(30, 80, width-60, 30),
            strokeColor: "red", strokeWidth: 3
        });

        const MenuIcon = PathGroup(
            { fillColor: 'white'},
            [
                { points: Rect(20, 22, 18, 2) },
                { points: Rect(20, 27, 18, 2) },
                { points: Rect(20, 32, 18, 2) }
            ]
        );

        const HeaderTitle = new Text({
            text: 'Header',
            position: { x: width/3, y: 35 },
            font: 'Arial', size: 20,
            color: 'white'
        });

        const YellowCircle = new Circle({
            position: { x: width/2, y: height/2 },
            radius: 50, fillColor: 'yellow',
            shadow: { blur: 100 }
        });

        const Elements = [ 
            Header, BottomSemiCircle, RedStrokeBar, 
            HeaderTitle, ...MenuIcon, YellowCircle
        ];

       const updateElements = () => {
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, canvas.width, canvas.height); // Canvas background

            /* 
                Header.render(ctx);
                BottomSemiCircle.render(ctx);
                RedStrokeBar.render(ctx);
                ...
            */
            RenderAll(ctx, Elements);
       }

       updateElements();

       canvas.onmousemove = (ev) => {
           const { left: boardLeft, top: boardTop } = canvas.getBoundingClientRect();
           const mousePosition = { 
                x: ev.clientX-boardLeft,
                y: ev.clientY-boardTop
            };

            Elements.forEach(element => {
                /*
                 * TODO: Implementar métodos isOn e renderTransformBox
                 * nas classes Path e Text (implementados apenas classe 
                 * Circle)  
                 */

                if(typeof element.isOn === 'function'){
                    element.showTransformBox = element.isOn(mousePosition);

                    updateElements();
                }
                    
            })
       };
    }
}

const BoardName = styled.p`
    font-size: 14px;
    margin-bottom: 6px;
    color: #828282;
`;