/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";
import schedule from "../assets/schedule.png";
import todo from "../assets/todo.png";
import clock from "../assets/clock.png";

const Nav = ({ setCurrentView }) => {
  const [expand, setExpand] = useState(getValue());
  const [addGroup, setAddGroup] = useState(false);
  const addGroupRef = useRef();
  useEffect(() => {
    function handleClickOutside(event) {
      if (addGroupRef.current && !addGroupRef.current.contains(event.target)) {
        setAddGroup(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [addGroupRef]);
  function getValue() {
    const val = JSON.parse(localStorage.getItem("nav"));
    return val === null ? true : val;
  }
  useEffect(() => {
    localStorage.setItem("nav", JSON.stringify(expand));
  }, [expand]);
  return (
    <>
      <nav className={expand ? "nav open" : "nav"}>
        <button
          className="navbtn expand"
          id="hamburger"
          onClick={() => {
            setExpand(!expand);
          }}
        >
          <svg
            className="hb"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 10 10"
            stroke="#fff"
            strokeWidth=".6"
            fill="rgba(0,0,0,0)"
            strokeLinecap="round"
          >
            {expand ? (
              <path d="M3,3L5,5L7,3M5,5L5,5M3,7L5,5L7,7">
                <animate
                  dur="0.2s"
                  attributeName="d"
                  values="M3,3L5,5L7,3M5,5L5,5M3,7L5,5L7,7;M2,3L5,3L8,3M2,5L8,5M2,7L5,7L8,7"
                  fill="freeze"
                  begin="reverse.begin"
                />
                <animate
                  dur="0.2s"
                  attributeName="d"
                  values="M2,3L5,3L8,3M2,5L8,5M2,7L5,7L8,7;M3,3L5,5L7,3M5,5L5,5M3,7L5,5L7,7"
                  fill="freeze"
                  begin="start.begin"
                />
              </path>
            ) : (
              <path d="M2,3L5,3L8,3M2,5L8,5M2,7L5,7L8,7">
                <animate
                  dur="0.2s"
                  attributeName="d"
                  values="M2,3L5,3L8,3M2,5L8,5M2,7L5,7L8,7;M3,3L5,5L7,3M5,5L5,5M3,7L5,5L7,7"
                  fill="freeze"
                  begin="start.begin"
                />
                <animate
                  dur="0.2s"
                  attributeName="d"
                  values="M3,3L5,5L7,3M5,5L5,5M3,7L5,5L7,7;M2,3L5,3L8,3M2,5L8,5M2,7L5,7L8,7"
                  fill="freeze"
                  begin="reverse.begin"
                />
              </path>
            )}
            <rect width="10" height="10" stroke="none">
              <animate
                dur="2s"
                id="reverse"
                attributeName="width"
                begin="click"
              />
            </rect>
            <rect width="10" height="10" stroke="none">
              <animate
                dur="0.001s"
                id="start"
                attributeName="width"
                values="10;0"
                fill="freeze"
                begin="click"
              />
              <animate
                dur="0.001s"
                attributeName="width"
                values="0;10"
                fill="freeze"
                begin="reverse.begin"
              />
            </rect>
          </svg>
        </button>
        <div className="groups">
          <button
            className={expand ? "navbtn expand" : "navbtn"}
            onClick={() => {
              setCurrentView(0);
            }}
          >
            <img src={clock} alt="clock icon" className="nav-img-icons" />
            {expand && <span>Today's Schedule</span>}
          </button>
          <button
            className={expand ? "navbtn expand" : "navbtn"}
            onClick={() => {
              setCurrentView(1);
            }}
          >
            <img src={schedule} alt="schedule icon" className="nav-img-icons" />
            {expand && <span>All Schedules</span>}
          </button>
          <button
            className={expand ? "navbtn expand" : "navbtn"}
            onClick={() => {
              setCurrentView(2);
            }}
          >
            <img src={todo} alt="todo icon" className="nav-img-icons" />
            {expand && <span>All Tasks</span>}
          </button>
        </div>
        <button
          className="group-add-navbtn"
          id={expand ? "expanded" : "group-add-btn"}
          onClick={() => {
            setAddGroup(true);
          }}
        >
          {expand ? "Add new group" : "+"}
        </button>
      </nav>
      {addGroup && (
        <div className="group-name-input" ref={addGroupRef}>
          <input
            type="text"
            name="title"
            id="group-text-input"
            required
            placeholder="Enter Group Name"
          />
          {/* <input type="image" name="icon" id="icon-input" /> */}
          <button>Add</button>
        </div>
      )}
    </>
  );
};

export default Nav;
