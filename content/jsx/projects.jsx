import pjcts, {Project} from '../js/projects.js';
import React, { useState, useEffect } from 'react';

function MyProject() {
  const [projs, setProjs] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const loadData = () => {
    pjcts
      .load_projects()
      .then(() => {
        const loadedProjects = pjcts.GetProjects();
        setProjs(loadedProjects);
        pjcts.saveData();
        setLoaded(true); // Set loaded to true when data is successfully loaded
      })
      .catch((e) => {
        console.log(e);
        setLoaded(false);
      });
  };

  useEffect(() => {
    if (!loaded) {
      console.error("Not loaded... loading...");
      loadData();
    } else {
      console.debug("Reloading...");
      pjcts.loadData();
      const loadedProjects = pjcts.GetProjects();
      setProjs(loadedProjects);
    }
  }, [loaded]);

  return (
    <div>
      {loaded ? (
        projs.map((project) => (
          <div key={project.name} className="project">
            {project.name}
          </div>
        ))
      ) : (
        <div style="color:#fff;position:relative;left:2vw;top:2vh;font-family:Montserrat;font-weight:bold;">Loading...</div>
      )}
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