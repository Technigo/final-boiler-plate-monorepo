/* eslint-disable no-unused-vars */
import { Button } from "./Button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useUserStore } from "../stores/useUserStore";
import { slide as Menu } from 'react-burger-menu'
import { useState } from "react";

import "./burgerMenu.css";

export const BurgerMenu = () => {

  const { t } = useTranslation();
  const { isLoggedIn } = useUserStore(); 
  const [isMenuOpen, setIsMenuOpen] = useState()

  const closeMenu = () => {
    setIsMenuOpen(false)
    }
  return (
    <div>
        <Menu
        left
        isOpen={isMenuOpen}
         customBurgerIcon={ <img src="/Icons/Black/icons8-carousel-50-B.png" /> }
        >

        </Menu>
    </div>
  )
}
