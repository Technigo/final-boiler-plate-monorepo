import { useState, useEffect } from "react";
import { GiGardeningShears } from "react-icons/gi";
import { MdPets } from "react-icons/md";
import { TiShoppingCart } from "react-icons/ti";
import { GiHammerNails } from "react-icons/gi";
import { MdMiscellaneousServices } from "react-icons/md";
import { Button } from "./Buttons/Button";
import { IconButton } from "./Buttons/IconButton";
import { taskStore } from "../stores/taskStore";
import { Heading3 } from "./Typography/Heading3";
import { BodyText } from "./Typography/BodyText";
import Modal from "react-modal";
import styled from "styled-components";

// Styled components for the FeedTaskCard modal
const StyledFeedCardModal = styled.div`
  border: 1px solid #9eb7bf;
  border-radius: 20px 0 20px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  width: 260px;
  height: auto;
  color: var(--darktext);
  background-color: var(--grey);
`;

// Styling for the Need card
const CardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 6px;
`;

// Styling for the Need card header
const TaskHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px;
  justify-content: flex-start;
`;
// Styling for the Needs card body
const CardBodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .description {
    width: 100%;
  }
`;

// Styling for the Need card location and title
const Area = styled.div`
  display: flex;
  flex-direction: column;
  overflow-wrap: break-word;
  margin: 10px;
  text-align: center;
`;

// Styling for the Need card footer
const TaskFooter = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: 10px;
`;

// Styling for the description in the card when the modal is open
const Description = styled.div`
  margin: 30px 15px;
  overflow-wrap: break-word;
  text-align: center;
`;

// Styling for the title and location in the card
const AreaModal = styled.div`
  display: flex;
  flex-direction: column;
  overflow-wrap: break-word;
  text-align: center;
  margin: 10px;
`;

// Define the icon size
const iconSize = "40px";

// Define the category style
const categoryStyle = {
  Garden: {
    icon: GiGardeningShears,
  },
  Pets: {
    icon: MdPets,
  },
  Shopping: {
    icon: TiShoppingCart,
  },
  Repairs: {
    icon: GiHammerNails,
  },
  Other: {
    icon: MdMiscellaneousServices,
  },
};

// Define the FeedTaskCard component
export const FeedTaskCard = ({ task }) => {
  const { _id, category, area } = task; // Destructure the task object
  const { icon: CategoryIcon, backgroundColor } = categoryStyle[category] || {
    icon: null, // Set the icon to null if it doesn't exist
    backgroundColor: "var(--grey)",
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

  // Add current user as a volunteer to a specific task/need
  const addMyselfToTaskClick = () => {
    addMyselfToTask(task._id); // Call the addMyselfToTask action
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
        {/* Set the background color based on the category */}
        <CardContainer>
          <li key={_id}>
            <TaskHeader>
              {CategoryIcon && <CategoryIcon size={iconSize} />}{" "}
              {/* Render the icon if it exists */}
              <BodyText
                className={"bodytext-feedtaskcard"}
                text={`${category}`}
              />{" "}
              {/* Render the category */}
            </TaskHeader>
            <CardBodyContainer>
              <Area>
                <Heading3
                  className={"heading3-feedtaskcard"}
                  text={`${task.task}`}
                />
                {/* Render the Need */}
                <BodyText
                  className={"bodytext-feedtaskcard"}
                  text={`${area}`}
                />
                {/* Render the location where the Need is to be performed */}
              </Area>
              <TaskFooter>
                <BodyText
                  className={"bodytext-feedtaskcard"}
                  text={`Created by: ${task.user && task.user.username}`}
                />
                {/* Render the username of the user who created the Need */}
                <BodyText
                  className={"bodytext-feedtaskcard"}
                  text={`Posted: ${formattedCreatedAt}`}
                />
                {/* Render the date when the Need was created */}
              </TaskFooter>
              <Button // Button to open the modal
                onClick={openModal}
                className="show-more-btn"
                buttonName="Show more"
              />
            </CardBodyContainer>
          </li>
        </CardContainer>
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
            backgroundColor: "var(--grey)",
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
          <CardContainer>
            <li key={_id}>
              {/* Render the Need card */}
              <TaskHeader>
                {CategoryIcon && <CategoryIcon size={iconSize} />}{" "}
                {/* Render the icon if it exists */}
                <BodyText
                  className={"bodytext-feedtaskcard"}
                  text={`${category}`}
                />
                {/* Render the category */}
                {/* Button to close the modal */}
                <Button
                  onClick={closeModal} // Call closeModal when the user clicks on the button
                  className="close-modal-btn"
                  buttonName="X"
                />
              </TaskHeader>
              <CardBodyContainer>
                <AreaModal>
                  {/* Render the Need and the location where the Need is to be performed */}
                  <Heading3
                    className={"heading3-modalcard"}
                    text={`${task.task}`}
                  />
                  {/* Render the title of the Need */}
                  <BodyText
                    className={"bodytext-feedtaskcard"}
                    text={`${area}`}
                  />
                  {/* Render the location where the Need is to be performed */}
                </AreaModal>

                {/* Modal content */}
                <Description>
                  <BodyText
                    className={"bodytext-feedtaskcard"}
                    text={`${task.description}`}
                  />
                  {/* Render the description of the Need */}
                </Description>
                <TaskFooter>
                  <BodyText
                    className={"bodytext-feedtaskcard"}
                    text={`Created by: ${task.user && task.user.username}`}
                  />
                  {/* Render the username of the user who created the Need */}
                  <BodyText
                    className={"bodytext-feedtaskcard"}
                    text={`Posted: ${formattedCreatedAt}`}
                  />
                  {/* Render the date when the Need was created */}
                </TaskFooter>

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
              </CardBodyContainer>
            </li>
          </CardContainer>
        </StyledFeedCardModal>
      </Modal>
    </>
  );
};
