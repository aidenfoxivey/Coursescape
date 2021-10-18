import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// import the components we made
import coursesList from "./components/courses-list";
import Course from "./components/courses";
import AddReview from "./components/add-review";
import Login from "./components/login";

function App() {
  const [user, setUser] = React.useState(null);

  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null);
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="/courses">
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
          <Route exact path={["/", "/courses"]} component={coursesList} />
          <Route 
            path="/courses/:id/review"
            render={(props) => (
              <AddReview {...props} user={user} />
            )}
          />
          <Route 
            path="/courses/:id"
            render={(props) => (
              <Course {...props} user={user} />
            )}
          />
          <Route 
            path="/login"
            render={(props) => (
              <Login {...props} login={login} />
            )}
          />
        </Switch> 
    </div>
    </div>
  );
}

export default App;
