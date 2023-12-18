import { Button } from "../Buttons/Button";
import { GiGardeningShears } from "react-icons/gi";
import { MdPets } from "react-icons/md";
import { TiShoppingCart } from "react-icons/ti";
import { GiHammerNails } from "react-icons/gi";
import { MdMiscellaneousServices } from "react-icons/md";
import styled from "styled-components";

const StyledFeedCard = styled.div`
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

export const FeedTaskCard = ({ task }) => {
  const { _id, category, area } = task;

  const { icon: CategoryIcon, backgroundColor } = categoryStyle[category] || {
    icon: null,
    backgroundColor: "#ffffff",
  };

  return (
    <StyledFeedCard style={{ backgroundColor }}>
      <li key={_id}>
        {CategoryIcon && <CategoryIcon size={iconSize} />}
        <h3>{task.task}</h3>
        <p>{category}</p>
        <p>{area}</p>
        <Button className="show-more-button" buttonName="Show more" />
      </li>
    </StyledFeedCard>
  );
};
