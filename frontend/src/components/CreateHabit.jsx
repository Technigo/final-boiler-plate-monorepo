import { useState } from "react";
import "./createhabit.css";
import { habitStore } from "../stores/habitStore";
import { useTranslation } from 'react-i18next';

// Define the 'Createhabit' functional component.
export const CreateHabit = () => {
  const [habit, setHabit] = useState("");
  const { addHabitToServer, deleteAllHabits } = habitStore();
  const { t } = useTranslation();

  const habitInput = (e) => {
    setHabit(e.target.value);
  };

  const addHabitLocal = async () => {
    if (habit.trim() !== "") {
      await addHabitToServer(habit);
      setHabit("");
    }
  };

  return (
    <div className="create-habit-container">
      <div className="input-button-container">
        <input
          className="habit-input"
          type="text"
          placeholder={t("enter new habit")}
          onChange={habitInput}
          value={habit}
        />
        <button className="add-habit-button" onClick={addHabitLocal}>
          <img className="plus-icon" src="/plus.png" alt="plus icon" />{t("Add Habit")}
        </button>
      </div>
      <button className="delete-habit-button" onClick={deleteAllHabits}>
        <img className="delete-icon" src="/trashcan.png" alt="delete icon" />{t("Delete All My Habits")}
      </button>
    </div>
  );
};
