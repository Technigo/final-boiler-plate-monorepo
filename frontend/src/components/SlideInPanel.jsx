import styled from "styled-components";

export const SlideInPanel = ({ isOpen, onClose, children }) => {
  return (
    <PanelContainer isOpen={isOpen}>
      <CloseButton onClick={onClose}>×</CloseButton>
      {children}
    </PanelContainer>
  );
};

const PanelContainer = styled.div`
  position: fixed;
  top: 60px;
  right: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
  width: 100%;
  height: calc(100% - 60px);
  background: white;
  transition: right 0.3s ease-in-out;
  z-index: 9;

  @media (min-width: 700px) {
    width: 400px;
    top: 80px;
    height: calc(100% - 80px);
  }
`;

const CloseButton = styled.div`
  font-size: 30px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  left: 10px;
`;