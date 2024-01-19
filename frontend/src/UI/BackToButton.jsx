import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
// import styles from "./BackToButton.module.css"

const StyledBackButton = styled.button`
  padding: 10px; 
  border: none;
  border-radius: 50%;
  background-color: #DBC6B6; 
  color: #1D1C25; 
  transition: background-color 0.1s, color 0.1s;
  font-family: 'Tenor Sans', sans-serif;
  cursor: pointer;

  &:hover {
    color: #5a493b;
  }

  img {
      width: 20px; 
  }

  // Responsive tablet
  @media (min-width: 768px) {
    padding: 15px 15px; 
    img {
      width: 30px;
    }
  }

  // Responsive desktop
  @media (min-width: 1285px) {
    padding: 20px 20px;
    img {
      width: 40px; 
    }
  }
`;


export const BackButton = () => {
    const navigate = useNavigate();

    const goBack = () => {
        // Save the current scroll position
        sessionStorage.setItem('lastScrollPosition', window.scrollY);

        // Navigate back
        navigate(-1);
    };

    return (
        <StyledBackButton onClick={goBack}>
            <img src="/images/arrow-back.png" alt="Arrow go back" />
        </StyledBackButton>
    );
};
