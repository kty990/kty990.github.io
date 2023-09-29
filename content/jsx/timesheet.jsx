import React from 'react';
import {main} from '../widgets/widgets.js';

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
            {/* TO BE COMPLETED AT ANOTHER DATE */}
            <div style={{width: '450px',height: '350px',display: 'flex',backgroundColor: '#fff',flexDirection: 'column',marginLeft: '5px'}}> {/* This is the list box */}
              <div style={{width: '100%',height: '20px',display: 'flex',backgroundColor: '#000',flexDirection: 'column'}}>List element</div> {/* This is a 'list element' */}
            </div>
        </div>
    </div>
  );
}

export default Timesheet;