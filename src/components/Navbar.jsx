

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
