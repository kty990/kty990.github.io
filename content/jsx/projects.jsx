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
        {/* {myProjects.map(project => <div>{project.name}</div>)} */}
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