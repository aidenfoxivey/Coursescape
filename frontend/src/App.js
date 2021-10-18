import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// import the components we made
import coursesList from "./components/courses-list";
import courses from "./components/courses";
import addReview from "./components/add-review";
import login from "./components/login";

function App() {
  const [user, setUser] = React.useState(null);

  async function login (user = null) {
    setUser(user);
  }

  async function logout () {
    setUser(null);
  }

  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">
        Coursescape
      </a>
      <div className="navbar-nav mr-auto">
        <li class="nav-item">
          <Link to={"/courses"} className="nav-link">
            Courses
          </Link>
        </li>
        <li>
          {user ? (
            <a
              onClick={logout}
              className="nav-link"
              style={{ cursor: "pointer" }}
            >
              Logout {user.name}
            </a>
          ) : (
            <Link to={"/login"} className="nav-link">
              Login
            </Link>
          )}
        </li>
      </div>
    </nav>

    <div className="container mt-3">
      <Switch>

      </Switch>
    </div>
    </div>
  );
}

export default App;
