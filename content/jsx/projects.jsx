import React from 'react';
import pjcts from '../js/projects.js';

let loaded = false;
function Project() {
  let my_projects = [];
  if (!loaded) {
    console.error("Not loaded... loading...");
    pjcts.load_projects().then(() => {
      my_projects = pjcts.GetProjects();
      pjcts.saveData();
      loaded = true;
    }).catch(()=>{});
  } else {
    console.debug("Reloading...");
    pjcts.loadData();
    my_projects = pjcts.GetProjects();
  }

  return (
    <div>
      {my_projects}
    </div>
  )
}

function Projects() {
  return (
    <div id="project-flex">
      <div id="filter">
        <p id="active">All</p>
        <p>Active</p>
        <p>Inactive</p>
      </div>
      <Project/>
    </div>
  );
}

export {Projects};