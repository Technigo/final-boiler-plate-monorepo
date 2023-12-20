import { IconButton } from "../Buttons/IconButton";
import { IoCloseOutline } from "react-icons/io5";
import { GiGardeningShears } from "react-icons/gi";
import { MdPets } from "react-icons/md";
import { TiShoppingCart } from "react-icons/ti";
import { GiHammerNails } from "react-icons/gi";
import { MdMiscellaneousServices } from "react-icons/md";
import styled from "styled-components";

const StyledModalCard = styled.div`
  border: 1px solid #9eb7bf;
  border-radius: 20px 0 20px 20px;
`;

const iconSize = "100px"; // Define the icon size

const categoryStyle = {
  Garden: {
    icon: GiGardeningShears,
    backgroundColor: "#cbfacd",
  },
  Pets: {
    icon: MdPets,
    backgroundColor: "#e8a5a5",
  },
  Shopping: {
    icon: TiShoppingCart,
    backgroundColor: "#ffecea",
  },
  Repairs: {
    icon: GiHammerNails,
    backgroundColor: "#eaf0ff",
  },
  Other: {
    icon: MdMiscellaneousServices,
    backgroundColor: "#f4ebff",
  },
};

//handleEdit, deleteTaskById lägga till med task om dessa funktioner skall finnas här?
export const ModalTaskCard = ({ task }) => {
  const { _id, category, area, description } = task || {};

  //Ska vi ta bort efter || då alla fält i createTask är tvingande?
  const { icon: CategoryIcon, backgroundColor } = categoryStyle[category] || {
    icon: null,
    backgroundColor: "#ffffff",
  };

  return (
    <StyledModalCard style={{ backgroundColor }}>
      <li key={_id}>
        <IoCloseOutline style={{ width: "32px", height: "32px" }} />
        {CategoryIcon && <CategoryIcon size={iconSize} />}
        <h3>{task}</h3>
        <p>{category}</p>
        <p>{area}</p>
        <p>{description}</p>
        <IconButton
          className="offer-help-button"
          buttonName="Lend a helping hand"
          iconAlt="YourAltText"
          src="/Logo-black.png"
        />
      </li>
    </StyledModalCard>
  );
};
