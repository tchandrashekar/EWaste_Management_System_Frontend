

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axiosConfig";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        const [requestsRes, usersRes] = await Promise.all([
          api.get("/api/admin/ewaste/all"),
          api.get("/api/admin/users")
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
        setError("Failed to load dashboard data");
        console.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const StatCard = ({ title, value, gradient, icon, delay }) => (
    <div className="stat-card-wrapper" style={{ animationDelay: `${delay}s` }}>
      <div className={`stat-card ${gradient}`}>
        <div className="stat-icon-wrapper">
          <div className="stat-icon">{icon}</div>
        </div>
        <div className="stat-content">
          <div className="stat-value">{value}</div>
          <div className="stat-title">{title}</div>
        </div>
        <div className="stat-background"></div>
      </div>
    </div>
  );

  return (
    <>
      <div className="admin-dashboard-container">
        <div className="dashboard-content">
          
          {/* Header */}
          <div className="page-header">
            <div className="header-icon-wrapper">
              <div className="header-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            <h1 className="page-title">Admin Dashboard</h1>
            <p className="page-subtitle">
              Monitor users, requests, and e-waste pickup lifecycle in real-time
            </p>
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
                <StatCard
                  title="Total Users"
                  value={stats.totalUsers}
                  gradient="gradient-dark"
                  delay={0}
                  icon={
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  }
                />
                <StatCard
                  title="Total Requests"
                  value={stats.total}
                  gradient="gradient-secondary"
                  delay={0.1}
                  icon={
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  }
                />
                <StatCard
                  title="Submitted"
                  value={stats.SUBMITTED}
                  gradient="gradient-info"
                  delay={0.2}
                  icon={
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  }
                />
                <StatCard
                  title="Approved"
                  value={stats.APPROVED}
                  gradient="gradient-primary"
                  delay={0.3}
                  icon={
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  }
                />
                <StatCard
                  title="Scheduled"
                  value={stats.SCHEDULED}
                  gradient="gradient-warning"
                  delay={0.4}
                  icon={
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  }
                />
                <StatCard
                  title="Picked"
                  value={stats.PICKED}
                  gradient="gradient-success"
                  delay={0.5}
                  icon={
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                    </svg>
                  }
                />
                <StatCard
                  title="Cancelled"
                  value={stats.CANCELLED}
                  gradient="gradient-danger"
                  delay={0.6}
                  icon={
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  }
                />
                <StatCard
                  title="Completed"
                  value={stats.COMPLETED}
                  gradient="gradient-success-alt"
                  delay={0.7}
                  icon={
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  }
                />
              </div>

              {/* Action Cards */}
              <div className="action-cards">
                {/* Manage Requests Card */}
                <div className="action-card">
                  <div className="card-header-icon bg-primary">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </div>
                  <h3 className="card-title">Manage E-Waste Requests</h3>
                  <p className="card-description">
                    View all requests, approve submissions, schedule pickups, and assign staff members efficiently.
                  </p>
                  <Link to="/admin/requests" className="action-button btn-primary">
                    <span>View All Requests</span>
                    <svg className="button-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                  <div className="card-decoration decoration-primary"></div>
                </div>

                {/* Add Pickup Person Card */}
                <div className="action-card">
                  <div className="card-header-icon bg-success">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                  </div>
                  <h3 className="card-title">Add Pickup Person</h3>
                  <p className="card-description">
                    Register new pickup staff members to expand your team and improve service coverage.
                  </p>
                  <Link to="/admin/add-pickup" className="action-button btn-success">
                    <span>Add Pickup Staff</span>
                    <svg className="button-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                  <div className="card-decoration decoration-success"></div>
                </div>
              </div>

              {/* Quick Stats Summary */}
              <div className="summary-section">
                <h3 className="summary-title">Quick Overview</h3>
                <div className="summary-grid">
                  <div className="summary-item">
                    <div className="summary-icon summary-icon-blue">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <div className="summary-content">
                      <div className="summary-label">Active Requests</div>
                      <div className="summary-value">
                        {stats.SUBMITTED + stats.APPROVED + stats.SCHEDULED}
                      </div>
                    </div>
                  </div>

                  <div className="summary-item">
                    <div className="summary-icon summary-icon-green">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="summary-content">
                      <div className="summary-label">Success Rate</div>
                      <div className="summary-value">
                        {stats.total > 0 
                          ? Math.round((stats.COMPLETED / stats.total) * 100) 
                          : 0}%
                      </div>
                    </div>
                  </div>

                  <div className="summary-item">
                    <div className="summary-icon summary-icon-purple">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="summary-content">
                      <div className="summary-label">Pending Action</div>
                      <div className="summary-value">{stats.SUBMITTED}</div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

        </div>
      </div>

      <style>{`
        .admin-dashboard-container {
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
          background: linear-gradient(135deg, #a855f7, #9333ea);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 30px rgba(168, 85, 247, 0.3);
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 10px 30px rgba(168, 85, 247, 0.3);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 15px 40px rgba(168, 85, 247, 0.5);
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
          background: linear-gradient(135deg, #0f172a, #a855f7);
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
          border-top-color: #a855f7;
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
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }

        .stat-card-wrapper {
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

        .stat-card {
          position: relative;
          background: white;
          border-radius: 1.25rem;
          padding: 1.75rem;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          transition: all 0.3s;
          overflow: hidden;
          cursor: pointer;
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

        .gradient-secondary .stat-icon {
          background: linear-gradient(135deg, #64748b, #475569);
        }

        .gradient-info .stat-icon {
          background: linear-gradient(135deg, #06b6d4, #0891b2);
        }

        .gradient-primary .stat-icon {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
        }

        .gradient-warning .stat-icon {
          background: linear-gradient(135deg, #f59e0b, #d97706);
        }

        .gradient-success .stat-icon {
          background: linear-gradient(135deg, #10b981, #059669);
        }

        .gradient-danger .stat-icon {
          background: linear-gradient(135deg, #ef4444, #dc2626);
        }

        .gradient-success-alt .stat-icon {
          background: linear-gradient(135deg, #22c55e, #16a34a);
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

        /* Action Cards */
        .action-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
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
          padding: 2rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          transition: all 0.3s;
          overflow: hidden;
        }

        .action-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
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

        .card-header-icon.bg-primary {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
        }

        .card-header-icon.bg-success {
          background: linear-gradient(135deg, #10b981, #059669);
        }

        .card-header-icon svg {
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

        .btn-primary {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
        }

        .btn-success {
          background: linear-gradient(135deg, #10b981, #059669);
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

        .decoration-primary {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
        }

        .decoration-success {
          background: linear-gradient(135deg, #10b981, #059669);
        }

        /* Summary Section */
        .summary-section {
          background: white;
          border-radius: 1.5rem;
          padding: 2rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          animation: fadeInUp 0.6s ease-out 0.6s backwards;
        }

        .summary-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 1.5rem;
        }

        .summary-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        .summary-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.25rem;
          background: linear-gradient(135deg, #f8fafc, #f1f5f9);
          border-radius: 1rem;
          transition: all 0.3s;
        }

        .summary-item:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }

        .summary-icon {
          width: 60px;
          height: 60px;
          border-radius: 0.75rem;
          display: flex;
          align-items:
          center;
justify-content: center;
flex-shrink: 0;
}
    .summary-icon svg {
      width: 1.75rem;
      height: 1.75rem;
      color: white;
    }

    .summary-icon-blue {
      background: linear-gradient(135deg, #3b82f6, #2563eb);
    }

    .summary-icon-green {
      background: linear-gradient(135deg, #10b981, #059669);
    }

    .summary-icon-purple {
      background: linear-gradient(135deg, #a855f7, #9333ea);
    }

    .summary-content {
      flex: 1;
    }

    .summary-label {
      font-size: 0.875rem;
      font-weight: 600;
      color: #64748b;
      margin-bottom: 0.25rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .summary-value {
      font-size: 1.875rem;
      font-weight: 800;
      color: #0f172a;
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

      .action-cards {
        grid-template-columns: 1fr;
      }

      .summary-grid {
        grid-template-columns: 1fr;
      }
    }
  `}</style>
</>
);
}
export default AdminDashboard;