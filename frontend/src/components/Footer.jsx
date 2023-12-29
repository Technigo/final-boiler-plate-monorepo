import { SocialMediaLinks } from "./SocialMediaLinks";
import styled from "styled-components";

/* Styling for the footer */
const StyledFooter = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 20px 0;
  text-align: center;
  position: relative;
  bottom: 0;
  width: 100%;

  /* background: -webkit-linear-gradient(
    45deg,
    #42121d,
    #7b3848,
    #965862,
    #7b3848,
    #42121d
  ); */

  background: -webkit-linear-gradient(
    45deg,
    #633d57,
    #9b6489,
    #ad719a,
    #9b6489,
    #633d57
  );

  a {
    font-size: 20px;
  }
`;

const FooterText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* color: #f8f8f8; */
  color: #fff;
  font-size: 16px;

  @media screen and (min-width: 768px) {
    .contact-wrapper {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      gap: 50px;
    }
  }
`;

const Contact = styled.div`
  display: flex;
  gap: 10px;
  margin: 10px 0;
`;

// const Copyright = styled.div`
//   display: flex;
//   flex-direction: column;
//   text-align: center;
//   gap: 4px;

//   p {
//     display: flex;
//   }

//   img.logo-small {
//     min-width: 40px;
//     max-width: 45px;
//     padding-left: 7px;
//   }

/* .separator {
    display: none; /* Initially hide the separator on small screens */

// @media (min-width: 667px) {
//   flex-direction: row;
//   gap: 0;

/*.separator {
      display: inline; /* Display the separator as inline on screens wider than 667px */
/*margin: 0 5px; /* Add space on both sides of the separator */
/*}*/
//   }
// `;

// Define the Footer component as a functional component.
export const Footer = () => {
  return (
    <StyledFooter>
      <FooterText>
        <div className="contact-wrapper">
          <div className="anna-wrapper">
            <Contact>
              <p>Anna Robertsson</p>
              <SocialMediaLinks person="Anna" />
            </Contact>
          </div>
          <div className="susanne-wrapper">
            <Contact>
              <p>Susanne Ekenheim</p>
              <SocialMediaLinks person="Susanne" />
            </Contact>
          </div>
        </div>
        {/* <Copyright> */}
        <p>Web Development students at Technigo | January 2024</p>
        {/* <p className="separator"> | </p> */}
        {/* <a
            href="https://www.technigo.io"
            target="_blank"
            title="Technigo"
            rel="noreferrer" 
          >*/}
        {/* <img className="logo-small" src={logo} alt="Technigo logo" /> */}
        {/* </a> */}
        {/* </Copyright> */}
      </FooterText>
    </StyledFooter>
  );
};
