/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import trashCan from "../assets/trash - RED.ico";

const Task = (props) => {
  const [expand, setExpand] = useState(false);
  const [check, setCheck] = useState(
    JSON.parse(localStorage.getItem(props.title)) || false
  );
  useEffect(() => {
    localStorage.setItem(props.title, JSON.stringify(check));
  }, [check, props.title]);
  return (
    <div className={check ? "task checked" : "task"} id={props.id}>
      <div className="title-container">
        <input
          type="checkbox"
          name="todo"
          id="todo-check"
          onChange={() => setCheck((prev) => !prev)}
          checked={check}
        />
        <span
          className={check ? "title checked" : "title"}
          onClick={() => setExpand((prev) => !prev)}
        >
          {props.title}
        </span>
        <span className="deadline">{props.deadline.toString()}</span>
      </div>
      {expand && (
        <div className="detail">
          <span>{props.detail}</span>
          <button className="removebtn" onClick={props.removeItem}>
            <img src={trashCan} alt="Remove" className="trash-can" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Task;
