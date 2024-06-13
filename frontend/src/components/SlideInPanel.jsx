import styled from "styled-components"
import { useEffect, useRef } from "react"

export const SlideInPanel = ({ isOpen, onClose, children }) => {
  const panelRef = useRef()

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

  return (
    <PanelContainer ref={panelRef} isOpen={isOpen}>
      <CloseButton onClick={onClose}>×</CloseButton>
      {children}
    </PanelContainer>
  )
}

const PanelContainer = styled.div`
  position: fixed;
  top: 60px;
  width: 100%;
  background: white;
  transition: right 0.3s ease-in-out;
  z-index: 9;
  overflow-y: auto;
  height: calc(100% - 60px);
  right: ${({ isOpen }) => (isOpen ? "0" : "-100%")};

  @media (min-width: 700px) {
    width: 400px;
    top: 80px;
    height: calc(100% - 80px);
  }
`

const CloseButton = styled.div`
  font-size: 30px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  left: 10px;
`
