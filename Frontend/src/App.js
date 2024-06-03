import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import BookApp from './Home';
// import Login from './login'; // Ensure uppercase 'Login'
// import Signup from './signup';
// import Music from './music'; // Ensure uppercase 'Signup'

function App() {
  return (
    <div className="App">
     
      <main>
        <Routes>
          {/* <Route path="/login" element={<Login />} />
          <Route path="/music" element={<Music />} /> 
          <Route path="/signup" element={<Signup />} /> */}
          <Route path="/" element={<BookApp />} /> 
        </Routes>
      </main>
    </div>
  );
}

function Root() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default Root;
