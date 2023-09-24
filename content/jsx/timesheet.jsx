import React from 'react';

const changeActive = (e) => {
  let ex = document.getElementById("active-nav");
    if (ex) {
      ex.id = "";
    }
    e.id = "active-nav";
}

function Timesheet() {
  document.title = "Timesheet";
  return (
    <div id="timesheet-widget">
        <div id="calendar">
            <div id="days">
                <p>SUN</p>
                <p>MON</p>
                <p>TUES</p>
                <p>WED</p>
                <p>THURS</p>
                <p>FRI</p>
                <p>SAT</p>
            </div>
            <div id="display">

            </div>
        </div>
        <div id="list">
            <p id="time">0:00:00</p>
            {/* List view */}
        </div>
        <div>
            <textarea id="timesheet-input"></textarea>
        </div>
    </div>
  );
}

export default Timesheet;