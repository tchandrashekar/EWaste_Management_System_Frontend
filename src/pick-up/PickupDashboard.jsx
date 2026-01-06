

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axiosConfig";

function PickupDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
  });

  useEffect(() => {
    const fetchPickups = async () => {
      try {
        const res = await api.get("/api/pickup/ewaste/my-pickups");
        const pickups = res.data;

        const total = pickups.length;
        const completed = pickups.filter(
          p => p.status === "COMPLETED" || p.status === "PICKED"
        ).length;
        const pending = total - completed;

        setStats({ total, completed, pending });
      } catch (err) {
        console.error("Failed to fetch pickups:", err);
      }
    };
    fetchPickups();
  }, []);

  return (
    <div className="container-fluid" style={{ paddingTop: "80px", paddingBottom: "60px" }}>
      
      {/* Header */}
      <div className="mb-4 text-center">
        <h2 className="fw-bold">Pickup Dashboard 🚚</h2>
        <p className="text-muted">
          Track and manage your assigned e-waste pickups
        </p>
        
      </div>

      {/* Stats Cards */}
      <div className="row g-4 mb-5">
        {/* Total Pickups */}
        <div className="col-12 col-md-4 col-lg-3">
          <div className="card shadow h-100 text-white bg-dark">
            <div className="card-body text-center d-flex flex-column justify-content-center p-4">
              <div className="d-flex justify-content-center align-items-center gap-2 text-nowrap">
                <span className="fs-4">🚚</span>
                <span className="fw-semibold">Total Pickups</span>
              </div>
              <div className="display-5 fw-bold mt-3">{stats.total}</div>
            </div>
          </div>
        </div>

        {/* Completed */}
        <div className="col-12 col-md-4 col-lg-3">
          <div className="card shadow h-100 text-white bg-success">
            <div className="card-body text-center d-flex flex-column justify-content-center p-4">
              <div className="d-flex justify-content-center align-items-center gap-2 text-nowrap">
                <span className="fs-4">✅</span>
                <span className="fw-semibold">Completed</span>
              </div>
              <div className="display-5 fw-bold mt-3">{stats.completed}</div>
            </div>
          </div>
        </div>

        {/* Pending */}
        <div className="col-12 col-md-4 col-lg-3">
          <div className="card shadow h-100 text-white bg-warning">
            <div className="card-body text-center d-flex flex-column justify-content-center p-4">
              <div className="d-flex justify-content-center align-items-center gap-2 text-nowrap">
                <span className="fs-4">⏳</span>
                <span className="fw-semibold">Pending</span>
              </div>
              <div className="display-5 fw-bold mt-3">{stats.pending}</div>
            </div>
          </div>
        </div>

        {/* Placeholder for future stats */}
        <div className="col-12 col-md-4 col-lg-3">
          <div className="card shadow h-100 text-white bg-info">
            <div className="card-body text-center d-flex flex-column justify-content-center p-4">
              <div className="d-flex justify-content-center align-items-center gap-2 text-nowrap">
                <span className="fs-4">📊</span>
                <span className="fw-semibold">Other Stats</span>
              </div>
              <div className="display-5 fw-bold mt-3">0</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Action Card */}
      <div className="row justify-content-center">
        <div className="col-xl-6 col-lg-8 col-md-10">
          <div className="card shadow-lg border-0 p-5 text-center">
            <h4 className="fw-semibold mb-2">My Assigned Pickups</h4>
            <p className="text-muted mb-4">
              View, track, and update the status of your assigned e-waste pickups
            </p>

            <Link to="/pickup/my-pickups" className="btn btn-primary btn-lg px-5">
              View Pickups
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}

export default PickupDashboard;
