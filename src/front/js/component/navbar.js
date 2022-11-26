import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">React-Boilerplate Home</span>
        </Link>
        <div className="ml-auto">
          {!store.token ?
          <Link to="/login">
            <button className="btn btn-primary" style={{ margin: "10px" }}>
              Login
            </button>
          </Link>
          :
          <button onClick={() => actions.logout()} className="btn btn-primary" style={{ margin: "10px" }}>
            Logout
          </button>
          }
          <Link to="/signup">
            <button className="btn btn-primary">Sign Up</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
