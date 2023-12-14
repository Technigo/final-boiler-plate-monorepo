import { FaLinkedin, FaGithub, FaSlack } from "react-icons/fa";
import styled from "styled-components";

// const AboutLinks = styled.div`
//   display: flex;
//   gap: 32px;
//   margin-top: 64px;
// `;

// const FooterLinks = styled.div`
//   display: flex;
//   justify-content: center;
//   gap: 32px;
//   margin-bottom: 32px;
// `;

const SocialButtonWrapper = styled.div`
  display: flex;
  gap: 32px;
`;

const SocialButton = styled.a`
  font-size: 32px;
  display: flex;
  align-items: center;
  color: #d0d0d0;
  transition: color 0.3s ease; /* Transition for smooth color change */

  &:hover {
    color: #000000;
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

export const SocialMediaLinks = () => {
  {
    /* Anna's contact Links */
  }
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

  {
    /* Susanne's contact Links */
  }
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
  return (
    <>
      <SocialButtonWrapper>
        {annaLinks.map((link, index) => (
          <SocialButton
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Link to ${link.label}`}
            className={"social-link-${link.label.toLowerCase()}"}
          >
            {link.icon}
            <SrOnly>{link.label}</SrOnly>
          </SocialButton>
        ))}
      </SocialButtonWrapper>

      <SocialButtonWrapper>
        {susanneLinks.map((link, index) => (
          <SocialButton
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Link to ${link.label}`}
            className={`social-link-${link.label.toLowerCase()}`}
          >
            {link.icon}
            <SrOnly>{link.label}</SrOnly>
          </SocialButton>
        ))}
      </SocialButtonWrapper>
    </>
  );
};

//   <SocialButton
//     href={annaLinks.github}
//     target="_blank"
//     rel="noopener noreferrer"
//     aria-label={`GitHub Profile Anna`}
//     className={"github-anna"}
//   >
//     <FaGithub aria-hidden="true" />
//     <SrOnly>GitHub Anna</SrOnly>
//   </SocialButton>
//   <SocialButton
//     href={annaLinks.slack}
//     target="_blank"
//     rel="noopener noreferrer"
//     aria-label={`Slack Profile Anna`}
//     className={"slack-anna"}
//   >
//     <FaSlack aria-hidden="true" />
//     <SrOnly>Slack Anna</SrOnly>
//   </SocialButton>

//   {/* Susanne's contact Links */}
//   <SocialButton
//     href={susanneLinks.linkedin}
//     target="_blank"
//     rel="noopener noreferrer"
//     aria-label={`LinkedIn Profile Susanne`}
//     className={"linkedin-susanne"}
//   >
//     <FaLinkedin aria-hidden="true" />
//     <SrOnly>LinkedIn Susanne</SrOnly>
//   </SocialButton>
//   <SocialButton
//     href={susanneLinks.github}
//     target="_blank"
//     rel="noopener noreferrer"
//     aria-label={`GitHub Profile Susanne`}
//     className={"github-susanne"}
//   >
//     <FaGithub aria-hidden="true" />
//     <SrOnly>GitHub Susanne</SrOnly>
//   </SocialButton>
//   <SocialButton
//     href={susanneLinks.slack}
//     target="_blank"
//     rel="noopener noreferrer"
//     aria-label={`Slack Profile Susanne`}
//     className={"slack-anna"}
//   >
//     <FaSlack aria-hidden="true" />
//     <SrOnly>Slack Susanne</SrOnly>
//   </SocialButton>

{
  /* <SocialButton
        href={`https://technigo.slack.com/team/U055LN8GBQA`}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        aria-label={`Technigo Slack Team`}
      >
        <FaSlack aria-hidden="true" />
        <SrOnly>Slack</SrOnly>
      </SocialButton> */
}
