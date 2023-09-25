import React from 'react';
import {main} from '../js/widgets.js';

function Timesheet() {
  document.title = "Timesheet";
  const doLater = async () => {
    setTimeout(() => {
      main();
    },500);
  }
  doLater();
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