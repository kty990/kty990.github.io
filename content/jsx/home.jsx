import React from 'react';

const changeActive = (e) => {
  let ex = document.getElementById("active-nav");
    if (ex) {
      ex.id = "";
    }
    e.target.id = "active-nav";
}

function Home() {
  document.title = "Home";
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
      {/* <h1>Home Page</h1> */}
    </div>
  );
}

export default Home;