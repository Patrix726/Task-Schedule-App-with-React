/* eslint-disable react/no-unescaped-entities */
import { useEffect, useRef, useState } from "react";
import "./App.css";
import Schedule from "./Components/Schedule";
import AddSchedule from "./Components/AddSchedule";
import Task from "./Components/Task";
import Nav from "./Components/Nav";

function App() {
  const [input, setInput] = useState(false);
  const [schedules, setSchedules] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [currentView, setCurrentView] = useState(0);
  const [data, setData] = useState({});
  const wrapperRef = useRef();
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setInput(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  useEffect(() => {
    if (currentView === 0) {
      setData({ schedules: schedules, tasks: tasks });
    } else if (currentView === 1) {
      setData({ schedules: schedules, tasks: [] });
    } else if (currentView === 2) {
      setData({ schedules: [], tasks: tasks });
    }
  }, [currentView]);

  useEffect(() => {
    setData({ schedules: schedules, tasks: tasks });
  }, [schedules, tasks]);

  const date = new Date();
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  function onSubmit(repeatData) {
    console.log(repeatData);
    const data = [...wrapperRef.current.childNodes];
    let modData = {};
    modData.repeatData = repeatData;
    data.forEach((val) => {
      if (val.type !== "submit") {
        if (val.value === "") {
          modData.invalid = true;
          val.classList.add("invalid");
        }
        modData[val.name] = val.value;
      }
    });
    if (modData.type === "0") {
      if (
        modData.hour === "00" &&
        modData.minutes === "00" &&
        modData.seconds === "00"
      ) {
        modData.invalid = true;
        data.forEach((item) => {
          if (item.type === "number") {
            item.classList.add("invalid");
          }
        });
      }

      if (!modData.invalid) {
        setSchedules((prev) => [...prev, modData]);
        setInput(false);
      }
    } else if (modData.type === "1") {
      if (!modData.invalid) {
        setTasks((prev) => [...prev, modData]);
        setInput(false);
      }
    }
  }
  function removeItem(event) {
    const component = event.target.parentNode.parentNode;
    if (component.className === "schedule") {
      setSchedules((prev) => {
        const filtered = prev.filter(
          (item, ind) => ind !== parseInt(component.id)
        );
        return filtered;
      });
    } else {
      setTasks((prev) => {
        const filtered = prev.filter(
          (item, ind) => ind !== parseInt(component.id)
        );
        console.log(filtered);
        return filtered;
      });
    }
  }
  const schedulesData =
    data.schedules &&
    data.schedules.map((val, ind) => {
      const hour = parseInt(val.hour);
      const min = parseInt(val.minutes);
      let sec = parseInt(val.seconds);
      sec += min * 60 + hour * 3600;

      return (
        <Schedule
          key={ind}
          id={ind}
          title={val.title}
          detail=""
          date={1000 * sec}
          deadline={Date.now() + val.time}
          type={val.type}
          removeItem={removeItem}
        />
      );
    });

  const tasksData =
    data.tasks &&
    data.tasks.map((val, ind) => {
      const [year, month, day] = val.date.split("-");
      const deadline = new Date(year, month, day);
      return (
        <Task
          key={ind}
          id={ind}
          title={val.title}
          deadline={deadline.toLocaleDateString()}
          removeItem={removeItem}
        />
      );
    });
  return (
    <>
      <Nav setCurrentView={setCurrentView} />
      <div className="header">
        <div className="title-date">
          <span>Today's Schedule</span>
          <br />
          <span className="date-value">{`${
            weekday[date.getDay()]
          } ${date.getDate()}`}</span>
        </div>
        <button
          className="addbtn"
          onClick={() => {
            setInput(true);
          }}
        >
          <svg
            width="101"
            height="104"
            viewBox="0 0 101 104"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_d_2_283)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M27.4983 22.1311C39.0023 9.86006 54.4251 7.3769 64.2787 16.4726C74.1324 25.5682 74.6559 50.6718 64.2787 61.7408C53.9015 72.8099 29.984 69.2586 21.8397 61.7408C13.6954 54.223 15.9942 34.4021 27.4983 22.1311Z"
                fill="#F8D57E"
              />
              <path
                d="M44.4738 33.4482V47.5945"
                stroke="white"
                strokeWidth="2.9"
                strokeLinecap="round"
              />
              <path
                d="M37.4006 40.5213H51.547"
                stroke="white"
                strokeWidth="2.9"
                strokeLinecap="round"
              />
            </g>
            <defs>
              <filter
                id="filter0_d_2_283"
                x="0"
                y="0"
                width="100.867"
                height="103.773"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dx="6" dy="12" />
                <feGaussianBlur stdDeviation="11.5" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.972549 0 0 0 0 0.835294 0 0 0 0 0.494118 0 0 0 0.244619 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_2_283"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_2_283"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        </button>
      </div>
      <div className="schedules">{schedulesData}</div>
      <div className="tasks">{tasksData}</div>
      {input && <AddSchedule onSubmit={onSubmit} wrapperRef={wrapperRef} />}
    </>
  );
}

export default App;
