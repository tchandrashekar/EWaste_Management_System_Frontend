/*
import {Link } from "react-router-dom"

function UserDashboard(){
     return (
    <div className="container mt-4">
      <h2>Welcome User 👋</h2>
      <hr />

      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card shadow p-3">
            <h5>Create E-Waste Request</h5>
            <p>Request a pickup for your electronic waste</p>
            <Link to="/user/create-request" className="btn btn-success">
              Create Request
            </Link>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow p-3">
            <h5>My Requests</h5>
            <p>View status of your pickup requests</p>
            <Link to="/user/my-requests" className="btn btn-primary">
              View Requests
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UserDashboard;
*/

import { Link } from "react-router-dom";

function UserDashboard() {
  return (
    <div className="container mt-5">
      {/* Header */}
      <div className="mb-4">
        <h2 className="fw-bold">Welcome 👋</h2>
        <p className="text-muted">
          Manage your e-waste requests and track pickup status
        </p>
        <hr />
      </div>

      {/* Cards */}
      <div className="row g-4">
        {/* Create Request */}
        <div className="col-md-6">
          <div className="card shadow-sm h-100 border-0 dashboard-card">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="icon-box bg-success text-white me-3">
                  ♻️
                </div>
                <h5 className="mb-0 fw-semibold">
                  Create E-Waste Request
                </h5>
              </div>

              <p className="text-muted">
                Request a pickup for your electronic waste items quickly
                and responsibly.
              </p>

              <Link
                to="/user/create-request"
                className="btn btn-success px-4"
              >
                Create Request
              </Link>
            </div>
          </div>
        </div>

        {/* My Requests */}
        <div className="col-md-6">
          <div className="card shadow-sm h-100 border-0 dashboard-card">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="icon-box bg-primary text-white me-3">
                  📦
                </div>
                <h5 className="mb-0 fw-semibold">
                  My Requests
                </h5>
              </div>

              <p className="text-muted">
                View your submitted requests, pickup status,
                and assigned staff details.
              </p>

              <Link
                to="/user/my-requests"
                className="btn btn-primary px-4"
              >
                View Requests
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
