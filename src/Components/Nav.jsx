/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";
import schedule from "../assets/schedule.png";
import todo from "../assets/todo.png";
import clock from "../assets/clock.png";
import closeSvg from "../assets/close.svg";
import expandSvg from "../assets/expand.svg";
import AddGroup from "./AddGroup";

const Nav = ({ setCurrentView, setData, groups }) => {
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

  useEffect(() => {
    localStorage.setItem("nav", JSON.stringify(expand));
  }, [expand]);

  function addNewGroup() {
    const children = [...addGroupRef.current.childNodes];
    const newGroup = {};
    newGroup.title = children[0].value;
    setData((prev) => {
      return { ...prev, groups: [...prev.groups, newGroup] };
    });
    setAddGroup(false);
  }

  function getValue() {
    const val = JSON.parse(localStorage.getItem("nav"));
    return val === null ? true : val;
  }
  const allGroups =
    groups &&
    groups.map((group, ind) => {
      return (
        <button
          className={expand ? "navbtn expand" : "navbtn"}
          onClick={() => {
            setCurrentView(3 + ind);
          }}
          key={ind}
        >
          {/* <img src={clock} alt="clock icon" className="nav-img-icons" /> */}
          {expand && <span>{group.title}</span>}
        </button>
      );
    });
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
        <div className="categories">
          <button
            className={expand ? "navbtn expand" : "navbtn"}
            onClick={() => {
              setCurrentView(0);
            }}
          >
            <img
              src={clock}
              alt="clock icon"
              className={expand ? "nav-img-icons expand" : "nav-img-icons"}
            />
            {expand && <span>Today's Schedule</span>}
          </button>
          <button
            className={expand ? "navbtn expand" : "navbtn"}
            onClick={() => {
              setCurrentView(1);
            }}
          >
            <img
              src={schedule}
              alt="schedule icon"
              className={expand ? "nav-img-icons expand" : "nav-img-icons"}
            />
            {expand && <span>All Schedules</span>}
          </button>
          <button
            className={expand ? "navbtn expand" : "navbtn"}
            onClick={() => {
              setCurrentView(2);
            }}
          >
            <img
              src={todo}
              alt="todo icon"
              className={expand ? "nav-img-icons expand" : "nav-img-icons"}
            />
            {expand && <span>All Tasks</span>}
          </button>
        </div>
        <div className="groups">{allGroups}</div>
        <button
          className={expand ? "group-add-navbtn expanded" : "group-add-navbtn"}
          onClick={() => {
            setAddGroup(true);
          }}
        >
          {expand ? "Add new group" : "+"}
        </button>
      </nav>
      {addGroup && <AddGroup addGroupRef={addGroupRef} onClick={addNewGroup} />}
    </>
  );
};

export default Nav;
