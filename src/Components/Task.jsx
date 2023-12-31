/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import trashCan from "../assets/trash - RED.ico";
import { calcTimeDelta } from "react-countdown";

const Task = (props) => {
  const [expand, setExpand] = useState(false);

  function toggleCheck() {
    props.setData((prev) => {
      let prevTasks = [...prev.tasks];
      const clickedTask = prevTasks[props.id];
      clickedTask.isCompleted = !props.checked;
      prevTasks[props.id] = clickedTask;
      return { ...prev, tasks: prevTasks };
    });
  }

  const difference = calcTimeDelta(props.deadline);

  return (
    <div className={props.checked ? "task checked" : "task"} id={props.id}>
      <div className="title-container">
        <input
          type="checkbox"
          name="todo"
          id="todo-check"
          // onChange={() => setCheck((prev) => !prev)}
          // checked={check}
          onChange={() => toggleCheck()}
        />
        <span
          className={props.checked ? "title checked" : "title"}
          onClick={() => setExpand((prev) => !prev)}
        >
          {props.title}
        </span>
        <span className="deadline">
          {difference.completed
            ? "Time's up!"
            : difference.days
            ? `${difference.days} Days`
            : `< ${difference.days} Days`}
        </span>
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
