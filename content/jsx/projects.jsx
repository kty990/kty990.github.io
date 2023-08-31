import React from 'react';
import pjcts from '../js/projects.js';

function Project() {
  let my_projects = [];
  pjcts.load_projects().then(() => {
    my_projects = pjcts.GetProjects();
  }).catch(()=>{});

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