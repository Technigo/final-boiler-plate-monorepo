import { useState } from "react";
import { habitStore } from "../stores/habitStore";
import { useTranslation } from 'react-i18next';

export const CreateHabit = () => {
  const [habit, setHabit] = useState("");
  const { addHabitToServer, deleteAllHabits } = habitStore();

  const habitInput = (e) => {
    setHabit(e.target.value);
  };


  const addHabitLocal = async () => {
    if (habit.trim() !== "") {
      await addHabitToServer(habit);
      setHabit("");
    }
  };

  const { t } = useTranslation();

  return (
    <div id="create-habit-container" style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '40px', paddingLeft: '0px' }}>
      <div id="habit-input-container" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
        <input
          id="habit-input"
          style={{
            color: 'black',
            padding: '10px',
            fontWeight: '200',
            fontStyle: 'italic',
            fontFamily: 'sans-serif',
            fontSize: '15px',
            backgroundColor: '#f4eee3',
            borderRadius: '25px',
            border: '1px solid grey',
            width: '300px',
            flexGrow: 1
          }}
          type="text"
          placeholder={t("enter new habit")}
          onChange={habitInput}
          value={habit}
        />
        <button
          id="add-habit-button"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: 'auto',
            padding: '5px 10px',
            paddingTop: '1px',
            fontSize: '17px',
            border: 'none',
            cursor: 'pointer',
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 'bold',
            color: 'black',
            backgroundColor: 'white'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3EC3CE'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
          onClick={addHabitLocal}
        >
          <img style={{ width: '15px', marginRight: '5px' }} src="/plus.png" alt="Add" />
          {t("Add Habit")}
        </button>
      </div>
      <button
        id="delete-all-habits-button"
        style={{
          border: '#3EC3CE dotted 2px',
          color: '#3EC3CE',
          backgroundColor: 'transparent',
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 'bold',
          padding: '5px 10px',
          width: 'auto',
          alignSelf: 'center',
          marginTop: '50px'
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3EC3CE'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        onClick={deleteAllHabits}
      >
        <img style={{ width: '14px', paddingRight: '8px' }} src="/trashcan.png" alt="Delete" />
        {t("Delete All My Habits")}
      </button>
    </div>
  );
};
