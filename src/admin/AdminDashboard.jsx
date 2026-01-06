

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import { FaUsers, FaClipboardList, FaCheckCircle, FaCalendarAlt, FaTruck, FaTimesCircle, FaFlagCheckered, FaPaperPlane } from "react-icons/fa";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    total: 0,
    SUBMITTED: 0,
    APPROVED: 0,
    SCHEDULED: 0,
    PICKED: 0,
    CANCELLED: 0,
    COMPLETED: 0,
  });

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [requestsRes, usersRes] = await Promise.all([
          api.get("/api/admin/ewaste/all"),
          api.get("/api/admin/users") // users with USER role
        ]);

        const requests = requestsRes.data;

        const countByStatus = (status) =>
          requests.filter((r) => r.status === status).length;

        setStats({
          totalUsers: usersRes.data.length,
          total: requests.length,
          SUBMITTED: countByStatus("SUBMITTED"),
          APPROVED: countByStatus("APPROVED"),
          SCHEDULED: countByStatus("SCHEDULED"),
          PICKED: countByStatus("PICKED"),
          CANCELLED: countByStatus("CANCELLED"),
          COMPLETED: countByStatus("COMPLETED"),
        });
      } catch (err) {
        console.error("Failed to load dashboard data");
      }
    };

    loadDashboardData();
  }, []);

  const StatCard = ({ title, value, color, icon }) => (
    <div className="col-xl-3 col-lg-4 col-md-6">
      <div className={`card text-white bg-${color} shadow-sm h-100`}>
        <div className="card-body text-center">
          <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{icon}</div>
          <h6 className="fw-semibold mb-1">{title}</h6>
          <h2 className="fw-bold">{value}</h2>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container-fluid mt-5 pt-5 pb-5 px-5">

      {/* Header */}
      <div className="mb-4 text-center">
        <h2 className="fw-bold">Admin Dashboard 🛠️</h2>
        <p className="text-muted">
          Monitor users, requests, and e-waste pickup lifecycle
        </p>
        <hr className="mx-auto" style={{ maxWidth: "600px" }} />
      </div>

      {/* Stats Cards */}
      <div className="row g-4 mb-5">
        <StatCard title="Total Users" value={stats.totalUsers} color="dark" icon={<FaUsers />} />
        <StatCard title="Total Requests" value={stats.total} color="secondary" icon={<FaClipboardList />} />
        <StatCard title="Submitted" value={stats.SUBMITTED} color="info" icon={<FaPaperPlane />} />
        <StatCard title="Approved" value={stats.APPROVED} color="primary" icon={<FaCheckCircle />} />
        <StatCard title="Scheduled" value={stats.SCHEDULED} color="warning" icon={<FaCalendarAlt />} />
        <StatCard title="Picked" value={stats.PICKED} color="success" icon={<FaTruck />} />
        <StatCard title="Cancelled" value={stats.CANCELLED} color="danger" icon={<FaTimesCircle />} />
        <StatCard title="Completed" value={stats.COMPLETED} color="success" icon={<FaFlagCheckered />} />
      </div>

      {/* Manage Requests Card */}
      <div className="row justify-content-center">
        <div className="col-xl-8 col-lg-10 col-md-12">
          <div className="card shadow-lg border-0 rounded-4 p-5 text-center">
            <h4 className="fw-semibold mb-2">📋 Manage E-Waste Requests</h4>
            <p className="text-muted mb-4">
              View, approve, schedule pickups, and assign staff efficiently.
            </p>
            <Link
              to="/admin/requests"
              className="btn btn-primary btn-lg px-5 shadow"
            >
              View All Requests
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}

export default AdminDashboard;
