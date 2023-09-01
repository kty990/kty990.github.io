import pjcts, {Project, GetColorFromLang} from '../js/projects.js';
import React, { useState, useEffect } from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
    this.errors = [];
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    this.errors.push({error:error, stack:info.componentStack});
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <p>Something went wrong.</p>
          {this.errors.map(e => <p> {`${e}`} </p>)}
        </div>
      )
    }

    return this.props.children;
  }
}

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


  console.log(projs);
  return (
    <div>
      {loaded ? (
        projs.map((project) => (
          <div key={project.name} className="project">
            <p>{project.name}</p>
            <ErrorBoundary>
              <div style={{display:"flex",flexDirection:"row",width:"calc(100% - 0.2vw)"}}>
              {Object.entries(project.properties) !== undefined ? (
                Object.entries(project.properties).map(([key, value]) => {
                  return (
                    <div style={{ backgroundColor: `${GetColorFromLang(key.toUpperCase())}`, textAlign:"center", width: `calc(${Math.floor(value*10000)/100}%)`, height: "100%", fontSize: "1vh"}}>
                      {key.toUpperCase().replace("JAVASCRIPT","JS")}{'\n'}({Math.floor(value*10000)/100}%)
                    </div>
                  );
                })
              ) : (
                <p>Something went wrong...</p>
              )}

              </div>
            </ErrorBoundary>
          </div>
        ))
      ) : (
        <div style={{color:"#fff",position:"relative",left:"2vw",top:"2vh",fontFamily:"Montserrat",fontWeight:"bold"}}>Loading...</div>
      )}
    </div>
  );
}

const changeActive = (e) => {
  let ex = document.getElementById("active-nav");
    if (ex) {
      ex.id = "";
    }
    e.id = "active-nav";
}


function Projects() {
  document.title = "View Projects";
  setTimeout(() => {
    let elements = document.getElementsByClassName("nav-link");
    for (let x of elements) {
      if (x.textContent == "Projects") {
        changeActive(x);
        break;
      }
    } 
  },200);

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