import { FaLinkedin, FaGithub, FaSlack } from "react-icons/fa";
import styled from "styled-components";

const SocialButtonWrapper = styled.div`
  display: flex;
  gap: 24px;
`;

const SocialButton = styled.a`
  font-size: 32px;
  display: flex;
  align-items: center;
  /* color: #d0d0d0; */
  color: #fff;
  transition: color 0.3s ease; /* Transition for smooth color change */

  &:hover {
    /* color: #000000; */
    color: #d0d0d0;
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

export const SocialMediaLinks = ({ person, style }) => {
  const linksToDisplay = person === "Anna" ? annaLinks : susanneLinks;

  return (
    <SocialButtonWrapper>
      {linksToDisplay.map((link, index) => (
        <SocialButton
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Link to ${link.label}`}
          className={"social-link-${link.label.toLowerCase()}"}
          style={style}
        >
          {link.icon}
          <SrOnly>{link.label}</SrOnly>
        </SocialButton>
      ))}
    </SocialButtonWrapper>
  );
};
