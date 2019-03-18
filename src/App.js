import React, { useState, useEffect } from 'react';
import './App.css';
import moment from 'moment';


const App = () => {

  const getMonthName = (id) => ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].filter((month, i) => i === id - 1);
  const getDayName = (id) => ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].filter((day, i) => i === id);

  const [month, setMonth] = useState();
  const [day, setDay] = useState(getDayName(moment().day()));
  const [date, setDate] = useState(moment().date());
  const [year, setYear] = useState(moment().year());
  const [monthOffset, setMonthOffset] = useState(0)
  const [currentDate, setCurrentDate] = useState(`${day} ${month} ${date}, ${year}`);


  const nextMonth = () => setMonthOffset(old => old + 1)
  const prevMonth = () => setMonthOffset(old => old - 1)

  // console.log("rendering");


  useEffect(() => {
    console.log("month offset render")
    let val = moment().month() + monthOffset;
    if(moment().month() + monthOffset > 12) {
      setMonth(getMonthName(0))
      setMonthOffset(-1)
    } else if (moment().month() + monthOffset <= 0) {
      setMonth(getMonthName(11))
      setMonthOffset(12 - moment().month())
    } else {
      setMonth(getMonthName(val))
    }
  }, [monthOffset])

  useEffect(() => {
    console.log("current date render")
    setCurrentDate(`${day} ${month} ${date}, ${year}`)
  }, [month, day, date, year])

  return (
    <div className="App">
      <div className="calendar">
        <button style={{marginRight: "20px"}} onClick={prevMonth}>{"<"}</button>
        <span className="calendar-block">{currentDate}</span>
        <button style={{marginLeft: "20px"}} onClick={nextMonth}>{">"}</button>
      </div>
    </div>
  );
}

export default App;
