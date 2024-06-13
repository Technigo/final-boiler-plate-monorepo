import styled from "styled-components"

export const Button = styled.button`
  background-color: var(--raspberry);
  color: #fff;
  border-radius: 15px;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 500;
  transition: 0.2s ease;
  text-decoration: none;
  margin-top: 20px;
  box-shadow: 5px 5px var(--raspberryshadow);

  &:hover {
    box-shadow: 7px 7px var(--raspberryshadow);
    cursor: pointer;
    transition: 0.2s ease;
  }

  &:active {
    background-color: var(--raspberryactive);
  }
`

export default Button
