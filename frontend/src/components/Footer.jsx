import React from "react";
import LanguageSwitcherFooter from "./LanguageSwitcherFooter";

const Footer = () => {
    const styles = {
        root: { backgroundColor: "#f0e9dc", overflow: "hidden", padding: "10px" },
        div: {
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingLeft: "30px",
        },
        p: {
          fontSize: "8px",
          paddingTop: "10px",
        },
        img: {
          width: "197px",
        },
      }
      
    return (
        <div className="footer">
            <div className="footer-content">
                <LanguageSwitcherFooter />
                <p>Copyright | All rights reserved | 2023</p>
                <img src="/HabitFlow.png" />
            </div>
        </div>
    );
}

export default Footer; 