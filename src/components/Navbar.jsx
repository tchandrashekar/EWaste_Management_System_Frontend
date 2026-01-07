/*
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          ♻️ E-Waste Manager
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#nav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav ms-auto">

            {token && role === "USER" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/user">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/user/create">Create Request</Link>
                </li>
              </>
            )}

            {token && role === "ADMIN" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/requests">Requests</Link>
                </li>
              </>
            )}

            {token && role === "PICKUP" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/pickup">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/pickup/my-pickups">My Pickups</Link>
                </li>
              </>
            )}

            {token ? (
              <li className="nav-item">
                <button className="btn btn-danger btn-sm ms-3" onClick={logout}>
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
*/
/*
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          ♻️ E-Waste Manager
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#nav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav ms-auto align-items-lg-center">

            {token && role === "USER" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/user">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/user/create-request">Create Request</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/user/my-requests">My Requests</Link>
                </li>
              </>
            )}

            {token && role === "ADMIN" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/requests">All Requests</Link>
                </li>
              </>
            )}

            {token && role === "PICKUP" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/pickup">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/pickup/my-pickups">My Pickups</Link>
                </li>
              </>
            )}

            {token ? (
              <>
                <li className="nav-item ms-lg-3">
                  <span className="badge bg-secondary me-2">
                    {role}
                  </span>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
*/

import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow fixed-top" style={{ padding: "12px 0" }}>
      <div className="container-fluid px-4">

        {/* Brand */}
        <Link className="navbar-brand fw-bold" to="/">
          ♻️ E-Waste Managment
        </Link>

        {/* Toggle button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar content */}
        <div className="collapse navbar-collapse justify-content-between" id="navbarContent"  style={{ paddingTop: "8px", paddingBottom: "8px" }}>

          {/* LEFT SIDE LINKS */}
          <div className="navbar-nav me-auto">

            {token && role === "USER" && (
              <>
                <Link className="nav-link" to="/user">Dashboard</Link>
                <Link className="nav-link" to="/user/create-request">Create Request</Link>
                <Link className="nav-link" to="/user/my-requests">My Requests</Link>
              </>
            )}

            {token && role === "ADMIN" && (
              <>
                <Link className="nav-link" to="/admin">Dashboard</Link>
                <Link className="nav-link" to="/admin/requests">Requests</Link>
                 <Link className="nav-link" to="/admin/add-pickup">Add Pickup Person</Link>
              </>
            )}

            {token && role === "PICKUP" && (
              <>
                <Link className="nav-link" to="/pickup">Dashboard</Link>
                <Link className="nav-link" to="/pickup/my-pickups">My Pickups</Link>
              </>
            )}

          </div>

          {/* RIGHT SIDE ACTIONS */}
          <div className="d-flex align-items-center">

            {token && (
              <span className="badge bg-secondary me-3">
                {role}
              </span>
            )}

            {token ? (
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={logout}
              >
                Logout
              </button>
            ) : (
              <>
                <Link className="btn btn-outline-light btn-sm me-2" to="/">
                  Login
                </Link>
                <Link className="btn btn-success btn-sm" to="/register">
                  Register
                </Link>
              </>
            )}

          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
