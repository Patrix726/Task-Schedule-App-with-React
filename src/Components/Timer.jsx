/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import Countdown from "react-countdown";

const Timer = (props) => {
  const countdownRef = useRef();
  const [currentTimeIndex, setCurrentTimeIndex] = useState(0);
  function toggleOnClick() {
    if (countdownRef.current.isStopped() || countdownRef.current.isPaused()) {
      countdownRef.current.start();
    } else {
      countdownRef.current.pause();
    }
  }
  function resetTime() {
    setCurrentTimeIndex((prev) => prev + 1);
  }
  const Render = ({ formatted, completed }) => {
    if (completed) {
      return (
        <span className="countdown completed" onDoubleClick={resetTime}>
          Completed
        </span>
      );
    }
    return (
      <button
        className="countdown"
        onClick={toggleOnClick}
        onDoubleClick={resetTime}
      >
        <span>
          {formatted.hours}:{formatted.minutes}:{formatted.seconds}
        </span>
      </button>
    );
  };
  const rendered = (props) => {
    return <Render {...props} />;
  };
  return (
    <>
      <Countdown
        date={Date.now() + props.timer}
        key={currentTimeIndex}
        renderer={rendered}
        ref={countdownRef}
        autoStart={false}
      />
    </>
  );
};

export default Timer;
