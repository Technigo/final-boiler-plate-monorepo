import { NavLeft } from "./NavLeft"
import { NavRight } from "./NavRight"

export const Navbar = () => {
  return (
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
  )
}
