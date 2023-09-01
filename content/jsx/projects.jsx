import pjcts, {Project} from '../js/projects.js';
import React, { useState, useEffect } from 'react';

function MyProject() {
  const [loaded, setLoaded] = useState('load');
  const [myProjects, setMyProjects] = useState('projs');

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
        {myProjects.map(project => <div key={project.name} className="project">{project.name}</div>)}
    </div>
  );
}


function Projects() {
  document.title = "View Projects";

  let currentFilter = "All";
  function clicked(filter) {
    try {
      let filters = document.getElementById("filter").children;
      return (e) => {
        if (filter != currentFilter) {
          filters.forEach((ee) => {
            ee.id = "";
          })
          currentFilter = filter;
          e.id = "active";
        } else {
          console.warn(`${currentFilter}\t${filter}`);
        }
      }
    } catch (err) {
        return (e) => {
          e.id = "active";
        } 
    }
  }

  return (
    <div id="project-flex">
        <div id="filter">
          <p id="active" onClick={clicked("All")}>All</p>
          <p onClick={clicked("Active")}>Active</p>
          <p onClick={clicked("Inactive")}>Inactive</p>
        </div>
        <MyProject/>
    </div>
  );
}

export {Projects, MyProject};