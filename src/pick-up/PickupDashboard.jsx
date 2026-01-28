

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axiosConfig";

function PickupDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch pickups
        const pickupsRes = await api.get("/api/pickup/ewaste/my-pickups");
        const pickups = pickupsRes.data;

        const total = pickups.length;
        const completed = pickups.filter(
          p => p.status === "COMPLETED" || p.status === "PICKED"
        ).length;
        const pending = total - completed;

        setStats({ total, completed, pending });

        // Try to fetch user info (if endpoint exists)
        try {
          const userRes = await api.get("/api/ewaste/me");
          setUser(userRes.data);
        } catch (err) {
          // User endpoint might not exist, that's okay
        }

      } catch (err) {
        setError("Failed to load dashboard data");
        console.error("Failed to fetch pickups:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="pickup-dashboard-container">
        <div className="dashboard-content">
          
          {/* Header */}
          <div className="page-header">
            <div className="header-icon-wrapper">
              <div className="header-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                </svg>
              </div>
            </div>
            <h1 className="page-title">
              Welcome back{user ? `, ${user.name}` : ""}! 🚚
            </h1>
            <p className="page-subtitle">Track and manage your assigned e-waste pickups</p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="alert alert-error">
              <svg className="alert-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <div className="alert-title">Error</div>
                <div className="alert-message">{error}</div>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p className="loading-text">Loading dashboard...</p>
            </div>
          ) : (
            <>
              {/* Stats Grid */}
              <div className="stats-grid">
                <div className="stat-card gradient-dark" style={{animationDelay: '0s'}}>
                  <div className="stat-icon-wrapper">
                    <div className="stat-icon">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                      </svg>
                    </div>
                  </div>
                  <div className="stat-content">
                    <div className="stat-value">{stats.total}</div>
                    <div className="stat-title">Total Pickups</div>
                  </div>
                  <div className="stat-background"></div>
                </div>

                <div className="stat-card gradient-success" style={{animationDelay: '0.1s'}}>
                  <div className="stat-icon-wrapper">
                    <div className="stat-icon">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="stat-content">
                    <div className="stat-value">{stats.completed}</div>
                    <div className="stat-title">Completed</div>
                  </div>
                  <div className="stat-background"></div>
                </div>

                <div className="stat-card gradient-warning" style={{animationDelay: '0.2s'}}>
                  <div className="stat-icon-wrapper">
                    <div className="stat-icon">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="stat-content">
                    <div className="stat-value">{stats.pending}</div>
                    <div className="stat-title">Pending</div>
                  </div>
                  <div className="stat-background"></div>
                </div>

                <div className="stat-card gradient-info" style={{animationDelay: '0.3s'}}>
                  <div className="stat-icon-wrapper">
                    <div className="stat-icon">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                  </div>
                  <div className="stat-content">
                    <div className="stat-value">{stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%</div>
                    <div className="stat-title">Success Rate</div>
                  </div>
                  <div className="stat-background"></div>
                </div>
              </div>

              {/* Action Card */}
              <div className="action-section">
                <div className="action-card">
                  <div className="card-header-icon bg-primary">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 7h6m-6 4h6" />
                    </svg>
                  </div>
                  <h3 className="card-title">My Assigned Pickups</h3>
                  <p className="card-description">
                    View all your assigned pickups, track their status, and update completion details for collected e-waste items.
                  </p>
                  <Link to="/pickup/my-pickups" className="action-button btn-primary">
                    <span>View My Pickups</span>
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                  <div className="info-content">
                    <div className="info-title">Check Daily Schedule</div>
                    <div className="info-text">Review your pickups for today and upcoming days</div>
                  </div>
                </div>

                <div className="info-item">
                  <svg className="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="info-content">
                    <div className="info-title">Update Status</div>
                    <div className="info-text">Mark pickups as completed after collection</div>
                  </div>
                </div>

                <div className="info-item">
                  <svg className="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div className="info-content">
                    <div className="info-title">Location Details</div>
                    <div className="info-text">View pickup addresses and contact information</div>
                  </div>
                </div>
              </div>
            </>
          )}

        </div>
      </div>

      <style>{`
        .pickup-dashboard-container {
          min-height: calc(100vh - 64px);
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          padding: 2rem 1rem;
          margin-top: 64px;
        }

        .dashboard-content {
          max-width: 1400px;
          margin: 0 auto;
        }

        /* Page Header */
        .page-header {
          text-align: center;
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

        .header-icon-wrapper {
          display: flex;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .header-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #f59e0b, #d97706);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 30px rgba(245, 158, 11, 0.3);
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 10px 30px rgba(245, 158, 11, 0.3);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 15px 40px rgba(245, 158, 11, 0.5);
          }
        }

        .header-icon svg {
          width: 2.5rem;
          height: 2.5rem;
          color: white;
        }

        .page-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 0.75rem;
          background: linear-gradient(135deg, #0f172a, #f59e0b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .page-subtitle {
          font-size: 1.125rem;
          color: #64748b;
        }

        /* Alert */
        .alert {
          display: flex;
          gap: 1rem;
          padding: 1rem 1.25rem;
          border-radius: 0.75rem;
          margin-bottom: 2rem;
          animation: slideIn 0.3s ease-out;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .alert-error {
          background: linear-gradient(135deg, #fee2e2, #fecaca);
          border: 1px solid #fca5a5;
        }

        .alert-icon {
          width: 1.5rem;
          height: 1.5rem;
          flex-shrink: 0;
          color: #dc2626;
        }

        .alert-title {
          font-weight: 700;
          font-size: 0.875rem;
          margin-bottom: 0.25rem;
          color: #991b1b;
        }

        .alert-message {
          font-size: 0.875rem;
          color: #b91c1c;
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
          border-top-color: #f59e0b;
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
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }

        .stat-card {
          position: relative;
          background: white;
          border-radius: 1.25rem;
          padding: 1.75rem;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          transition: all 0.3s;
          overflow: hidden;
          cursor: pointer;
          animation: scaleIn 0.4s ease-out backwards;
        }

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

        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
        }

        .stat-icon-wrapper {
          position: relative;
          z-index: 2;
          margin-bottom: 1rem;
        }

        .stat-icon {
          width: 60px;
          height: 60px;
          border-radius: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .stat-icon svg {
          width: 2rem;
          height: 2rem;
        }

        .gradient-dark .stat-icon {
          background: linear-gradient(135deg, #1e293b, #0f172a);
        }

        .gradient-success .stat-icon {
          background: linear-gradient(135deg, #10b981, #059669);
        }

        .gradient-warning .stat-icon {
          background: linear-gradient(135deg, #f59e0b, #d97706);
        }

        .gradient-info .stat-icon {
          background: linear-gradient(135deg, #06b6d4, #0891b2);
        }

        .stat-content {
          position: relative;
          z-index: 2;
        }

        .stat-value {
          font-size: 2.25rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 0.5rem;
        }

        .stat-title {
          font-size: 0.875rem;
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .stat-background {
          position: absolute;
          bottom: -20px;
          right: -20px;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          opacity: 0.05;
          background: #1e293b;
        }

        /* Action Section */
        .action-section {
          margin-bottom: 2.5rem;
          animation: fadeInUp 0.6s ease-out 0.4s backwards;
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

        .action-card {
          position: relative;
          background: white;
          border-radius: 1.5rem;
          padding: 2.5rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          transition: all 0.3s;
          overflow: hidden;
          text-align: center;
          max-width: 600px;
          margin: 0 auto;
        }

        .action-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .card-header-icon {
          width: 70px;
          height: 70px;
          border-radius: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .card-header-icon.bg-primary {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
        }

        .card-header-icon svg {
          width: 2.25rem;
          height: 2.25rem;
          color: white;
        }

        .card-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 1rem;
        }

        .card-description {
          color: #64748b;
          line-height: 1.7;
          margin-bottom: 2rem;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }

        .action-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 2rem;
          border-radius: 0.75rem;
          font-weight: 600;
          font-size: 1.125rem;
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
          width: 180px;
          height: 180px;
          border-radius: 50%;
          opacity: 0.1;
          filter: blur(40px);
        }

        .decoration-primary {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
        }

        /* Quick Info */
        .quick-info {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
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
          color: #f59e0b;
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

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .page-title {
            font-size: 1.75rem;
          }

          .page-subtitle {
            font-size: 1rem;
          }

          .stats-grid {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 1rem;
          }

          .stat-card {
            padding: 1.25rem;
          }

          .stat-icon {
            width: 50px;
            height: 50px;
          }

          .stat-value {
            font-size: 1.75rem;
          }

          .action-card {
            padding: 2rem 1.5rem;
          }

          .card-title {
            font-size: 1.5rem;
          }

          .action-button {
            font-size: 1rem;
            padding: 0.875rem 1.5rem;
          }
        }
      `}</style>
    </>
  );
}

export default PickupDashboard;