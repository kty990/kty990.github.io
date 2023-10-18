import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

import Home from './home.jsx';
import About from './about.jsx';
import { MyProject, Projects } from './projects.jsx';
import Timesheet from './timesheet.jsx';

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
    this.errors.push({ error: error, stack: info.componentStack });
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
    window.addEventListener('popstate', () => {
      console.log(`Now on ${window.location.href}`);
    });
  }

  render() {
    return (
      <BrowserRouter>
        <ErrorBoundary>
          <div className="navbar">
            <img src="../images/favicon.png" className="nav-icon" />
            <Link to="/content/pages/home" className="nav-link" onClick={changeActive}>Home</Link>
            <Link to="/content/pages/about" className="nav-link" onClick={changeActive}>About</Link>
            <Link to="/content/pages/projects" className="nav-link" onClick={changeActive}>Projects</Link>
            <Link to="/content/pages/timesheet" className="nav-link" onClick={changeActive}>Timesheet</Link>
            <Link to="/content/pages/stories" className="nav-link" onClick={changeActive}>Stories</Link>
          </div>
        </ErrorBoundary>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/content/pages/home" element={<Home />} />
          <Route path="/content/pages/about" element={<About />} />
          <Route path="/content/pages/projects" element={<Projects />} />
          <Route path="/content/pages/timesheet" element={<Timesheet />} />
        </Routes>
      </BrowserRouter>
    );
  }
}
const root = createRoot(document.getElementById('root'));
root.render(<App />);

if (document.body.innerHTML.indexOf(`<script src="../dist/site_bundle.js"></script>`) == -1) {
  document.body.innerHTML = document.body.innerHTML + `<script src="../dist/site_bundle.js"></script>`;
}