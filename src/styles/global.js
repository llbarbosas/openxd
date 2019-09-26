import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,700,900&display=swap');

    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
        list-style: none;
    }

    html, body, #root {
        height: 100%;
        overflow: hidden;
    }

    body {
        font-family: 'Roboto', sans-serif;
    }
`;