import { useState } from "react";
import { habitStore } from "../stores/habitStore";
import "./createhabit.css";
import { useTranslation } from 'react-i18next';

// Define the 'Createhabit' functional component.
export const CreateHabit = () => {
  // Initialize state variable 'habit' using 'useState' to store the habit input.
  const [habit, setHabit] = useState("");
  // Access the 'addHabitToServer' and 'deleteAllHabits' functions from the 'HabitStore'.
  const { addHabitToServer, deleteAllHabits } = habitStore();

  // Function to update the 'habit' state with the value entered in the input field.
  const habitInput = (e) => {
    setHabit(e.target.value);
  };

  // Function to add a new Habit both locally and to the server.
  const addHabitLocal = async () => {
    if (habit.trim() !== "") {
      // Check if the 'habit' input is not empty or only whitespace.
      await addHabitToServer(habit); // Add the habit to the server.
      setHabit(""); // Clear the input field after the Habit is added.
    }
  };

  const { t } = useTranslation();

  // Render the component content.
  return (
    <>
      <div className="add-habits-container">
        <div className="input-button-container">
          {/* Input field and Add Habit button */}
          <input
            className="habit-input"
            type="text"
            placeholder={t("enter new habit")}
            onChange={habitInput}
            value={habit}
          />
          <button className="add-habit" onClick={addHabitLocal}>
            <img className="plus" src="/plus.png" />{t("Add Habit")}
          </button>
        </div>
        {/* Delete All Habits button */}
        <button className="delete-habit" onClick={deleteAllHabits}>
          <img className="delete-trash-icon" src="/trashcan.png" />{t("Delete All My Habits")}
        </button>
      </div>
    </>
  );
};


