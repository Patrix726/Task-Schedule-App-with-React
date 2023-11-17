/* eslint-disable react/prop-types */
import { useState } from "react";
import Timer from "./Timer";

const Schedule = (props) => {
  const [expand, setExpand] = useState(false);
  //TODO: implement drag and drop to reorder schedules and tasks
  return (
    <div className="schedule" id={props.id}>
      <div className="title-container">
        <span className="title" onClick={() => setExpand((prev) => !prev)}>
          {`⏰ ${props.title}`}
        </span>
        <Timer
          timer={props.date}
          deadline={props.deadline}
          playAll={props.playAll}
          playing={props.playing}
          setPlaying={props.setPlaying}
        />
      </div>
      {expand && (
        <div className="detail">
          <span>{props.detail}</span>
          <button className="removebtn" onClick={props.removeItem}>
            Remove
          </button>
        </div>
      )}
    </div>
  );
};

export default Schedule;
