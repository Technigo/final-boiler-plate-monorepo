import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  
* {
  margin: 0;
  padding: 0;
  border: 0;
  box-sizing: border-box;
}

a {
  text-decoration: none;
}

li {
  list-style: none;
}

img,
svg {
  display: block;
  max-width: 100%;
}
  
body {
  height: 100%;
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
  color: var(--lighttext);
  font-weight: 400;
  background: var(--purple);
}

  /* Apply styles to the body when the modal is active */
body.active-modal {
  overflow-y: hidden;
}

:root {
/* Colors */
  --purple: #633d57;
  --lighttext: #fffaf0;
  --darktext: #213547;
  --grey: #f8f8f8;
  --darkgrey: #555;
  --button: #64899b;
  --buttonhover: #7b9eaf;
  --buttonactive: #5a7b8c; // color of button when pressed
  --error: #e70505;
}
  
  main {
  margin: 50px 15px 270px;
  

  @media screen and (min-width: 400px) {
    margin: 50px 50px 192px;
    /* margin: 50px; */
  }

  @media screen and  (min-width: 800px) {
    margin: 50px 100px 158px;
    /* margin: 50px 100px; */
  }

  @media screen and  (min-width: 1100px) {
    margin: 100px 200px 208px;
    /* margin: 100px 200px; */
  }

  @media screen and  (min-width: 1300px) {
    margin: 100px 300px 208px;
    /* margin: 100px 300px; */
  }
}
`;
