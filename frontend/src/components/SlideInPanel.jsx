import PropTypes from "prop-types"
import { useEffect, useRef, useState } from "react"
import styled from "styled-components"

export const SlideInPanel = ({ isOpen, onClose, children, panelType }) => {
  const panelRef = useRef()
  const [currentPanelType, setCurrentPanelType] = useState(panelType)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  useEffect(() => {
    if (isOpen) {
      setCurrentPanelType(panelType)
    }
  }, [isOpen, panelType])

  return (
    <PanelContainer ref={panelRef} $isOpen={isOpen} $panelType={currentPanelType}>
      <CloseButton onClick={onClose}>×</CloseButton>
        {children}
    </PanelContainer>
  )
}

const PanelContainer = styled.div`
  position: fixed;
  top: 60px;
  width: 100%;
  background: ${({ $panelType }) =>
    $panelType === "register" ? "var(--ocean)" : "var(--forest)"};
  transition: right 0.4s ease-in-out;
  z-index: 9;
  overflow-y: auto;
  height: calc(100% - 60px);
  right: ${({ $isOpen }) => ($isOpen ? "0" : "-100%")};

  @media (min-width: 1025px) {
    width: 400px;
    top: 80px;
    height: calc(100% - 80px);
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    width: 400px;
    top: 80px;
    height: calc(70% - 80px);
  }
`

const CloseButton = styled.div`
  font-size: 30px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  left: 20px;
`

SlideInPanel.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  panelType: PropTypes.string,
  children: PropTypes.any,
}
