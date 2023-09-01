import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

import Home from './home.jsx';
import About from './about.jsx';
import Projects from './projects.jsx';

// class ErrorBoundary extends React.Component {
//   constructor(props,msg) {
//     super(props);
//     this.msg = msg;
//     this.state = { hasError: false };
//   }

//   static getDerivedStateFromError(error) {
//     console.log(error);
//     return { hasError: true };
//   }

//   render() {
//     if (this.state.hasError) {
//       return <div>Something went wrong. {this.msg}</div>;
//     }

//     return this.props.children;
//   }
// }

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
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
}
const root = createRoot(document.getElementById('root')); 
root.render(<App />);