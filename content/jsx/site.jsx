import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

import Home from './home.jsx';
import About from './about.jsx';
import Projects from './projects.jsx';

function App() {
  return (
    <BrowserRouter>
      <div className="navbar">
        <Link to="/content/pages/home" className="nav-link">Home</Link>
        <Link to="/content/pages/about" className="nav-link">About</Link>
        <Link to="/content/pages/projects" className="nav-link">Projects</Link>
      </div>

      <Routes>
        <Route path="/content/pages/home" element={<Home />} />
        <Route path="/content/pages/about" element={<About />} />
        <Route path="/content/pages/projects" element={<Projects />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));