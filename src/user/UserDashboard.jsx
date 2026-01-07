


import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axiosConfig";

function StatusCard({ title, value, color, icon }) {
  return (
    <div className="col">
      <div className={`card text-white bg-${color} shadow-sm h-100`}>
        <div className="card-body text-center">
          <div style={{ fontSize: "1.5rem" }}>{icon}</div>
          <h6 className=" mb-1">{title}</h6>
          <h4 className="fw-bold">{value}</h4>
        </div>
      </div>
    </div>
  );
}



function UserDashboard() {

  const [user, setUser] = useState(null);

  const [stats, setStats] = useState({
    TOTAL:0,
   SUBMITTED: 0,
  APPROVED: 0,
  SCHEDULED: 0,
  PICKED: 0,
  CANCELLED: 0,
  COMPLETED: 0,
  });
useEffect(() => {
  const fetchStats = async () => {
    try {
      const res = await api.get("/api/ewaste/my-requests");

      const statusCount = {
        TOTAL: res.data.length,
        SUBMITTED: 0,
        APPROVED: 0,
        SCHEDULED: 0,
        PICKED: 0,
        CANCELLED: 0,
        COMPLETED: 0,
      };
     
      res.data.forEach(r => {
        if (statusCount[r.status] !== undefined) {
          statusCount[r.status]++;
        }
      });

      setStats(statusCount);
    } catch (err) {
      console.error("Failed to load dashboard stats");
    }
  };
  const fetchUser = async () => {
    try {
      const res = await api.get("/api/ewaste/me"); // adjust path if needed
      setUser(res.data);
    } catch (err) {
      console.error("Failed to load user profile");
    }
  };
   fetchUser();
  fetchStats();
}, []);


  return (
   <div className="page-content">
  <div className="container px-2">


      <div className="d-flex justify-content-center mt-4 mb-5">
  <div className="text-center" style={{ maxWidth: "600px" }}>
    <h2 className="fw-bold">Welcome {user && `, ${user.name}`}👋</h2>
    <p className="text-muted mb-2">
      Manage your e-waste requests and track pickup status
    </p>
    
  </div>
</div>


   <div className="row row-cols-7 g-2 mb-2">

  <StatusCard title="Total" value={stats.TOTAL} color="dark" icon="📊" />
  <StatusCard title="Submitted" value={stats.SUBMITTED} color="secondary" icon="📥" />
  <StatusCard title="Approved" value={stats.APPROVED} color="primary" icon="✅" />
  <StatusCard title="Scheduled" value={stats.SCHEDULED} color="info" icon="🗓️" />
  <StatusCard title="Picked" value={stats.PICKED} color="warning" icon="🚚" />
  <StatusCard title="Cancelled" value={stats.CANCELLED} color="danger" icon="❌" />
  <StatusCard title="Completed" value={stats.COMPLETED} color="success" icon="🏁" />

</div>



      <div className="row g-4">
   
        <div className="col-md-6">
          <div className="card shadow-sm h-100 border-0">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="icon-box bg-success text-white me-3">♻️</div>
                <h5 className="mb-0 fw-semibold">
                  Create E-Waste Request
                </h5>
              </div>

              <p className="text-muted">
                Request a pickup for your electronic waste items quickly
                and responsibly.
              </p>

              <Link to="/user/create-request" className="btn btn-success px-4">
                Create Request
              </Link>
            </div>
          </div>
        </div>

   
        <div className="col-md-6">
          <div className="card shadow-sm h-100 border-0">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="icon-box bg-primary text-white me-3">📦</div>
                <h5 className="mb-0 fw-semibold">
                  My Requests
                </h5>
              </div>

              <p className="text-muted">
                View your submitted requests, pickup status,
                and assigned staff details.
              </p>

              <Link to="/user/my-requests" className="btn btn-primary px-4">
                View Requests
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default UserDashboard;

