// import styled from 'styled-components';
// import { StyledButton } from './StyledButtons';

// const shouldForwardProp = prop => !['border', 'width', 'height', 'backgroundColor', 'hoverBackgroundColor', 'hoverColor'].includes(prop);

// export const InternalStyledButton = styled(StyledButton).withConfig({
//     shouldForwardProp
// })`
//   padding: 10px;
//   border: ${props => props.$border || 'none'};
//   border-radius: 30px;
//   width: ${props => props.$width || '92px'};
//   height: ${props => props.$height || '53px'};
//   background-color: ${props => props.$backgroundColor || '#FFD075'};
//   color: ${props => props.$color || '#1D1C25'};
//   font-size: 16px;
//   transition: background-color 0.1s, color 0.1s;

//   &:hover {
//     background-color: ${props => props.$hoverBackgroundColor || '#FDE6BA'};
//     color: ${props => props.$hoverColor || '#1D1C25'};
//   }

//   // Tablet-sized devices
//   @media (min-width: 768px) {
//     width: ${props => props.$tabletWidth || '140px'};
//     height: ${props => props.$tabletHeight || '60px'};
//   }

//   // Desktop-sized devices
//   @media (min-width: 1024px) {
//     width: ${props => props.$desktopWidth || '260px'};
//     height: ${props => props.$desktopHeight || '70px'};
//   }
// `;
