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
import { useEffect } from "react";

// Styled components for the FeedTaskCard modal
const StyledFeedCardModal = styled.div`
  border: 1px solid #9eb7bf;
  border-radius: 20px 0 20px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  /* .modal-content {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #f1f1f1;
    padding: 14px 28px;
    max-width: 500px;
    min-width: 300px;
  } */
`;

// const StyledModalContent = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 20px; /* Add padding to the modal content */
// `;

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

  useEffect(() => {
    // Add or remove 'active-modal' class to the body based on modal state
    if (isModalOpen) {
      document.body.classList.add("active-modal");
    } else {
      document.body.classList.remove("active-modal");
    }

    // Cleanup function to remove the class when the component is unmounted
    return () => {
      document.body.classList.remove("active-modal");
    };
  }, [isModalOpen]);

  return (
    <>
      <StyledFeedCardModal style={{ backgroundColor }}>
        <div className="modal-content">
          <li key={_id}>
            {CategoryIcon && <CategoryIcon size={iconSize} />}
            <h3>{task.task}</h3>
            <p>{category}</p>
            <p>{area}</p>
            <Button
              onClick={openModal}
              className="show-more-button"
              buttonName="Show more"
            />
          </li>
        </div>
      </StyledFeedCardModal>

      {/* Modal component */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Feed Task Modal"
        style={{
          overlay: {
            backgroundColor: "rgba(49, 49, 49, 0.8)", // Change overlay background color
            width: "100vw",
            height: "100vh",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            position: "fixed",
          },
        }}
      >
        <StyledFeedCardModal>
          {CategoryIcon && <CategoryIcon size={iconSize} />}

          <Button
            onClick={closeModal}
            className="closeModal-btn"
            buttonName="X"
          />
          <h3>{task.task}</h3>
          <p>{category}</p>
          <p>{area}</p>
          <p>{task.description}</p>
          {/* Button to offer help */}
          <IconButton
            className="offer-help-button"
            buttonName="Lend a helping hand"
            iconAlt="Logo showing two shaking hands forming a heart"
            src="/Logo-black.png"
          />
        </StyledFeedCardModal>
      </Modal>
    </>
  );
};
