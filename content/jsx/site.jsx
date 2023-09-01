import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

import Home from './home.jsx';
import About from './about.jsx';
import Projects from './projects.jsx';

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
    // Example "componentStack":
    //   in ComponentThatThrows (created by App)
    //   in ErrorBoundary (created by App)
    //   in div (created by App)
    //   in App
    this.errors.push({error:error, stack:info.componentStack});
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          {this.errors.map(e => <p> {`${e}`} </p>)}
        </div>
      )
    }

    return this.props.children;
  }
}

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