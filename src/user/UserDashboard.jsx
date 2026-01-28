
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axiosConfig";

function StatusCard({ title, value, color, icon, gradient }) {
  return (
    <div className="status-card-wrapper">
      <div className={`status-card ${color}`}>
        <div className="status-icon">{icon}</div>
        <div className="status-content">
          <div className="status-value">{value}</div>
          <div className="status-title">{title}</div>
        </div>
        <div className={`status-gradient ${gradient}`}></div>
      </div>
    </div>
  );
}

function UserDashboard() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    TOTAL: 0,
    SUBMITTED: 0,
    APPROVED: 0,
    SCHEDULED: 0,
    PICKED: 0,
    CANCELLED: 0,
    COMPLETED: 0,
  });
  const [loading, setLoading] = useState(true);

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

        res.data.forEach((r) => {
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
        const res = await api.get("/api/ewaste/me");
        setUser(res.data);
      } catch (err) {
        console.error("Failed to load user profile");
      }
    };

    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchUser(), fetchStats()]);
      setLoading(false);
    };

    loadData();
  }, []);

  return (
    <>
      <div className="dashboard-container">
        <div className="dashboard-content">
          {/* Header Section */}
          <div className="dashboard-header">
            <div className="header-content">
              <h1 className="header-title">
                Welcome back{user ? `, ${user.name}` : ""}! 👋
              </h1>
              <p className="header-subtitle">
                Manage your e-waste requests and track pickup status in real-time
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p className="loading-text">Loading your dashboard...</p>
            </div>
          ) : (
            <>
              <div className="stats-grid">
                <StatusCard
                  title="Total"
                  value={stats.TOTAL}
                  color="card-dark"
                  gradient="gradient-dark"
                  icon="📊"
                />
                <StatusCard
                  title="Submitted"
                  value={stats.SUBMITTED}
                  color="card-secondary"
                  gradient="gradient-secondary"
                  icon="📥"
                />
                <StatusCard
                  title="Approved"
                  value={stats.APPROVED}
                  color="card-primary"
                  gradient="gradient-primary"
                  icon="✅"
                />
                <StatusCard
                  title="Scheduled"
                  value={stats.SCHEDULED}
                  color="card-info"
                  gradient="gradient-info"
                  icon="🗓️"
                />
                <StatusCard
                  title="Picked"
                  value={stats.PICKED}
                  color="card-warning"
                  gradient="gradient-warning"
                  icon="🚚"
                />
                <StatusCard
                  title="Cancelled"
                  value={stats.CANCELLED}
                  color="card-danger"
                  gradient="gradient-danger"
                  icon="❌"
                />
                <StatusCard
                  title="Completed"
                  value={stats.COMPLETED}
                  color="card-success"
                  gradient="gradient-success"
                  icon="🏁"
                />
              </div>

              {/* Action Cards */}
              <div className="action-cards">
                {/* Create Request Card */}
                <div className="action-card">
                  <div className="card-header-icon bg-success">
                    <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="card-title">Create E-Waste Request</h3>
                  <p className="card-description">
                    Request a pickup for your electronic waste items quickly and responsibly. 
                    Our team will process your request within 24 hours.
                  </p>
                  <Link to="/user/create-request" className="action-button btn-success">
                    <span>Create Request</span>
                    <svg className="button-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                  <div className="card-decoration decoration-success"></div>
                </div>

                {/* My Requests Card */}
                <div className="action-card">
                  <div className="card-header-icon bg-primary">
                    <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </div>
                  <h3 className="card-title">My Requests</h3>
                  <p className="card-description">
                    View your submitted requests, track pickup status in real-time, 
                    and access assigned staff details for each request.
                  </p>
                  <Link to="/user/my-requests" className="action-button btn-primary">
                    <span>View Requests</span>
                    <svg className="button-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                  <div className="card-decoration decoration-primary"></div>
                </div>
              </div>

              {/* Quick Info */}
              <div className="quick-info">
                <div className="info-item">
                  <svg className="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="info-content">
                    <div className="info-title">Need Help?</div>
                    <div className="info-text">Contact our support team for assistance</div>
                  </div>
                </div>
                <div className="info-item">
                  <svg className="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="info-content">
                    <div className="info-title">Response Time</div>
                    <div className="info-text">We respond within 24 hours</div>
                  </div>
                </div>
                <div className="info-item">
                  <svg className="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <div className="info-content">
                    <div className="info-title">Secure & Safe</div>
                    <div className="info-text">Your data is protected</div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <style>{`
        .dashboard-container {
          min-height: calc(100vh - 64px);
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          padding: 2rem 1rem;
          margin-top: 64px;
        }

        .dashboard-content {
          max-width: 1400px;
          margin: 0 auto;
        }

        /* Header */
        .dashboard-header {
          margin-bottom: 2.5rem;
          animation: fadeInDown 0.6s ease-out;
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .header-content {
          text-align: center;
          max-width: 700px;
          margin: 0 auto;
        }

        .header-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, #0f172a, #1e293b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .header-subtitle {
          font-size: 1.125rem;
          color: #64748b;
        }

        /* Loading */
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 4rem 0;
        }

        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 4px solid #e2e8f0;
          border-top-color: #10b981;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .loading-text {
          margin-top: 1rem;
          color: #64748b;
          font-weight: 500;
        }

        /* Stats Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1rem;
          margin-bottom: 2.5rem;
          animation: fadeInUp 0.6s ease-out 0.2s backwards;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .status-card-wrapper {
          animation: scaleIn 0.4s ease-out backwards;
        }

        .status-card-wrapper:nth-child(1) { animation-delay: 0.1s; }
        .status-card-wrapper:nth-child(2) { animation-delay: 0.15s; }
        .status-card-wrapper:nth-child(3) { animation-delay: 0.2s; }
        .status-card-wrapper:nth-child(4) { animation-delay: 0.25s; }
        .status-card-wrapper:nth-child(5) { animation-delay: 0.3s; }
        .status-card-wrapper:nth-child(6) { animation-delay: 0.35s; }
        .status-card-wrapper:nth-child(7) { animation-delay: 0.4s; }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .status-card {
          position: relative;
          background: white;
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          transition: all 0.3s;
          overflow: hidden;
          cursor: pointer;
        }

        .status-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15);
        }

        .status-icon {
          font-size: 2rem;
          margin-bottom: 0.75rem;
          display: block;
        }

        .status-content {
          position: relative;
          z-index: 1;
        }

        .status-value {
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 0.25rem;
        }

        .status-title {
          font-size: 0.875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          opacity: 0.8;
        }

        .status-gradient {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 100%;
          height: 4px;
          border-radius: 0 0 1rem 1rem;
        }

        /* Card Colors */
        .card-dark .status-value { color: #1e293b; }
        .card-dark .status-title { color: #475569; }
        .gradient-dark { background: linear-gradient(90deg, #1e293b, #334155); }

        .card-secondary .status-value { color: #64748b; }
        .card-secondary .status-title { color: #94a3b8; }
        .gradient-secondary { background: linear-gradient(90deg, #64748b, #94a3b8); }

        .card-primary .status-value { color: #3b82f6; }
        .card-primary .status-title { color: #60a5fa; }
        .gradient-primary { background: linear-gradient(90deg, #3b82f6, #60a5fa); }

        .card-info .status-value { color: #06b6d4; }
        .card-info .status-title { color: #22d3ee; }
        .gradient-info { background: linear-gradient(90deg, #06b6d4, #22d3ee); }

        .card-warning .status-value { color: #f59e0b; }
        .card-warning .status-title { color: #fbbf24; }
        .gradient-warning { background: linear-gradient(90deg, #f59e0b, #fbbf24); }

        .card-danger .status-value { color: #ef4444; }
        .card-danger .status-title { color: #f87171; }
        .gradient-danger { background: linear-gradient(90deg, #ef4444, #f87171); }

        .card-success .status-value { color: #10b981; }
        .card-success .status-title { color: #34d399; }
        .gradient-success { background: linear-gradient(90deg, #10b981, #34d399); }

        /* Action Cards */
        .action-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
          margin-bottom: 2.5rem;
          animation: fadeInUp 0.6s ease-out 0.4s backwards;
        }

        .action-card {
          position: relative;
          background: white;
          border-radius: 1.5rem;
          padding: 2rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          transition: all 0.3s;
          overflow: hidden;
        }

        .action-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15);
        }

        .card-header-icon {
          width: 60px;
          height: 60px;
          border-radius: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .card-header-icon.bg-success {
          background: linear-gradient(135deg, #10b981, #059669);
        }

        .card-header-icon.bg-primary {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
        }

        .card-header-icon .icon {
          width: 2rem;
          height: 2rem;
          color: white;
        }

        .card-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 1rem;
        }

        .card-description {
          color: #64748b;
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }

        .action-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.875rem 1.5rem;
          border-radius: 0.75rem;
          font-weight: 600;
          text-decoration: none;
          color: white;
          transition: all 0.3s;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .action-button:hover {
          transform: translateX(4px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
          color: white;
        }

        .btn-success {
          background: linear-gradient(135deg, #10b981, #059669);
        }

        .btn-primary {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
        }

        .button-arrow {
          width: 1.25rem;
          height: 1.25rem;
          transition: transform 0.3s;
        }

        .action-button:hover .button-arrow {
          transform: translateX(4px);
        }

        .card-decoration {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 150px;
          height: 150px;
          border-radius: 50%;
          opacity: 0.1;
          filter: blur(40px);
        }

        .decoration-success {
          background: linear-gradient(135deg, #10b981, #059669);
        }

        .decoration-primary {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
        }

        /* Quick Info */
        .quick-info {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          animation: fadeInUp 0.6s ease-out 0.6s backwards;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: white;
          padding: 1.5rem;
          border-radius: 1rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          transition: all 0.3s;
        }

        .info-item:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.15);
        }

        .info-icon {
          width: 2.5rem;
          height: 2.5rem;
          color: #10b981;
          flex-shrink: 0;
        }

        .info-content {
          flex: 1;
        }

        .info-title {
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 0.25rem;
        }

        .info-text {
          font-size: 0.875rem;
          color: #64748b;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .header-title {
            font-size: 1.75rem;
          }

          .header-subtitle {
            font-size: 1rem;
          }

          .stats-grid {
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 0.75rem;
          }

          .status-card {
            padding: 1rem;
          }

          .status-icon {
            font-size: 1.5rem;
          }

          .status-value {
            font-size: 1.5rem;
          }

          .action-cards {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}

export default UserDashboard;