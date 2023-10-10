import React from 'react';
// import {m} from '../js/main';
import {main} from '../widgets/widgets.js';

const updateEvent = new CustomEvent('update', {
  bubbles: true,
  cancelable: false,
  detail: {
    data: ''
  }
})

const taskEvent = new CustomEvent('taskUpdate', {
  bubbles: true,
  cancelable: false,
  detail: {
    data: '',
    target: null
  }
})

function Timesheet() {
  document.title = "Timesheet";
  main();
  const updateMonth = (c) => {
    return () => {
      updateEvent.detail.data = `${c}`;
      document.body.dispatchEvent(updateEvent);
    }
  }
  const taskUpdate = (action) => {
    return () => {
      taskEvent.detail.data = `${action}`;
      document.body.dispatchEvent(taskEvent);
    }
  }
  /*
  <div style="
    position:  fixed;
    left: 600px;
    top: 550px;
">
        <p>Syntax: <em>{month abrv.} {date}: {start}-{end}</em><br><br>Example: Oct 8: 6:30-1:00</p>
    </div>
  */
  return (
    <div id="timesheet-widget">
        <div id="cal_btns">
            <div id="prev_month" onClick={updateMonth(-1)}>
                <p>
                  {'←'}
                </p>
            </div>
            <div id="next_month" onClick={updateMonth(1)}>
                <p>
                  {'→'}
                </p>
            </div>
        </div>
        <div id="calendar">
          <h1 id="cal-title">month.title</h1>
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
              {/* Where the loaded days are displayed */}
            </div>
        </div>
        <p id="time">0:00:00</p>
        <div id="list">
            
            <div id="taskbar">
              <p id='taskbar-icon'>☰</p>
              <p className='taskbar-action' onClick={taskUpdate('add')}>+</p>
              <p className='taskbar-action' onClick={taskUpdate('remove')}>X</p>
            </div>
        </div>
        <img src="../images/c_p.png" alt="Copy" />
      </div>
  );
}

export default Timesheet;