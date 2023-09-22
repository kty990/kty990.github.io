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
    <div></div>
  );
}

export default Timesheet;