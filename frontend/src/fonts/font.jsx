import { createGlobalStyle } from "styled-components";

import MercusuarBoldItalic from "./MercusuarBoldItalic-L346E.otf";
import MercusuarBoldItalicttf from "./MercusuarBoldItalic-X3l6Z.ttf";

export default createGlobalStyle`
    @font-face {
        font-family: 'Mercusuar';
        src: local('Mercusuar'), local('FontName'),
        url(${MercusuarBoldItalic}) format('opentype'),
        url(${MercusuarBoldItalicttf}) format('truetype');
        font-weight: 300;
        font-style: normal;
    }
`;
