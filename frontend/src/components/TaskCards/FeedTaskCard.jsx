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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  width: 260px;
  height: auto;

  // Styling for the Need card
  .card-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 5px;
  }

  // Styling for the Need card header
  .task-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 10px;
    justify-content: flex-start;
  }

  // Styling for the Need card location and title
  .area {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px;
  }

  // Styling for the Need card footer
  .task-footer {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin: 10px;
  }

  // Styling for the show more button
  .show-more-btn {
    display: flex;
    align-self: center;
  }

  // Styling for the description in the card when the modal is open
  .description {
    margin: 30px 15px;
    text-align: center;
  }

  // Styling for the button to close the open modal
  .closeModal-btn {
    position: absolute;
    background-color: transparent;
    top: 10px;
    right: 10px;
    border: none;
    border-radius: 10px;
    color: #000000;
    cursor: pointer;

    // Styling for the buttin when hovering over it
    &:hover {
      background-color: #899b64;
    }
  }

  // Styling for the title and location in the card
  .area-modal {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px;
  }
`;

// Define the icon size
const iconSize = "40px";

// Define the category style
const categoryStyle = {
  Garden: {
    icon: GiGardeningShears,
    backgroundColor: "#eaffec",
  },
  Pets: {
    icon: MdPets,
    backgroundColor: "#ffeafd",
  },
  Shopping: {
    icon: TiShoppingCart,
    backgroundColor: "#ffecea",
  },
  Repairs: {
    icon: GiHammerNails,
    backgroundColor: "#eafdff",
  },
  Other: {
    icon: MdMiscellaneousServices,
    backgroundColor: "#eaf3ff",
  },
};

// Define the FeedTaskCard component
export const FeedTaskCard = ({ task }) => {
  const { _id, category, area } = task; // Destructure the task object
  const { icon: CategoryIcon, backgroundColor } = categoryStyle[category] || {
    icon: null, // Set the icon to null if it doesn't exist
    backgroundColor: "#ffffff",
  };

  // Destructure the addMyselfToTask (volunteer) action from the taskStore
  const { addMyselfToTask } = taskStore();

  // State to manage the modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true); // Set the modal state to true
  };

  const closeModal = () => {
    setIsModalOpen(false); // Set the modal state to false
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
    addMyselfToTask(task._id);
  };

  useEffect(() => {
    // Add or remove 'active-modal' class to the body based on modal state
    if (isModalOpen) {
      document.body.classList.add("active-modal"); // Add class to body
    } else {
      document.body.classList.remove("active-modal"); // Remove class from body
    }

    // Cleanup function to remove the class when the component is unmounted
    return () => {
      document.body.classList.remove("active-modal"); // Remove class from body
    };
  }, [isModalOpen]); // Run the effect when the modal state changes

  return (
    <>
      <StyledFeedCardModal style={{ backgroundColor }}>
        {" "}
        {/* Set the background color based on the category */}
        <div className="card-container">
          <li key={_id}>
            <div className="task-header">
              {CategoryIcon && <CategoryIcon size={iconSize} />}{" "}
              {/* Render the icon if it exists */}
              <p>{category}</p> {/* Render the category */}
            </div>
            <div className="area">
              <h3>{task.task}</h3> {/* Render the Need */}
              <p>{area}</p>{" "}
              {/* Render the location where the Need is to be performed */}
            </div>
            <div className="task-footer">
              <p>Created by: {task.user && task.user.username}</p>{" "}
              {/* Render the username of the user who created the Need */}
              <p>Posted: {formattedCreatedAt}</p>{" "}
              {/* Render the date when the Need was created */}
            </div>
            <Button
              onClick={openModal}
              className="show-more-btn"
              buttonName="Show more"
            />
          </li>
        </div>
      </StyledFeedCardModal>

      {/* Modal component */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal} // Call closeModal when the user clicks on the overlay
        contentLabel="Needs Modal Content"
        aria={{
          labelledby: "Needs Modal Content",
          describedby:
            "A modal for showing details about a specific need that someone has posted",
        }}
        style={{
          content: {
            // Change the style of the open modal content
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#eae6ca",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid #9eb7bf",
            borderRadius: "20px 0 20px 20px",
          },
          overlay: {
            // Change the style of the overlay
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
          <div className="card-container">
            <li key={_id}>
              <div className="task-header">
                {CategoryIcon && <CategoryIcon size={iconSize} />}{" "}
                {/* Render the icon if it exists */}
                <p>{category}</p> {/* Render the category */}
                {/* Button to close the modal */}
                <Button
                  onClick={closeModal} // Call closeModal when the user clicks on the button
                  className="closeModal-btn"
                  buttonName="X"
                />
              </div>

              <div className="area-modal">
                {" "}
                {/* Render the Need and the location where the Need is to be performed */}
                <h3>{task.task}</h3> {/* Render the title of the Need */}
                <p>{area}</p>{" "}
                {/* Render the location where the Need is to be performed */}
              </div>

              {/* Modal content */}
              <div className="description">
                <p>{task.description}</p>{" "}
                {/* Render the description of the Need */}
              </div>
              <div className="task-footer">
                <p>Created by: {task.user && task.user.username}</p>{" "}
                {/* Render the username of the user who created the Need */}
                <p>Posted: {formattedCreatedAt}</p>{" "}
                {/* Render the date when the Need was created */}
              </div>

              {/* Button to offer help */}
              <IconButton
                onClick={() => {
                  addMyselfToTaskClick(); // Call addMyselfToTaskClick when the user clicks on the button
                  closeModal(); // Call closeModal after volunteer is added
                }}
                className="offer-help-button-modal"
                buttonName="Lend a helping hand"
                iconAlt="Logo showing two shaking hands forming a heart"
                src="/Logo-white.png"
              />
            </li>
          </div>
        </StyledFeedCardModal>
      </Modal>
    </>
  );
};
