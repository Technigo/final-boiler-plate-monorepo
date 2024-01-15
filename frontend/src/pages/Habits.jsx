import React, { useEffect } from "react";
//import "../components/habits.css";
import moment from "moment";
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
import { useTranslation } from "react-i18next";
import lottie from "lottie-web";
import logInAnimationData from "../data/login_animation.json";

export const Habits = () => {
  const isMobile = useMediaQuery({ maxWidth: 393 });
  const isTablet = useMediaQuery({ minWidth: 394, maxWidth: 834 });

  const { habits, fetchHabits, handleEdit, deleteHabitById, markFinished, markUnfinished } = habitStore();
  const { username, isLoggedIn, handleLogout } = userStore();

  const { t } = useTranslation();

  useEffect(() => {
    fetchHabits();

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
    console.log(`Marking habit: ${habit._id}, Active: ${active}, Date: ${date}`);
    if (active) {
      await markUnfinished(habit._id, date);
    } else {
      await markFinished(habit._id, date);
    }
    console.log(`Updated habit data for ${habit._id}:`, habits.find(h => h._id === habit._id));
  };

  const finishedComponent = (habit) => {
    var dayElements = [];
    var finished = habit.finished.map((i) => moment(i).dayOfYear());

    for (var i = 1; i <= 7; i++) {
      const day = moment().day(i);
      const active = finished.includes(day.dayOfYear());
      const dayLabel = day.format('dddd');

      dayElements.push(
        <div key={dayLabel} className="day-container" style={{ display: 'flex', flexDirection: 'row' }}>
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

  const getHabitBackgroundStyle = (index) => {
    const colors = ['#E7FDFF', '#F2FFE7', '#FFE7F9', '#FFF6E7'];
    return {
      backgroundColor: colors[index % colors.length],
      borderRadius: '20px',
      marginBottom: '15px',
      padding: '20px',
    };
  };

  return (
    <>
      {isMobile ? <NavbarMobile /> : isTablet ? <NavbarMobile /> : <Navbar />}

      <div style={{ textAlign: 'left', margin: '100px auto', maxWidth: '900px' }}>
        {isLoggedIn && <h2 style={{ fontWeight: '500' }}>{t("Hi")}{t(", welcome! Let's make the best of this day ☀️")}</h2>}

        {isLoggedIn ? (
          <>
            <h3 style={{ fontWeight: '500', marginTop: '20px' }}>{t("My habits")}</h3>
            <hr style={{ border: 'none', borderTop: '8px dotted #3EC3CE', color: '#fff', backgroundColor: 'none', height: '1px', width: '100%', marginLeft: '0px', paddingBottom: '40px', position: 'relative' }} />
            {habits.length === 0 ? (
              <p>{t("No habits yet, go ahead and add some!")}</p>
            ) : (
              habits.map((habit, index) => (
                <div
                  key={habit._id}
                  style={getHabitBackgroundStyle(index)}
                >
                  <div style={{ borderRadius: '20px', paddingLeft: '20px' }}>
                    <div style={{ flex: '1', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      <p>{habit.habit}</p>
                    </div>
                    {finishedComponent(habit)}
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', paddingRight: '20px', marginTop: '-40px' }}>
                      <button style={{ backgroundColor: 'transparent', border: 'none', padding: 'none', cursor: 'pointer' }} onClick={() => deleteHabitById(habit._id)}>
                        <img src="./trashcan.png" alt="delete" style={{ width: '20px' }} />
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
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '70vh', textAlign: 'center' }}>
            <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
              <div id="login-lottie-container" className="login-lottie-animation"></div>
              <h2 style={{ color: '#3EC3CE', fontSize: '30px', marginBottom: '10px' }}>{t("Oops! You need to be logged in.")}</h2>
              <p style={{ color: '#555', fontSize: '16px', lineHeight: '1.6' }}>
                {t("Access to My Page is exclusive to our members. Please")}
                <Link to="/" style={{ textDecoration: 'none', fontWeight: 'bold' }}>{t("log in")}</Link>
                {t("or")}
                <Link to="/" style={{ textDecoration: 'none', fontWeight: 'bold' }}>{t("sign up")}</Link>
                {t("to manage your personal content and enjoy all the benefits of being a member.")}
              </p>
              <p style={{ color: '#555', fontSize: '16px', lineHeight: '1.6' }}>
                {t("If you're just looking around, welcome! Feel free to")}
                <Link to="/" style={{ textDecoration: 'none', fontWeight: 'bold' }}>{t("go back to our homepage")}</Link>
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
