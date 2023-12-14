import "./Header.css";
import { NavLeft } from "./nav/NavLeft";
import { NavRight } from "./nav/NavRight";

export const Header = () => {
  return (
    <header>
      <div className="header-wrapper">
        <NavLeft />
        <div className="logo-container">
          <img
            src="./logo-sand.svg"
            alt="Plants by Holm and Witting logotype"
          />
        </div>
        <NavRight />
      </div>
    </header>
  );
};
