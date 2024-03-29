import pjcts, {GetColorFromLang} from '../js/projects.js';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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

function getContrastRatio(color1, color2) {
  // Ensure color inputs are in the format "#RRGGBB" or "rgb(r, g, b)"
  color1 = normalizeColor(color1);
  color2 = normalizeColor(color2);

  // Calculate the relative luminance of the colors
  const luminance1 = calculateRelativeLuminance(color1);
  const luminance2 = calculateRelativeLuminance(color2);

  // Calculate the contrast ratio
  const contrastRatio = (Math.max(luminance1, luminance2) + 0.05) / (Math.min(luminance1, luminance2) + 0.05);

  return contrastRatio;
}

// Helper function to normalize color values
function normalizeColor(color) {
  if (color.startsWith("#")) {
    // Convert "#RRGGBB" format to "rgb(r, g, b)" format
    const hex = color.slice(1);
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return `rgb(${r}, ${g}, ${b})`;
  } else {
    return color;
  }
}

// Helper function to calculate relative luminance
function calculateRelativeLuminance(color) {
  const values = color.match(/\d+/g).map(Number);
  const [r, g, b] = values.map(value => {
    value /= 255;
    return value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

const loadData = (setProjs = () => {}, setLoaded = () => {}) => {
    let data = pjcts.loadData();
    console.log(data);
    let currentDate = new Date();
    if (data.success == true && data.last_save - currentDate.getTime() < (30*60)) {
      setProjs(data.result);
      
      if (data.last_save - currentDate.getTime() < (30*60)) {
        return;
      }
      setLoaded(true);
    } else {
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
    }
    
  };

function MyProject() {
  let debouce = false;

  const [projs, setProjs] = useState([]);
  const [loaded, setLoaded] = useState(false);

  

  useEffect(() => {
    debouce = true;
    loadData(setProjs,setLoaded);
  },[debouce])


  console.log(projs);

  return (
    <div id="project_links">
      {loaded ? (
        projs.map((project) => (
          <Link to={project.link} key={`${project.name}_subkey_Link`} meta={`archived:${project.archived}`}>
            <div key={project.name} className="project">
              <p>{project.name}</p>
              {project.archived ? (
                <div style={{
                width: "6vw",
                height: "3vh",
                position: "relative",
                backgroundColor: "#7d00007d",
                transform: "rotate(22deg)",
                bottom: "50px",
                textAlign: "center",
                left: "87%",
                fontSize: "1.7vh",
                borderRadius:  "10px",
                borderTopLeftRadius: "0",
                borderBottomRightRadius: "0"
                }}>
                Archived
                </div>
              ) : (
                <div></div>
              )}
              <ErrorBoundary>
                <div style={{display:"flex",flexDirection:"row",width:"calc(100% - 0.2vw)"}}>
                {Object.entries(project.properties) !== undefined ? (
                  Object.entries(project.properties).map(([key, value]) => {
                    if (key == "" || isNaN(value)) {
                      return (
                        <div key={`${project.name}_subkey_Div`}></div>
                      )
                    }
                    let color = "";
                    let colors = ["#000000","#7d7d7d","#fffffff"];
                    let ratios = [];
                    for (let c of colors) {
                      ratios.push(getContrastRatio(c,GetColorFromLang(key.toUpperCase())))
                    }
                    const highestValue = Math.max(...ratios);
                    color = colors[ratios.indexOf(highestValue)];
                    return (
                      <div key={`${project.name}_subkey_${value}`} style={{ color:color, backgroundColor: `${GetColorFromLang(key.toUpperCase())}`, textAlign:"center", width: `calc(${Math.floor(value*10000)/100}%)`, height: "100%", fontSize: "1vh"}}>
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
          </Link>
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

  function applyFilter(filter) {
    return (ee) => {
      let entry = document.getElementById("project_links").children;
      let test = document.getElementById("active");
      if (test) {
        test.id = "";
      }
      ee.target.id = "active";
      console.log(filter);
      if (filter == "All") {
        for (let e of entry) {
          console.log(e);
          e.style.display = "block";
        }
      } else if (filter == "Active") {
        for (let e of entry) {
          if (e.getAttribute("meta") == "archived:false") {
            e.style.display = "block";
          } else {
            if (e.id == "filter") continue;
            e.style.display = "none";
          }
        }
      } else {
        for (let e of entry) {
          if (e.getAttribute("meta") == "archived:true") {
            e.style.display = "block";
          } else {
            if (e.id == "filter") continue;
            e.style.display = "none";
          }
        }
      }      
    }
  } 

    document.title = "View Projects";
    loadData();
    setTimeout(() => {
      let elements = document.getElementsByClassName("nav-link");
      for (let x of elements) {
        if (x.textContent == "Projects") {
          changeActive(x);
          break;
        }
      } 
      // setCount(count + 1);
    },200);
    return (
      <div id="project-flex">
        <div id="filter">
          <p id="active" className="filter" onClick={applyFilter("All")}>All</p>
          <p className="filter" onClick={applyFilter("Active")}>Active</p>
          <p className="filter" onClick={applyFilter("Inactive")}>Inactive</p>
        </div>
        <MyProject/>
        <div id="stories">
          <a href="https://www.kutcher.ca/content/pages/stories">Cool Stories</a>
          <p id="descriptor">These are some cool programming related stories.</p>
      </div>
      </div>
    );
}

export {Projects, MyProject};