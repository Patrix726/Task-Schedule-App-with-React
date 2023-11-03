import { useState } from "react";

const Nav = () => {
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
            <button className="navbtn">T</button>
            <button className="navbtn">S</button>
            <button className="navbtn">T</button>
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
            <button className="navbtn">Today</button>
            <button className="navbtn">Schedules</button>
            <button className="navbtn">Tasks</button>
          </div>
          <button className="navbtn">Add Group</button>
        </>
      )}
    </nav>
  );
};

export default Nav;
