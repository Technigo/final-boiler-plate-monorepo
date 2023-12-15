import { SocialMediaLinks } from "../components/SocialMediaLinks";
import styled from "styled-components";

const AboutLinks = styled.div`
  display: flex;
  gap: 32px;
  margin-top: 64px;
`;

export const About = () => {
  return (
    <>
      <h2>Vision</h2>
      <p>
        Welcome to our community of compassion and generosity. We believe in the
        power of uniting hearts and strive to create a world where every act of
        kindness matters. Our platform is a vibrant hub where those in need of
        help encounter those who are ready to offer their time and care without
        expecting anything in return. Here, it&apos;s about uplifting each
        other, where a simple gesture can make a tremendous difference. Perhaps
        there&apos;s an elderly neighbor who needs help raking leaves, someone
        requiring assistance with grocery shopping, or an individual unable to
        walk their four-legged friend. Our platform serves as a bridge
        connecting needs with helpful souls. We believe in fostering an
        inclusive community where goodwill and kindness are the currency. Here,
        commitment and generosity matter most. With us, every effort is a step
        towards a warmer, more empathetic world. Together, we&apos;re building a
        place where hearts meet to make a difference. Welcome to being a part of
        this beautiful movement of humanity.
      </p>
      <AboutLinks>
        <h2>Founders</h2>
        <SocialMediaLinks person="Anna" />
        <SocialMediaLinks person="Susanne" />
      </AboutLinks>
    </>
  );
};
