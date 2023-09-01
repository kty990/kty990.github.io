import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

import Home from './home.jsx';
import About from './about.jsx';
import {MyProject, Projects} from './projects.jsx';

console.log(`Version update: 842`);

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
const changeActive = (e) => {
  let ex = document.getElementById("active-nav");
    if (ex) {
      ex.id = "";
    }
    e.target.id = "active-nav";
}


class App extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
        <BrowserRouter>
            <ErrorBoundary>
              <div className="navbar">
                <Link to="/content/pages/home" className="nav-link" onClick={changeActive}>Home</Link>
                <Link to="/content/pages/about" className="nav-link" onClick={changeActive}>About</Link>
                <Link to="/content/pages/projects" className="nav-link" onClick={changeActive}>Projects</Link>
              </div>
            </ErrorBoundary>
    
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/content/pages/home" element={<Home />} />
              <Route path="/content/pages/about" element={<About />} />
              <Route path="/content/pages/projects" element={<Projects />} />
            </Routes>
        </BrowserRouter>
    );
  }
}
const root = createRoot(document.getElementById('root')); 
root.render(<App />);

let cpage = window.location.href.split("/")[-1];
console.log(cpage);
window.addEventListener('popstate', function(event) {
  cpage = window.location.href.split("/");
  cpage = cpage[window.location.href.length-1];
  let elements = document.getElementsByClassName("nav-link");
  for (let x of elements) {
    if (x.textContent == cpage) {
      changeActive(x);
    }
  }
})