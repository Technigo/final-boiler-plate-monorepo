import { FaLinkedin, FaGithub, FaSlack } from "react-icons/fa";
import styled from "styled-components";

// Styled components for social media links
const SocialButtonWrapper = styled.div`
  display: flex;
  gap: 24px;
`;

const SocialButton = styled.a`
  font-size: 32px;
  display: flex;
  align-items: center;
  color: var(--lighttext);
  transition: color 0.3s ease; /* Transition for smooth color change */

  &:hover {
    color: var(--darkgrey);
  }
`;

const SrOnly = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;

// Links for Anna's and Susanne's social media profiles
const annaLinks = [
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/anna-robertsson-829967272/",
    icon: <FaLinkedin aria-hidden="true" />,
  },
  {
    label: "GitHub",
    url: "https://github.com/AnnaRobertsson",
    icon: <FaGithub aria-hidden="true" />,
  },
  {
    label: "Slack",
    url: "https://technigo.slack.com/team/U055LN8GBQA",
    icon: <FaSlack aria-hidden="true" />,
  },
];

const susanneLinks = [
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/susanne-e-6915a087/",
    icon: <FaLinkedin aria-hidden="true" />,
  },
  {
    label: "GitHub",
    url: "https://github.com/smExlex",
    icon: <FaGithub aria-hidden="true" />,
  },
  {
    label: "Slack",
    url: "https://technigo.slack.com/team/U04RPTCAB7B",
    icon: <FaSlack aria-hidden="true" />,
  },
];

// SocialMediaLinks component to display social media buttons
export const SocialMediaLinks = ({ person }) => {
  // Choose social media links based on the person (Anna or Susanne)
  const linksToDisplay = person === "Anna" ? annaLinks : susanneLinks;

  return (
    <SocialButtonWrapper>
      {/* Display each social media button */}
      {linksToDisplay.map((link, index) => (
        <SocialButton
          key={index}
          href={link.url}
          target="_blank" // Open link in new tab
          rel="noopener noreferrer" // Security measure to prevent malicious links
          aria-label={`Link to ${link.label}`} // Label for screen readers
          className={"social-link-${link.label.toLowerCase()}"}
        >
          {/* Display social media icon */}
          {link.icon}
          {/* Hide the label for screen readers */}
          <SrOnly>{link.label}</SrOnly>
        </SocialButton>
      ))}
    </SocialButtonWrapper>
  );
};
