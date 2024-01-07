// Import necessary dependencies and the 'taskStore' from the store.
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
  border: 1px solid var(--secondaryColor);
  border-radius: 20px;
  width: 250px;
  padding: 5px 5px 5px 10px;
`;

const CreateTaskSelects = styled.div`
  display: flex;
  gap: 10px;

  @media screen and (min-width: 600px) {
    gap: 50px;
  }
`;

const StyledSelects = styled.select`
  display: flex;
  width: 120px;
  border: 1px solid var(--secondaryColor);
  border-radius: 20px;
  /* gap: 10px; */
  padding: 5px;
`;

const StyledTaskInput = styled.textarea`
  border: 1px solid var(--secondaryColor);
  border-radius: 20px 0 20px 20px;
  width: 250px;
  height: 150px;
  padding: 10px;
  resize: none; /* Prevent resizing */
  overflow-y: auto; /* Enable vertical scrollbar when content exceeds height */

  &::placeholder {
    word-wrap: break-word; /* Wrap long words */
    text-align: left; /* Align text to the left */
    vertical-align: top; /* Align text to the top */
  }

  @media screen and (min-width: 600px) {
    width: 400px;
    height: 100px;
  }
`;

const ErrorCounterWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  //margin: 0 0 20px;
  padding: 0;
  gap: 25px;

  width: 250px;

  @media screen and (min-width: 600px) {
    width: 400px;
  }
`;

const StyledCharCounter = styled.span`
  font-size: 12px;
  color: #666;
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
  // Initialize state variable 'task' using 'useState' to store the task input.
  const [task, setTask] = useState("");
  const [category, setCategory] = useState("");
  const [area, setArea] = useState("");
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [taskLength, setTaskLength] = useState(0); // State to track task length

  // Access the 'addTaskToServer' function from the 'taskStore'.
  const { addTaskToServer } = taskStore();

  // Function to update the 'task' state with the value entered in the input field.
  // const taskTitle = (e) => {
  //   setTask(e.target.value); // Update the 'task' state with the value entered in the input field.
  // };

  const taskTitle = (e) => {
    const newTitle = e.target.value;
    setTask(newTitle);

    // Check the length of the title and update the error state
    if (newTitle.length < 3 || newTitle.length > 30) {
      setTitleError("Title must be 3 to 30 characters.");
    } else {
      setTitleError("");
    }
  };

  const taskCategory = (e) => {
    setCategory(e.target.value); // Update the 'task' state with the value entered in the input field.
  };
  const taskArea = (e) => {
    setArea(e.target.value); // Update the 'task' state with the value entered in the input field.
  };
  // const taskDescription = (e) => {
  //   setDescription(e.target.value); // Update the 'task' state with the value entered in the input field.
  // };

  const taskDescription = (e) => {
    const newDescription = e.target.value;
    setDescription(newDescription);
    setTaskLength(newDescription.length); // Update task length

    // Check the length of the description and update the error state
    if (newDescription.length < 10 || newDescription.length > 300) {
      setDescriptionError("Description must be between 10 and 300 characters.");
    } else {
      setDescriptionError("");
    }
  };

  // Function to add a new task both locally and to the server.
  const addTaskLocal = async () => {
    if (
      task.trim() !== "" &&
      category !== "" &&
      area !== "" &&
      description !== ""
    ) {
      if (titleError || descriptionError) {
        // Don't proceed if there is a description error
        // window.alert("Please adjust the length of the text before submitting.");
        return;
      }

      const newTask = {
        task: task,
        category: category,
        area: area,
        description: description,
      };

      await addTaskToServer(newTask);
      setTask("");
      setCategory("");
      setArea("");
      setDescription("");
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
      {/* Create an input field for entering the task description. */}
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
        <StyledSelects
          className="task-select"
          type="select"
          onChange={taskCategory}
          value={category}
        >
          <option disabled default value="">
            Category
          </option>
          <option value="Garden">Garden</option>
          <option value="Pets">Pets</option>
          <option value="Shopping">Shopping</option>
          <option value="Repairs">Repairs</option>
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
          <option value="Varberg City">Varberg City</option>
          <option value="Himle">Himle</option>
          <option value="Kungsäter">Kungsäter</option>
          <option value="Rolfstorp">Rolfstorp</option>
          <option value="Tvååker">Tvååker</option>
          <option value="Veddige">Veddige</option>
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
