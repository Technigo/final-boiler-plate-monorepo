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
import { useTranslation } from 'react-i18next';
import lottie from 'lottie-web';
import logInAnimationData from "../data/login_animation.json";

// Define the 'Habits' functional component.
export const Habits = () => {
  const isMobile = useMediaQuery({ maxWidth: 393 });
  const isTablet = useMediaQuery({ minWidth: 394, maxWidth: 834 });

  const { habits, fetchHabits, handleEdit, deleteHabitById, markFinished, markUnfinished } = habitStore();
  const { username, isLoggedIn, handleLogout } = userStore();

  const { t } = useTranslation();

  useEffect(() => {
    fetchHabits();
    console.log('fetch');

    const container = document.getElementById('login-lottie-container');

    if (container) {
      const animation = lottie.loadAnimation({
        container,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: logInAnimationData,
      });

      // Cleanup the animation on component unmount
      return () => {
        animation.destroy();
      };
    }
  }, []);



  const navigate = useNavigate();

  const onLogoutClick = () => {
    handleLogout();
    alert("Log out successful");
    navigate("/");
  };

  const onClickMark = async (habit, active, date) => {
    if (active) {
      await markUnfinished(habit._id, date);
    } else {
      await markFinished(habit._id, date);
    }
  };

  const finishedComponent = (habit) => {
    var dayElements = [];
    var finished = habit.finished.map((i) => moment(i).dayOfYear());

    for (var i = 1; i <= 7; i++) {
      const day = moment().day(i);
      const active = finished.includes(day.dayOfYear());
      const dayLabel = day.format('dddd');

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
        {dayElements}
        <div className="finished-weeks">
          {t("Finished weeks:")} {habit.finishedWeeks || 0}
        </div>
      </div>
    );
  };

  // Function to get the background class based on the habit index
  const getHabitBackgroundClass = (index) => {
    const classes = ['habit-bg-first', 'habit-bg-second', 'habit-bg-third', 'habit-bg-forth'];
    return classes[index % classes.length];
  };

  return (
    <>
      {isMobile ? <NavbarMobile /> : isTablet ? <NavbarMobile /> : <Navbar />}

      <div className="habits-container">
        {isLoggedIn && <h2>{t("Hi")} {username}{t(", welcome! Let's make the best of this day ☀️")}</h2>}

        {isLoggedIn ? (
          <>
            <h3>{t("My habits")}</h3>
            <hr />
            {habits.length === 0 ? (
              <p>{t("No habits yet, go ahead and add some!")}</p>
            ) : (
              habits.map((habit, index) => (
                <div key={habit._id} className={`card-wrapper ${getHabitBackgroundClass(index)}`}>
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

            <CreateHabit />
            <button onClick={onLogoutClick}>{t("Sign Out")}</button>
          </>
        ) : (
          <div className="access-denied-container">
            <div className="message-box">
              <div id="login-lottie-container" className="login-lottie-animation"></div>
              <h2>{t("Oops! You need to be logged in.")}</h2>
              <p>
                {t("Access to My Page is exclusive to our members. Please")}
                <Link to="/">{t("log in")}</Link>
                {t("or")}
                <Link to="/">{t("sign up")}</Link>
                {t("to manage your personal content and enjoy all the benefits of being a member.")}
              </p>
              <p>
                {t("If you're just looking around, welcome! Feel free to")}
                <Link to="/">{t("go back to our homepage")}</Link>
                {t("and explore.")}
              </p>
            </div>
          </div>
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

