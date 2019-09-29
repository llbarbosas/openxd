import React, { Component } from 'react';
import styled from 'styled-components';

import {
    Path, Circle, Text,
    PathGroup, Rect, RenderAll,
    getMousePosition, Gradient
} from './../canvas';

export default class Board extends Component {
    componentDidMount() {
        const canvas = this.refs.canvas;
        canvas.height = 400;
        canvas.width = 300;

        const ctx = canvas.getContext('2d');

        this.drawUi(ctx);
    }

    render() {
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
    drawUi(ctx) {
        const { canvas } = ctx;
        const { width, height } = canvas;

        /*
         * Criação do retângulo preto no topo do board. 
         * Todo poligono precisa ter no mínimo uma coleção de 
         * pontos e uma cor de preenchimento ou de borda.
         * 
         * Ps.: Quando o polígono for um retângulo ou quadrado, 
         * pode-se usar a função Rect. Neste caso, os pontos 
         * poderiam ser representados da seguinte maneira:
         * 
         * points: Rect(0, 0, width, 60);
         */
        const Header = new Path({
            points: [
                { x: 0, y: 0 },
                { x: width, y: 0 },
                { x: width, y: 60 },
                { x: 0, y: 60 },
            ], fillColor: "#212121"
        });

        /*
         * Aqui acontece a criação do polígono cinza no inferior
         * da tela. Apesar de ter bordas arredondadas, ele não é
         * um circulo. 
         * 
         * Para criar um canto arredondado num polígono basta 
         * adicionar a propriedade controlBox no ponto em questão,
         * passando as cordenadas do ponto referente ao arredondamento
         * do canto. Veja mais em https://www.w3schools.com/Tags/canvas_quadraticcurveto.asp 
         */
        const BottomSemiCircle = new Path({
            points: [
                { x: width / 2, y: height / 1.4, controlPoint: { x: width, y: height / 1.4 } },
                { x: width + 20, y: height },
                { x: -20, y: height, controlPoint: { x: 0, y: height / 1.4 } }
            ], fillColor: "#eaeaea"
        });

        /*
         * Novamente a criação de um retângulo, mas dessa vez
         * utilizando a função helper Rect e colorindo apenas a
         * borda, além de definir seu tamanho (o tamanho default
         * é 0)
         */
        const RedStrokeBar = new Path({
            points: Rect(30, 80, width - 60, 30),
            strokeColor: Gradient({ 
                ctx, 
                endPosition: { x: 170 }, 
                colorStops: [
                    { offset: 0, color: "magenta" },
                    { offset: 0.5, color: "blue" },
                    { offset: 1, color: "red" }
                ]
            }),
            strokeWidth: 3
        });

        /*
         * Aqui utilizamos a função helper PathGroup, que cria
         * um array de Paths com um mesmo estilo em comum, evitando
         * repetições desnecessárias. Neste caso, todos os retângulos
         * serão preenchidos com a cor branca
         */
        const MenuIcon = PathGroup(
            { fillColor: 'white' },
            [
                { points: Rect(20, 22, 18, 2) },
                { points: Rect(20, 27, 18, 2) },
                { points: Rect(20, 32, 18, 2) }
            ]
        );

        /*
         * Criação de textos, o raciocínio é o mesmo
         * (as propriedades de cada classe podem ser vistas
         * passando o mouse por cima das suas definições no
         * vscode <3)
         */
        const HeaderTitle = new Text({
            text: 'Header',
            position: { x: width / 3, y: 35 },
            font: 'Arial', size: 20,
            color: 'white'
        });

        /*
         * Aqui é legal destacar a sombra, que pode ser criada
         * através da propriedade shadow. Note que apenas o 
         * blur foi definido. As demais propriedades têm valores
         * default offset={x: 0, y: 0} e color='black'
         */
        const YellowCircle = new Circle({
            position: { x: width / 2, y: height / 2 },
            radius: 50, fillColor: 'yellow',
            shadow: { blur: 100 }
        });

        const Elements = [
            Header, BottomSemiCircle, RedStrokeBar,
            HeaderTitle, ...MenuIcon, YellowCircle
        ];

        /*
         * Aqui a renderização dos elementos foi inserida nesta
         * função para que ela possa ser chamada sempre que um 
         * evento alterar propriedades de algum dos elementos, 
         * atualizando a visualização deles em tela
         */
        const updateElements = () => {
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, canvas.width, canvas.height); // Pintando um fundo branco no canvas

            /* 
             * A função RenderAll evita a repetição da chamada do
             * método render() nos elementos. Sem ela, a renderização
             * dos elementos seria assim:
             * 
             * Header.render(ctx);
             * BottomSemiCircle.render(ctx);
             * RedStrokeBar.render(ctx);
             * ...
             */
            RenderAll(ctx, Elements);
        }

        updateElements();

        canvas.onmousemove = (ev) => {
            const mousePosition = getMousePosition(ev);

            Elements.forEach(element => {
                /*
                 * TODO: Implementar métodos isOn e renderTransformBox
                 * nas classes Path e Text (foram implementados apenas
                 * na classe Circle)  
                 */

                if (typeof element.isOn === 'function') {
                    element.showTransformBox = element.isOn(mousePosition);

                    updateElements();
                }
            });
        };
    }
}

const BoardName = styled.p`
    font-size: 14px;
    margin-bottom: 6px;
    color: #828282;
`;