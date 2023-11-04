/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import schedule from "../assets/schedule.png";
import todo from "../assets/todo.png";
import clock from "../assets/clock.png";

const Nav = ({ setCurrentView }) => {
  const [expand, setExpand] = useState(getValue());

  function getValue() {
    const val = JSON.parse(localStorage.getItem("nav"));
    return val === null ? true : val;
  }
  useEffect(() => {
    localStorage.setItem("nav", JSON.stringify(expand));
  }, [expand]);
  return (
    <nav className="nav">
      {expand ? (
        <>
          <button
            className="navbtn"
            id="hamburger"
            onClick={() => {
              setExpand(!expand);
            }}
          >
            Tog
          </button>
          <div className="groups">
            <button
              className="navbtn"
              onClick={() => {
                setCurrentView(0);
              }}
            >
              <img src={clock} alt="clock icon" className="nav-img-icons" />
              <span>Today's Schedule</span>
            </button>
            <button
              className="navbtn"
              onClick={() => {
                setCurrentView(1);
              }}
            >
              <img
                src={schedule}
                alt="schedule icon"
                className="nav-img-icons"
              />
              <span>All Schedules</span>
            </button>
            <button
              className="navbtn"
              onClick={() => {
                setCurrentView(2);
              }}
            >
              <img src={todo} alt="todo icon" className="nav-img-icons" />
              <span>All Tasks</span>
            </button>
          </div>
          <button className="navbtn">+</button>
        </>
      ) : (
        <>
          <button
            className="navbtn"
            id="hamburger"
            onClick={() => {
              setExpand(!expand);
            }}
          >
            To
          </button>
          <div className="groups">
            <button
              className="navbtn"
              onClick={() => {
                setCurrentView(0);
              }}
            >
              <img src={clock} alt="clock icon" className="nav-img-icons" />
            </button>
            <button
              className="navbtn"
              onClick={() => {
                setCurrentView(1);
              }}
            >
              <img
                src={schedule}
                alt="schedule icon"
                className="nav-img-icons"
              />
            </button>
            <button
              className="navbtn"
              onClick={() => {
                setCurrentView(2);
              }}
            >
              <img src={todo} alt="todo icon" className="nav-img-icons" />
            </button>
          </div>
          <button className="navbtn">+</button>
        </>
      )}
    </nav>
  );
};

export default Nav;
