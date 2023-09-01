import React from 'react';

const changeActive = (e) => {
  let ex = document.getElementById("active-nav");
    if (ex) {
      ex.id = "";
    }
    e.id = "active-nav";
}

function Home() {
  document.title = "Home";

  setTimeout(() => {
    let elements = document.getElementsByClassName("nav-link");
    for (let x of elements) {
      if (x.textContent == "Home") {
        changeActive(x);
        break;
      }
    } 
  },200);
  return (
    <div>
      {/* <h1>Home Page</h1> */}
    </div>
  );
}

export default Home;