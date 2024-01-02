import { createGlobalStyle } from "styled-components";

import MercusuarBoldItalic from "./MercusuarBoldItalic-L346E.otf";
import MercusuarBoldItalicttf from "./MercusuarBoldItalic-X3l6Z.ttf";
import JosefinItalic from "./Josefin_Sans/JosefinSans-Italic-VariableFont_wght.ttf";
import JosefinFont from "./Josefin_Sans/JosefinSans-VariableFont_wght.ttf";

export default createGlobalStyle`
    @font-face {
        font-family: 'Mercusuar';
        src: local('Mercusuar'), local('Mercusuar'),
        url(${MercusuarBoldItalic}) format('opentype'),
        url(${MercusuarBoldItalicttf}) format('truetype');
        font-weight: 300;
        font-style: normal;
    }

    @font-face {
        font-family: 'JosefinSans';
        src: local('JosefinSans'), local('JosefinSans'),
        url(${JosefinFont}) format('truetype');
        font-weight: normal;
        font-style: normal;
    }

    @font-face {
        font-family: 'JosefinSans';
        src: local('JosefinSans'), local('JosefinSans'),
        url(${JosefinItalic}) format('truetype');
        font-weight: normal;
        font-style: italic;
    }
`;
