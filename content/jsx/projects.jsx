import pjcts, {Project} from '../js/projects.js';
import React, { useState, useEffect } from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    console.log(error);
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong obtaining the project information.</div>;
    }

    return this.props.children;
  }
}

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
        .catch(() => {});
    } else {
      console.debug("Reloading...");
      pjcts.loadData();
      const projects = pjcts.GetProjects();
      setMyProjects(projects);
    }
  }, [loaded]);

  return (
    <ErrorBoundary>
      <div>
        {myProjects.map(project => (
          <div>{project.name}</div>
        ))}
      </div>
    </ErrorBoundary>
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

export {Projects, Project};