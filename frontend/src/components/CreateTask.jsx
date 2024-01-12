import { useState } from "react";
import { taskStore } from "../stores/taskStore";
import { Button } from "../components/Buttons/Button";
import styled from "styled-components";

const StyledCreateTask = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  height: 500px;

  @media screen and (min-width: 600px) {
    height: 400px;
  }

  @media screen and (min-width: 1000px) {
    width: 700px;
  }
`;

const StyledTaskTitleInput = styled.input`
  border: 1px solid var(--button);
  border-radius: 20px;
  width: 250px;
  padding: 5px 5px 5px 10px;
  background-color: var(--grey);
`;

const CreateTaskSelects = styled.div`
  display: flex;
  gap: 4px;

  @media screen and (min-width: 600px) {
    gap: 50px;
  }
`;

const StyledSelects = styled.select`
  display: flex;
  width: 123px;
  border: 1px solid var(--button);
  background-color: var(--grey);
  border-radius: 20px;
  padding: 5px;
`;

const StyledTaskInput = styled.textarea`
  border: 1px solid var(--button);
  border-radius: 20px 0 20px 20px;
  width: 250px;
  height: 150px;
  background-color: var(--grey);
  padding: 10px;
  resize: none; /* Prevent resizing */
  overflow-y: auto; /* Enable vertical scrollbar when content exceeds height */

  &::placeholder {
    word-wrap: break-word;
    text-align: left;
    vertical-align: top;
  }

  @media screen and (min-width: 600px) {
    width: 400px;
    height: 100px;
  }
`;

const ErrorCounterWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0;
  gap: 25px;
  width: 250px;

  @media screen and (min-width: 600px) {
    width: 400px;
  }
`;

const StyledCharCounter = styled.span`
  font-size: 12px;
  color: var(--lighttext);
  text-align: left;
  padding-right: 10px;
`;

const StyledTitleError = styled.p`
  color: #e70505;
`;

const StyledDescriptionError = styled.p`
  color: #e70505;
  padding-left: 10px;
  text-align: left;
`;

// Define the 'CreateTask' functional component.
export const CreateTask = () => {
  // State variables to handle task creation
  const [task, setTask] = useState("");
  const [category, setCategory] = useState("");
  const [area, setArea] = useState("");
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [taskLength, setTaskLength] = useState(0);

  // Access the 'addTaskToServer' function from the 'taskStore'.
  const { addTaskToServer } = taskStore();

  // Function to update the 'task' state with the value entered in the input field.
  const taskTitle = (e) => {
    const newTitle = e.target.value.slice(0, 30); // Limit the title to 30 characters.
    setTask(newTitle);

    // Check the length of the title and update the error state
    if (newTitle.length < 3 || newTitle.length > 30) {
      // If the title is less than 3 or more than 29 characters
      setTitleError("Title must be between 3 and 30 characters."); // Set the error message
    } else {
      setTitleError("");
    }
  };

  // Functions to handle category and area selection
  const taskCategory = (e) => {
    // Get the value entered in the input field.
    setCategory(e.target.value); // Update the 'task' state with the value entered in the input field.
  };
  const taskArea = (e) => {
    // Get the value entered in the input field.
    setArea(e.target.value); // Update the 'task' state with the value entered in the input field.
  };

  // Function to handle task description input
  const taskDescription = (e) => {
    const newDescription = e.target.value.slice(0, 300); // Limit the description to 300 characters.
    setDescription(newDescription); // Update the 'task' state with the value entered in the input field.
    setTaskLength(newDescription.length); // Update task length

    // Check the length of the description and update the error state
    if (newDescription.length < 10 || newDescription.length > 299) {
      // If the description is less than 10 or more than 299 characters
      setDescriptionError("Description must be between 10 and 300 characters."); // Set the error message
    } else {
      setDescriptionError("");
    }
  };

  // Function to add a new task both locally and to the server.
  const addTaskLocal = async () => {
    if (
      task.trim() !== "" && // Check if the task is not empty and
      category !== "" && // Check if the category is not empty and
      area !== "" && // Check if the area is not empty and
      description !== "" // Check if the description is not empty
    ) {
      if (titleError || descriptionError) {
        // Don't proceed if there is a description error
        return;
      }
      // Create a new task object.
      const newTask = {
        task: task,
        category: category,
        area: area,
        description: description,
      };

      // Add the new task to the server.
      await addTaskToServer(newTask);
      setTask("");
      setCategory("");
      setArea("");
      setDescription("");
      setTaskLength(0); // Reset the task length counter to zero
    } else {
      alert("Please fill in all fields");
    }
  };

  // Render the component content.
  return (
    <StyledCreateTask>
      <p>
        Share your need with the community! After posting, you will see the
        status of your post in your profile page.
      </p>
      {/* Create an input field for entering the task title. */}
      <StyledTaskTitleInput
        className="task-input"
        type="text"
        placeholder="Enter a descriptive title"
        onChange={taskTitle}
        value={task}
      />
      {/* Title error message */}
      {titleError && <StyledTitleError>{titleError}</StyledTitleError>}
      <CreateTaskSelects>
        {/* Create dropdowns for choosing category and area. */}
        <StyledSelects
          className="task-select"
          type="select"
          onChange={taskCategory}
          value={category}
        >
          <option disabled default value="">
            Category
          </option>
          <option value="Pets">Pets</option>
          <option value="Repairs">Repairs</option>
          <option value="Shopping">Shopping</option>
          <option value="Garden">Garden</option>
          <option value="Other">Other</option>
        </StyledSelects>
        <StyledSelects
          className="task-select"
          type="select"
          onChange={taskArea}
          value={area}
        >
          <option disabled default value="">
            Area
          </option>
          <option value="Bua">Bua</option>
          <option value="Getterön">Getterön</option>
          <option value="Himle">Himle</option>
          <option value="Hunnestad">Hunnestad</option>
          <option value="Källstorp">Källstorp</option>
          <option value="Kungsäter">Kungsäter</option>
          <option value="Rolfstorp">Rolfstorp</option>
          <option value="Skällinge">Skällinge</option>
          <option value="Tofta">Tofta</option>
          <option value="Torpa">Torpa</option>
          <option value="Trönningenäs">Trönningenäs</option>
          <option value="Tvååker">Tvååker</option>
          <option value="Tångaberg">Tångaberg</option>
          <option value="Valinge">Valinge</option>
          <option value="Varberg City">Varberg City</option>
          <option value="Veddige">Veddige</option>
          <option value="Väröbacka">Väröbacka</option>
          <option value="Årnäs">Årnäs</option>
          <option value="Åsby (Derome)">Åsby (Derome)</option>
        </StyledSelects>
      </CreateTaskSelects>
      <StyledTaskInput
        className="task-input"
        type="text"
        placeholder="Give a clear and detailed description of the help you need."
        onChange={taskDescription}
        value={description}
      />
      <ErrorCounterWrapper>
        {/* Description error message */}
        {descriptionError && (
          <StyledDescriptionError>{descriptionError}</StyledDescriptionError>
        )}
        {/* Character counter */}
        <StyledCharCounter>
          {taskLength}/300 {/* Maximum characters allowed */}
        </StyledCharCounter>
      </ErrorCounterWrapper>
      {/* Create a button to trigger the 'addTaskLocal' function for adding the task. */}
      <Button
        onClick={addTaskLocal}
        className="add-task-btn"
        buttonName="Ask for help"
      />
    </StyledCreateTask>
  );
};
