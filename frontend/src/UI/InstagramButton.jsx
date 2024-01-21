import styled from 'styled-components';

const StyledInstagramButton = styled.button`
border: none;
border-radius: 50px;
background-color: transparent; 
transition: background-color 0.1s, color 0.1s;
font-family: 'Tenor Sans', sans-serif;
cursor: pointer;
margin: 0px 0px;

img {
    width: 35px; 
}
&:hover img {
  transform: scale(1.1); 
}
// Responsive tablet
@media (min-width: 768px) {
  img {
    width: 40px;
  }
}

// Responsive desktop
@media (min-width: 1285px) {
  img {
    width: 60px; 
  }
}
`;

export const InstagramButton = () => {
  const goToInstagram = () => {
    window.location.href = 'https://www.instagram.com/cbcocktailklubb/';
  };

  return (
    <StyledInstagramButton onClick={goToInstagram}>
      <img src="/images/insta-logo.png" alt="CbC instagram page" />
    </StyledInstagramButton>
  );
};
