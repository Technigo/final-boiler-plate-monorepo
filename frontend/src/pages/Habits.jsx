// Import necessary dependencies, components, and stores.
import { useEffect } from "react";
import moment from 'moment';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CreateHabit } from "../components/CreateHabit";
import { habitStore } from "../stores/habitStore";
import { userStore } from "../stores/userStore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./habits.css";

// Define the 'Habits' functional component.
export const Habits = () => {
  // Text content for the heading and paragraphs.
  const text = {
    heading: "Habits Page",
    intro: "Habits Here",
    loremIpsum:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, vitae fugit ipsam quo accusantium autem officia necessitatibus ullam voluptati",
  };

  // Access the 'Habits', 'fetchHabits', 'handleEdit', and 'deleteHabitById' functions from the 'HabitStore'.
  const { habits, fetchHabits, handleEdit, deleteHabitById, markFinished, markUnfinished } = habitStore();
  // Access the 'accessToken' from the 'userStore'.
  const { accessToken } = userStore();

  // Use the 'useEffect' hook to fetch habits when 'habits' or 'accessToken' change.
  useEffect(() => {
    fetchHabits();
    console.log('fetch');
  }, []);

  // Initialize the 'navigate' function from React Router.
  const navigate = useNavigate();

  // Access the 'handleLogout' function from the 'userStore'.
  const storeHandleLogout = userStore((state) => state.handleLogout);

  // Function to handle the click event of the logout button.
  const onLogoutClick = () => {
    storeHandleLogout();
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
    var buttons = [];
    var finished = habit.finished.map((i) => moment(i).dayOfYear());
    for (var i = 1; i <= 7; i++) {
      const day = moment().day(i);
      const active = finished.includes(day.dayOfYear()) ? true : false;
      buttons.push(<button className={active ? "finished" : "unfinished"} onClick={() => onClickMark(habit, active, day.format('YYYY-MM-DDT12:00:00'))}>{moment().day(i).format('dddd')}</button>);
    }
    return buttons;
  };

  // Render the component content.
  return (
    <>
      <Navbar />
      <nav>
        {/* Create a navigation menu with links to the home, habits, and sign-out routes. */}
        <ul className="app-ul">
          <li className="app-li">
            <button onClick={onLogoutClick}>Sign Out</button>
          </li>
        </ul>
      </nav>
      <div>
        <h2>{text.heading}</h2>
        <p>{text.intro}</p>
        <p>{text.loremIpsum}</p>
        {/* Render the 'Createhabit' component to add new habits. */}
        <CreateHabit />
        {/* Conditional rendering based on the number of Habits. */}
        {habits.length === 0 ? (
          <>
            <p>No habits yet, go ahead and get moving!!...</p>
          </>
        ) : (
          // Map through 'habits' and render habit items.
          habits.map((habit) => (
            <div key={habit._id} className="card-wrapper">
              <div className="">
                <p>{habit.habit}</p>
                <p>{finishedComponent(habit)}</p>
                <button onClick={() => deleteHabitById(habit._id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
      <Footer />
    </>
  );
};

// SUMMARY

// This code defines the habits component, which handles the display of habits, their creation, editing, and deletion. It imports necessary components, hooks, and stores, and it uses React Router to navigate between routes. The component also fetches habits from the server using the fetchhabits function and updates the display based on the user's authentication status. Additionally, it renders text content and conditionally displays habits or a message when there are no habits.
