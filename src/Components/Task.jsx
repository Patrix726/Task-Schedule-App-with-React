/* eslint-disable react/prop-types */

import { useState } from "react";
import trashCan from "../assets/trash - RED.ico";

const Task = (props) => {
  const [expand, setExpand] = useState(false);

  return (
    <div className="task" id={props.id}>
      <div className="title-container">
        <span className="title" onClick={() => setExpand((prev) => !prev)}>
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
