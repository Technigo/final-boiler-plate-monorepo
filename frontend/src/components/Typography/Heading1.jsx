import React from "react";
import styled from "styled-components";

const StyledHeading1 = styled.h1`
  font-size: 40px;
  font-weight: 700;
  color: var(--lighttext);

  &.heading1-hero {
    color: var(--darktext);
    text-align: center;
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 1.4px;
    text-transform: uppercase;

    @media screen and (min-width: 880px) {
      font-size: 24px;
    }

    @media screen and (min-width: 980px) {
      font-size: 28px;
    }
  }

  &.heading1-register {
    text-align: center;
  }

  &.heading1-tasks {
    margin: 0;
  }

  /* &.heading1-about {
    text-align: center;
  } */

  &.heading1-notfound {
    margin-bottom: 20px;
  }
`;

// Define a functional component 'Heading1' that takes 'className' and 'text' as props.
export const Heading1 = ({ className, lines, text }) => {
  // Render the styled h1 element with the provided text, lines and className.
  return (
    <StyledHeading1 className={`${className}`}>
      {lines
        ? lines.map((line, index) => (
            <React.Fragment key={index}>
              {line}
              {index < lines.length - 1 && <br />}{" "}
              {/* Add <br /> except for the last line */}
            </React.Fragment>
          ))
        : text}
    </StyledHeading1>
  );
};
