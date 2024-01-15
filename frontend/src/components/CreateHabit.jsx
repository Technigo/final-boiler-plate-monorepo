import { useState } from "react";
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
    <div style={createHabitStyles}>
      <div style={inputButtonContainerStyles}>
        <input
          style={habitInputStyles}
          type="text"
          placeholder={t("enter new habit")}
          onChange={habitInput}
          value={habit}
        />
        <button style={addHabitButtonStyles} onClick={addHabitLocal}>
          <img style={plusIconStyles} src="/plus.png" alt="plus icon" />{t("Add Habit")}
        </button>
      </div>
      <button style={deleteHabitButtonStyles} onClick={deleteAllHabits}>
        <img style={deleteIconStyles} src="/trashcan.png" alt="delete icon" />{t("Delete All My Habits")}
      </button>
    </div>
  );
};

// Define inline styles
const createHabitStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  padding: '40px',
  paddingLeft: '0px',
};

const inputButtonContainerStyles = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '10px',
};

const habitInputStyles = {
  color: 'black',
  padding: '10px',
  fontWeight: '200',
  fontStyle: 'italic',
  fontFamily: 'sans-serif',
  fontSize: '15px',
  backgroundColor: '#f4eee3',
  borderRadius: '25px',
  border: '1px solid grey',
  flexGrow: '1',
};

const addHabitButtonStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 'auto',
  padding: '5px 10px',
  paddingTop: '1px',
  fontSize: '17px',
  border: 'none',
  cursor: 'pointer',
  fontFamily: 'Poppins, sans-serif',
  fontWeight: 'bold',
  color: 'black',
};

const plusIconStyles = {
  width: '15px',
  marginRight: '5px',
};

const deleteHabitButtonStyles = {
  border: '#3EC3CE dotted 2px',
  color: '#3EC3CE',
  backgroundColor: 'transparent',
  fontFamily: 'Poppins, sans-serif',
  fontWeight: 'bold',
  padding: '5px 10px',
  width: 'auto',
  alignSelf: 'center',
  marginTop: '50px',
};

const deleteIconStyles = {
  width: '14px',
  paddingRight: '8px',
};
