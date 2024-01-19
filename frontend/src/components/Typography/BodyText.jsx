import React from "react";
import styled from "styled-components";

const StyledBodyText = styled.p`
  font-size: 16px;
  color: var(--lighttext);

  &.bodytext-hero {
    width: 80%;
  }

  &.bodytext-reviewer {
    color: var(--darktext);
    text-align: center;
  }

  &.bodytext-testimonials {
    color: var(--darktext);
    font-size: 14px;
    font-style: italic;
    font-weight: 400;
    line-height: normal;
    text-align: center;
  }

  &.bodytext-login {
    display: flex;
    flex-direction: column;
    text-align: center;
    margin: 20px;
    max-width: 600px;
  }

  &.bodytext-register {
    text-align: center;
    margin: 20px;
    max-width: 600px;
  }

  &.bodytext-feedtaskcard {
    color: var(--darktext);
  }

  &.bodytext-about {
    text-align: left;
  }
`;

// Define a functional component 'BodyText' that takes 'className', 'lines' and 'text' as a prop.
export const BodyText = ({ className, lines, text }) => {
  // Render the styled p element with the provided text and a className of "bodytext".
  return (
    <StyledBodyText className={`${className}`}>
      {lines
        ? lines.map((line, index) => (
            <React.Fragment key={index}>
              {line}
              {index < lines.length - 1 && <br />}{" "}
              {/* Add <br /> except for the last line */}
            </React.Fragment>
          ))
        : text}
    </StyledBodyText>
  );
};
