/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";
import schedule from "../assets/schedule.png";
import todo from "../assets/todo.png";
import clock from "../assets/clock.png";
import closeSvg from "../assets/close.svg";
import expandSvg from "../assets/expand.svg";

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
          <img src={expand ? expandSvg : closeSvg} alt="hamburger" />
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
