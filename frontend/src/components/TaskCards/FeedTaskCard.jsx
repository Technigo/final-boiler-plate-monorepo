// import { Button } from "../Buttons/Button";
// import { GiGardeningShears } from "react-icons/gi";
// import { MdPets } from "react-icons/md";
// import { TiShoppingCart } from "react-icons/ti";
// import { GiHammerNails } from "react-icons/gi";
// import { MdMiscellaneousServices } from "react-icons/md";
// import styled from "styled-components";

// const StyledFeedCard = styled.div`
//   border: 1px solid #9eb7bf;
//   border-radius: 20px 0 20px 20px;
// `;

// const iconSize = "100px"; // Define the icon size

// const categoryStyle = {
//   Garden: {
//     icon: GiGardeningShears,
//     backgroundColor: "#cbfacd",
//   },
//   Pets: {
//     icon: MdPets,
//     backgroundColor: "#e8a5a5",
//   },
//   Shopping: {
//     icon: TiShoppingCart,
//     backgroundColor: "#ffecea",
//   },
//   Repairs: {
//     icon: GiHammerNails,
//     backgroundColor: "#eaf0ff",
//   },
//   Other: {
//     icon: MdMiscellaneousServices,
//     backgroundColor: "#f4ebff",
//   },
// };

// export const FeedTaskCard = ({ task }) => {
//   const { _id, category, area } = task;

//   const { icon: CategoryIcon, backgroundColor } = categoryStyle[category] || {
//     icon: null,
//     backgroundColor: "#ffffff",
//   };

//   return (
//     <StyledFeedCard style={{ backgroundColor }}>
//       <li key={_id}>
//         {CategoryIcon && <CategoryIcon size={iconSize} />}
//         <h3>{task.task}</h3>
//         <p>{category}</p>
//         <p>{area}</p>
//         <Button className="show-more-button" buttonName="Show more" />
//       </li>
//     </StyledFeedCard>
//   );
// };

import React, { useState } from "react";
import Modal from "react-modal";
import { Button } from "../Buttons/Button";
import { GiGardeningShears } from "react-icons/gi";
import { MdPets } from "react-icons/md";
import { TiShoppingCart } from "react-icons/ti";
import { GiHammerNails } from "react-icons/gi";
import { MdMiscellaneousServices } from "react-icons/md";
import styled from "styled-components";
import { IconButton } from "../Buttons/IconButton";

// Styled components for the FeedTaskCard modal
const StyledFeedCardModal = styled.div`
  border: 1px solid #9eb7bf;
  border-radius: 20px 0 20px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const iconSize = "50px"; // Define the icon size

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

  // State to manage the modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <StyledFeedCardModal style={{ backgroundColor }}>
        <li key={_id}>
          {CategoryIcon && <CategoryIcon size={iconSize} />}
          <h3>{task.task}</h3>
          <p>{category}</p>
          <p>{area}</p>
          <Button
            className="show-more-button"
            buttonName="Show more"
            onClick={openModal}
          />
        </li>
      </StyledFeedCardModal>

      {/* Modal component */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Feed Task Modal"
      >
        {/* <h2>Feed Task Modal Content</h2>
        <p>This is the content inside the modal for Feed Task Card.</p> */}

        {/* Content from FeedTaskCard */}
        {CategoryIcon && <CategoryIcon size={iconSize} />}
        {/* Button to close the modal */}
        <button onClick={closeModal}>X</button>
        <h3>{task.task}</h3>
        <p>{category}</p>
        <p>{area}</p>
        <p>{task.description}</p>
        {/* <Button className="show-more-button" buttonName="Show more" /> */}
        <IconButton
          className="offer-help-button"
          buttonName="Lend a helping hand"
          iconAlt="YourAltText"
          src="/Logo-black.png"
        />
      </Modal>
    </>
  );
};
