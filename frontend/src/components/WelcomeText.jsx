import styled from "styled-components";

export const WelcomeText = () => {
  // Define text content for the heading and subheading.
  const text = {
    heading: "Välkommen till PluggIn",
    intro: "Sidan där du kan förbättra dina kunskaper i olika skolämnen.",
  };
  return (
    <WelcomeContainer>
      <Heading>{text.heading}</Heading>
      <Text>{text.intro}</Text>
    </WelcomeContainer>
  );
};

const WelcomeContainer = styled.div`
  background: rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  max-width: fit-content;
  height: fit-content;
  margin: 0 auto;
`;

const Heading = styled.h1`
  margin: 0;
`;

const Text = styled.p`
  margin: 0;
`;
