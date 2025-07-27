import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar">
      <h2 className="navbar-title">
  <span role="img" aria-label="list">📝</span> To-Do List
</h2>

      <div className="navbar-links">
        <Link className="nav-link" to='/'>All Tasks</Link>
        <Link className="nav-link" to='/create-task'>Create Task</Link>
      </div>
    </div>
  );
};

export default Navbar;
