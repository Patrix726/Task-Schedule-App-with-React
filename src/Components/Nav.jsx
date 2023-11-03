/* eslint-disable react/prop-types */
import { useState } from "react";

const Nav = ({ setCurrentView }) => {
  const [expand, setExpand] = useState(true);
  return (
    <nav className="nav">
      {expand ? (
        <>
          <button
            className="navbtn"
            id="hamburger"
            onClick={() => {
              setExpand((prev) => !prev);
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
              T
            </button>
            <button
              className="navbtn"
              onClick={() => {
                setCurrentView(1);
              }}
            >
              S
            </button>
            <button
              className="navbtn"
              onClick={() => {
                setCurrentView(2);
              }}
            >
              T
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
              setExpand((prev) => !prev);
            }}
          >
            Toggle
          </button>
          <div className="groups">
            <button
              className="navbtn"
              onClick={() => {
                setCurrentView(0);
              }}
            >
              Today
            </button>
            <button
              className="navbtn"
              onClick={() => {
                setCurrentView(1);
              }}
            >
              Schedules
            </button>
            <button
              className="navbtn"
              onClick={() => {
                setCurrentView(2);
              }}
            >
              Tasks
            </button>
          </div>
          <button className="navbtn">Add Group</button>
        </>
      )}
    </nav>
  );
};

export default Nav;
