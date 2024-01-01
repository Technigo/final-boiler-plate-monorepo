// Import necessary dependencies, components, and stores.
import { useEffect } from "react";
import moment from 'moment';
import Navbar from "../components/Navbar";
import NavbarMobile from "../components/NavbarMobile";
import Footer from "../components/Footer";
import FooterMobile from "../components/FooterMobile";
import { CreateHabit } from "../components/CreateHabit";
import { habitStore } from "../stores/habitStore";
import { userStore } from "../stores/userStore";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import "../components/css/habits.css";

// Define the 'Habits' functional component.
export const Habits = () => {
  const isMobile = useMediaQuery({ maxWidth: 393 });
  const isTablet = useMediaQuery({ minWidth: 394, maxWidth: 834 });

  // Access the 'Habits', 'fetchHabits', 'handleEdit', and 'deleteHabitById' functions from the 'HabitStore'.
  const { habits, fetchHabits, handleEdit, deleteHabitById, markFinished, markUnfinished } = habitStore();
  // Access the 'username', 'isLoggedIn', and 'handleLogout' from the 'userStore'.
  const { username, isLoggedIn, handleLogout } = userStore();

  // Use the 'useEffect' hook to fetch habits when 'habits' or 'accessToken' change.
  useEffect(() => {
    fetchHabits();
    console.log('fetch');
  }, []);

  // Initialize the 'navigate' function from React Router.
  const navigate = useNavigate();

  // Function to handle the click event of the logout button.
  const onLogoutClick = () => {
    handleLogout();
    // Additional logic after logout can be added here.
    alert("Log out successful");
    navigate("/"); // You can change this to the login route
  };

  const onClickMark = async (habit, active, date) => {
    if (active) {
      await markUnfinished(habit._id, date);
    } else {
      await markFinished(habit._id, date);
    }
  };

  const finishedComponent = (habit) => {
    // This array will hold both the labels and the circles for each day of the week.
    var dayElements = [];
  
    var finished = habit.finished.map((i) => moment(i).dayOfYear());
    
    for (var i = 1; i <= 7; i++) {
      const day = moment().day(i);
      const active = finished.includes(day.dayOfYear());
      const dayLabel = day.format('dddd');
  
      // Create a container for each day that includes the label and the circle.
      dayElements.push(
        <div key={dayLabel} className="day-container">
          <button
            className={`day-label ${active ? "finished" : "unfinished"}`}
            onClick={() => onClickMark(habit, active, day.format('YYYY-MM-DDT12:00:00'))}
          >
            {dayLabel}
          </button>
          <button
            className={`day-circle ${active ? "finished" : "unfinished"}`}
            onClick={() => onClickMark(habit, active, day.format('YYYY-MM-DDT12:00:00'))}
          />
        </div>
      );
    }
    
    return (
      <div className="days-wrapper">
        {dayElements.map((dayElement, index) => (
          <div key={index} className="day-container">
            {dayElement}
          </div>
        ))}
      </div>
    );
  };
  

  // Render the component content.
  return (
    <>
      {isMobile ? (
        <NavbarMobile />
      ) : isTablet ? (
        <NavbarMobile />
      ) : (
        <Navbar />
      )}

      <div className="habits-container">
        {isLoggedIn && <h2>Hi {username}, welcome! Let's make the best of this day ☀️</h2>}

        {/* Display habits if user is logged in, otherwise show login message. */}
        {isLoggedIn ? (
          <>
            <h3>My habits</h3>
            <hr />
            {/* Conditional rendering based on the number of Habits. */}
            {habits.length === 0 ? (
              <p>No habits yet, go ahead and add some!</p>
            ) : (
              // Map through 'habits' and render habit items.
              habits.map((habit) => (
                <div key={habit._id} className="card-wrapper">
                  <div className="one-habit">
                    <div className="habit-name-container">
                      <p>{habit.habit}</p>
                    </div>  
                    {finishedComponent(habit)}
                    <div className="trash-container">
                      <button className="trash" onClick={() => deleteHabitById(habit._id)}>
                        <img src="./trashcan.png" alt="delete" className="trash-icon" />
                      </button>
                    </div>  
                  </div>
                </div>
              ))
            )}

            {/* Render the 'Createhabit' component to add new habits. */}
            <CreateHabit />
            <button onClick={onLogoutClick}>Sign Out</button>
          </>
        ) : (
          <p>No permission - Please log in.<Link to="/">Back to start</Link></p>
        )}
      </div>

      {isMobile ? (
        <FooterMobile />
      ) : isTablet ? (
        <Footer />
      ) : (
        <Footer />
      )}
    </>
  );
};


