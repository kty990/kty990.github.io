import pjcts, {Project} from '../js/projects.js';
import React, { useState, useEffect } from 'react';

function MyProject() {
  const [loaded, setLoaded] = useState(false);
  const [myProjects, setMyProjects] = useState([]);

  useEffect(() => {
    if (!loaded) {
      console.error("Not loaded... loading...");
      pjcts.load_projects()
        .then(() => {
          const projects = pjcts.GetProjects();
          pjcts.saveData();
          setMyProjects(projects);
          setLoaded(true);
        })
        .catch((e) => {console.log(e)});
    } else {
      console.debug("Reloading...");
      pjcts.loadData();
      const projects = pjcts.GetProjects();
      setMyProjects(projects);
    }
  }, [loaded]);

  return (
    <div>
        {myProjects.map(project => <div>{project.name}</div>)}
    </div>
  );
}


function Projects() {
  return (
    <div id="project-flex">
        <div id="filter">
          <p id="active">All</p>
          <p>Active</p>
          <p>Inactive</p>
        </div>
        <MyProject/>
    </div>
  );
}

export {Projects, MyProject};

let loaded = false;

const load = () => {
  let filters = document.getElementById("filter").querySelectorAll("p");

  let currentFilter = "All";
  function clicked(filter) {
    return (e) => {
      if (e.textContent != currentFilter) {
        filters.forEach((ee) => {
          ee.id = "";
        })
        currentFilter = e.textContent;
        e.id = "active";
      }
    }
  }

  for (let x of filters) {
    x.addEventListener("click", () => {
      clicked(x.textContent);
    })
  }
  filters.forEach((e) => {
    e.addEventListener("click", clicked(e.textContent))
  })
}

window.addEventListener('popstate', function(event) {
  try {
    if (loaded) {
      return;
    }
    load();
    loaded = true;
  } catch(e) {}
})