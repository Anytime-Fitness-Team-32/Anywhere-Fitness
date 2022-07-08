import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//Building Header Component
export default function Header() {
  const [loggedIn, setLoggedIn] = useState(false);
  const checkForLogin = () => {
    if (window.localStorage.getItem("token")) {
      setLoggedIn(true);
      return;
    } else {
      setLoggedIn(false);
      return;
    }
  };

  useEffect(() => checkForLogin(), []);

  return (
    <div className="header">
      <div className="title">
        <h1>Anywhere Fitness 💪</h1>
      </div>
      {loggedIn ? (
        <div>
          <button>Sign Out</button>
        </div>
      ) : (
        <div className="sectionalbuttons">
          <div className="formbuttons">
            <div className="login-button">
              <Link to="/login">
                <button>Login</button>
              </Link>
            </div>
            <div className="signup-button">
              <Link to="/signup">
                <button>Sign-Up</button>
              </Link>
              {}
            </div>
          </div>
          <div className="sectionalhomebuttons">
            <div className="home-button">
              <Link to="/">
                <button>Home</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
