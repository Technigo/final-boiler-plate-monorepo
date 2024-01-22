import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledBackButton = styled.button`
  padding: 8px; 
  border: none;
  border-radius: 50%;
  background-color: #AA8497; 
  transition: background-color 0.1s, color 0.1s;
  font-family: 'Tenor Sans', sans-serif;
  cursor: pointer;

  &:hover {
    background-color: #957484;
  }

  img {
      width: 20px; 
  }

  // Responsive tablet
  @media (min-width: 768px) {
    padding: 15px; 
    img {
      width: 30px;
    }
  }

  // Responsive desktop
  @media (min-width: 1285px) {
    padding: 20px 20px;
    img {
      width: 30px; 
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
