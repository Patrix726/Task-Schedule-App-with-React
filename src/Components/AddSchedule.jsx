/* eslint-disable react/prop-types */
import {useState } from "react"

function AddSchedule({onSubmit,wrapperRef}) {
  const [format, setFormat] = useState(false);
  function onSelect() {
    setFormat(format ? false : true);
  }
  function handleChange(e) {
    let value = e.target.value
    if (parseInt(value, 10) < 10) {
        value = '0' + value;
    }
    e.target.value = value
  }
  return (
    <div className="inputSchedule" ref={wrapperRef}>
      <select onChange={onSelect} defaultValue={0} className="formatSelection" name="type">
        <option value={0} >Schedule</option>
        <option value={1}>Task</option>
      </select>
      <input type="text" name="title" id="inputText" required placeholder={`Enter ${format?"task":"schedule"} here` } />
      {format && <input type="date" name="date" id="inputDate"/>}
      {/* {!format && <input type="time" name="time" id="inputTime" />} */}
      
      {!format && (<>
        <input type="number" name="hour" id="inputHour" placeholder="HH" className="inputTime" onChange={handleChange} defaultValue={"00"}/>
        <input type="number" name="minutes" id="inputMinutes" placeholder="MM" className="inputTime" max={59} onChange={handleChange} defaultValue={"00"}/>
        <input type="number" name="seconds" id="inputSeconds" placeholder="SS" className="inputTime" max={59} onChange={handleChange} defaultValue={"00"}/>
      </>
      )}
      <button type="submit" id="submit-btn" onClick={onSubmit}>+</button>
      
    </div>
  )
}

export default AddSchedule