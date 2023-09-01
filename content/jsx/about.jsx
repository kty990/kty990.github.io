import React from 'react';
1
const changeActive = (e) => {
  let ex = document.getElementById("active-nav");
    if (ex) {
      ex.id = "";
    }
    e.target.id = "active-nav";
}

function About() {
  document.title = "About";
  let cpage = window.location.href.split("/");
  cpage = cpage[window.location.href.length-1];
  let elements = document.getElementsByClassName("nav-link");
  for (let x of elements) {
    if (x.textContent == cpage) {
      changeActive(x);
    }
  }
  return (
    <div>
      {/* <h1>About Me</h1> */}
    </div>
  );
}

export default About;