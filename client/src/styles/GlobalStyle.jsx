import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: sans-serif;
       // hide scrollbar
        overflow: -moz-scrollbars-none;
        -ms-overflow-style: none;
        scrollbar-width: none;
        &::-webkit-scrollbar {
            display: none;
        }

    }
    :root{
        --hover-color: #73c9bf;
        --border-color: #868181;
        --text-color-black: #0d0c22;
        --text-color-white: #f5f5f5;
        --button-background-color: #0d0c22;
        --button-background-hover-color: #565564;

    }
`;
export default GlobalStyle;
