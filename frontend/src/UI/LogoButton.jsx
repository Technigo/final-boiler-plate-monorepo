import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledLogoButton = styled.button`
  padding: 0; 
  border: none;
  border-radius: 50%;
  background-color: #DBC6B6; 
  color: #1D1C25; 
  transition: background-color 0.1s, color 0.1s;
  font-family: 'Tenor Sans', sans-serif;
  cursor: pointer;

  &:hover img {
    transform: scale(1.1); 
  }

  img {
      width: 47px; 
  }

  // Responsive tablet
  @media (min-width: 768px) {
 
    img {
      width: 70px;
    }
  }

  // Responsive desktop
  @media (min-width: 1285px) {
    img {
      width: 90px; 
    }
  }
`;

export const LogoButton = () => {
  const navigate = useNavigate();


  const goHome = () => {
    // Save the current scroll position
    sessionStorage.setItem('lastScrollPosition', window.scrollY);

    navigate('/');
  };

  return (
    <StyledLogoButton onClick={goHome}>
      <img src="/images/logo.png" alt="Home" />
    </StyledLogoButton>
  );
};