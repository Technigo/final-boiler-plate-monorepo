import styled from 'styled-components';

const StyledInstagramButton = styled.button`
border: none;
border-radius: 50%;
background-color: #DBC6B6; 
color: #1D1C25; 
transition: background-color 0.1s, color 0.1s;
font-family: 'Tenor Sans', sans-serif;
cursor: pointer;
margin: 0px 0px;

img {
    width: 40px; 
}

// Responsive tablet
@media (min-width: 768px) {
  img {
    width: 50px;
  }
}

// Responsive desktop
@media (min-width: 1285px) {
  img {
    width: 80px; 
  }
}
`;

export const InstagramButton = () => {
  const goToInstagram = () => {
    // Redirect to a specific Instagram page
    window.location.href = 'https://www.instagram.com/cbcocktailklubb/';
  };

  return (
    <StyledInstagramButton onClick={goToInstagram}>
      <img src="/images/insta-logo.png" alt="CbC instagram page" />
    </StyledInstagramButton>
  );
};
