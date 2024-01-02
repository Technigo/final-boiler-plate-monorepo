import { useState, useEffect } from "react";
import { GiGardeningShears } from "react-icons/gi";
import { MdPets } from "react-icons/md";
import { TiShoppingCart } from "react-icons/ti";
import { GiHammerNails } from "react-icons/gi";
import { MdMiscellaneousServices } from "react-icons/md";
import { Button } from "../Buttons/Button";
import { IconButton } from "../Buttons/IconButton";
import { taskStore } from "../../stores/taskStore";
import Modal from "react-modal";
import styled from "styled-components";

// Styled components for the FeedTaskCard modal
const StyledFeedCardModal = styled.div`
  border: 1px solid #9eb7bf;
  border-radius: 20px 0 20px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
  //height: auto;
  margin: 10px;

  .task-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 10px;
  }

  .task-footer {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin: 10px;
    align-items: center;
  }

  .area {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px;
  }

  /* @media screen and (min-width: 600px) {
    .card-container {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    } */
  /* } */
`;

const iconSize = "40px"; // Define the icon size

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

  // Destructure the addMyselfToTask (volunteer) action from the taskStore
  const { addMyselfToTask } = taskStore();

  // State to manage the modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Convert createdAt to a Date object
  const createdAtDate = new Date(task.createdAt);

  // Format createdAt date to display only date
  const formattedCreatedAt = createdAtDate
    .toLocaleDateString("sv-SE", {
      // Format date to Swedish locale
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\//g, "/"); // Replace slashes with dashes

  // Add current user as a volunteer to a specific task
  const addMyselfToTaskClick = () => {
    console.log(task._id);
    addMyselfToTask(task._id);
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
        <div className="card-container">
          <li key={_id}>
            <div className="task-header">
              {CategoryIcon && <CategoryIcon size={iconSize} />}
              <p>{category}</p>
            </div>
            <div className="area">
              <h3>{task.task}</h3>
              <p>{area}</p>
            </div>
            <div className="task-footer">
              <p>Created by: {task.user && task.user.username}</p>
              <p>Posted: {formattedCreatedAt}</p>
            </div>
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
            position: "fixed",
          },
        }}
      >
        <StyledFeedCardModal>
          {CategoryIcon && <CategoryIcon size={iconSize} />}

          {/* Button to close the modal */}
          <Button
            onClick={closeModal}
            className="closeModal-btn"
            buttonName="X"
          />
          {/* Modal content */}
          <h3>{task.task}</h3>
          <p>{category}</p>
          <p>{area}</p>
          <p>{task.description}</p>
          <p>Posted: {formattedCreatedAt}</p>
          <p>Created by: {task.user && task.user.username}</p>
          {/* Button to offer help */}
          <IconButton
            onClick={() => {
              addMyselfToTaskClick();
              closeModal(); // Call closeModal after volunteer is added
            }}
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
