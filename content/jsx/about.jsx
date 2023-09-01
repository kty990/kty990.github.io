import React from 'react';
1
const changeActive = (e) => {
  let ex = document.getElementById("active-nav");
    if (ex) {
      ex.id = "";
    }
    e.id = "active-nav";
}

function About() {
  document.title = "About";

  setTimeout(() => {
    let elements = document.getElementsByClassName("nav-link");
    for (let x of elements) {
      if (x.textContent == "About") {
        changeActive(x);
        break;
      }
    } 
  },200);
  return (
    <div>
      {/* <h1>About Me</h1> */}
    </div>
  );
}

export default About;