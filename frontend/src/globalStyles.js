import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

/* CSS Reset */
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

/* End of CSS Reset */
  
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
/* Hide the back-to-top button if on top of the page */
.goTopHidden {
  display: none;
}

:root {
/* Colors */
  --purple: #633d57;
  --lighttext: #fffaf0;
  --darktext: #213547;
  --grey: #f8f8f8;
  --darkgrey: #555;
  --button: #367b9e;
  --buttonhover: #4f85a1;
  --buttonactive: #5a7b8c; // Color of button when pressed
  --error: #e5e500;
}
  
  main {
  margin: 50px 15px 215px;
  
  @media screen and (min-width: 400px) {
    margin: 70px 50px 200px;
  }

  @media screen and  (min-width: 800px) {
    margin: 50px 100px 220px;
  }

  @media screen and  (min-width: 1100px) {
    margin: 100px 200px 200px;
  }

  @media screen and  (min-width: 1300px) {
    margin: 100px 300px 240px;
  }
}
`;
