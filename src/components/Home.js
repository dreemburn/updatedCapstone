import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container">
      <h1>Welcome</h1>
      <Link to="/characters">View all characters</Link>
      <p>Home page</p>
    </div>
  );
};

export default Home;
