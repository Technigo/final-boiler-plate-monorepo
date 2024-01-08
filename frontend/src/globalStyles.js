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
  /* background: floralwhite; */
  /*background: #f2f3f4;*/
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
  color: floralwhite;
  font-weight: 400;
  background: #633d57;
  
  /* background-image: url("/annarobertsson_23318_make_a_background_for_webdesign_with_soft__c2014488-b44a-4bd8-ab6b-5e7ced6659eb.png");
  background-size: cover;
  background-repeat: no-repeat; */
}

  /* Apply styles to the body when the modal is active */
body.active-modal {
  overflow-y: hidden;
}

:root {
/* Colors */
  --primaryColor: #9b6489;
  --secondaryColor: #64899b;
}
  
  main {
  /* height: 100%; */
  /* margin: 50px 15px 235px; */
  margin: 50px 15px;
  /* display: flex;
  align-items: center;
  justify-content: center; */

  /* border: 1px solid #eeb885;
  border-radius: 20px 0 20px 20px;
  padding: 20px;
  background: #fff; */
  

  @media (min-width: 400px) {
    /* margin: 50px 50px 192px; */
    margin: 50px;
  }

  @media (min-width: 800px) {
    /* margin: 50px 100px 158px; */
    margin: 50px 100px;
  }

  @media (min-width: 1100px) {
    /* margin: 100px 200px 208px; */
    margin: 100px 200px;
  }

  @media (min-width: 1300px) {
    /* margin: 100px 300px 208px; */
    margin: 100px 300px;
  }
}
`;

/* * {
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
  /* background: floralwhite; */
/*background: #f2f3f4;*/
/*font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
  color: #213547;
  font-weight: 400;
  }

  /* Apply styles to the body when the modal is active */
/*body.active-modal {
  overflow-y: hidden;
}

:root {
/* Colors */
/*--primaryColor: #9b6489;
  --secondaryColor: #64899b;
}
  
  main {
  /* height: 100%; */
/* margin: 50px 15px 235px; */
// margin: 50px 15px;
/* display: flex;
  align-items: center;
  justify-content: center; */

/* border: 1px solid #eeb885;
  border-radius: 20px 0 20px 20px;
  padding: 20px;
  background: #fff; */

/*@media (min-width: 400px) {
    /* margin: 50px 50px 192px; */
/*margin: 50px;
  }

  @media (min-width: 800px) {
    /* margin: 50px 100px 158px; */
/*margin: 50px 100px;
  }

  @media (min-width: 1100px) {
    /* margin: 100px 200px 208px; */
/*margin: 100px 200px;
  }

  @media (min-width: 1300px) {
    /* margin: 100px 300px 208px; */
/*margin: 100px 300px;
  }
}
`; */
