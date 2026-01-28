

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axiosConfig";

const STATUS_FLOW = {
  SUBMITTED: ["APPROVED", "CANCELLED"],
  APPROVED: ["SCHEDULED"],
  SCHEDULED: ["PICKED"],
  PICKED: ["COMPLETED"]
};

const STATUS_LIST = [
  "ALL",
  "SUBMITTED",
  "APPROVED",
  "SCHEDULED",
  "PICKED",
  "COMPLETED",
  "CANCELLED"
];

const statusColor = {
  SUBMITTED: "secondary",
  APPROVED: "primary",
  SCHEDULED: "warning",
  PICKED: "info",
  COMPLETED: "success",
  CANCELLED: "danger"
};

const statusGradient = {
  SUBMITTED: "gradient-secondary",
  APPROVED: "gradient-primary",
  SCHEDULED: "gradient-warning",
  PICKED: "gradient-info",
  COMPLETED: "gradient-success",
  CANCELLED: "gradient-danger"
};

function AdminRequests() {
  const [requests, setRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [view, setView] = useState("card");
  const [modalImage, setModalImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const res = await api.get("/api/admin/ewaste/all");
        setRequests(res.data.slice().reverse());
      } catch (err) {
        setError("Failed to fetch requests");
        console.error("Failed to fetch requests", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const updateStatus = async (id, status) => {
    if (!status) return;
    try {
      await api.put(`/api/admin/ewaste/update-status/${id}`, { status });
      setRequests(prev =>
        prev.map(r => (r.id === id ? { ...r, status } : r))
      );
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const filteredRequests = requests.filter(r => {
    const matchesStatus = statusFilter === "ALL" || r.status === statusFilter;
    const searchText = search.toLowerCase();
    const matchesSearch =
      r.userName.toLowerCase().includes(searchText) ||
      r.userEmail.toLowerCase().includes(searchText) ||
      r.deviceType.toLowerCase().includes(searchText) ||
      r.brand.toLowerCase().includes(searchText) ||
      r.model.toLowerCase().includes(searchText);
    return matchesStatus && matchesSearch;
  });

  const statusCounts = STATUS_LIST.reduce((acc, status) => {
    acc[status] = status === "ALL" 
      ? requests.length 
      : requests.filter(r => r.status === status).length;
    return acc;
  }, {});

  return (
    <>
      <div className="admin-requests-container">
        <div className="requests-content">
          
          {/* Header */}
          <div className="page-header">
            <div className="header-icon-wrapper">
              <div className="header-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 7h6m-6 4h6" />
                </svg>
              </div>
            </div>
            <h1 className="page-title">Manage E-Waste Requests</h1>
            <p className="page-subtitle">View, approve, schedule, and manage all e-waste pickup requests</p>
          </div>

          {/* Status Filter Tabs */}
          <div className="filter-tabs">
            {STATUS_LIST.map(status => (
              <button
                key={status}
                className={`filter-tab ${statusFilter === status ? 'active' : ''}`}
                onClick={() => setStatusFilter(status)}
              >
                <span className="tab-label">{status}</span>
                <span className="tab-count">{statusCounts[status]}</span>
              </button>
            ))}
          </div>

          {/* Search and View Controls */}
          <div className="controls-section">
            <div className="search-wrapper">
              <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                className="search-input"
                placeholder="Search by user, email, device, brand..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="view-toggle">
              <button
                className={`toggle-btn ${view === "card" ? "active" : ""}`}
                onClick={() => setView("card")}
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                Card
              </button>
              <button
                className={`toggle-btn ${view === "table" ? "active" : ""}`}
                onClick={() => setView("table")}
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Table
              </button>
            </div>
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
              <p className="loading-text">Loading requests...</p>
            </div>
          ) : filteredRequests.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="empty-title">No Requests Found</h3>
              <p className="empty-text">
                {statusFilter === "ALL" 
                  ? "No e-waste requests available yet."
                  : `No requests with status "${statusFilter}".`
                }
              </p>
            </div>
          ) : (
            <>
              {/* Card View */}
              {view === "card" && (
                <div className="requests-grid">
                  {filteredRequests.map((r, index) => (
                    <div key={r.id} className="request-card" style={{animationDelay: `${index * 0.05}s`}}>
                      
                      {/* Card Header */}
                      <div className="card-header">
                        <div className="device-info">
                          <div className="device-icon">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="device-title">{r.deviceType}</h3>
                            <p className="device-subtitle">{r.brand} {r.model}</p>
                          </div>
                        </div>
                        <span className={`status-badge ${statusGradient[r.status]}`}>
                          {r.status}
                        </span>
                      </div>

                      {/* Card Body */}
                      <div className="card-body">
                        {/* Image */}
                        {r.imageBase64 ? (
                          <div className="image-container" onClick={() => setModalImage(r.imageBase64)}>
                            <img
                              src={`data:image/*;base64,${r.imageBase64}`}
                              alt="E-waste device"
                              className="device-image"
                            />
                            <div className="image-overlay">
                              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                              </svg>
                              Click to enlarge
                            </div>
                          </div>
                        ) : (
                          <div className="no-image">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>No Image</span>
                          </div>
                        )}

                        {/* Info Grid */}
                        <div className="info-grid">
                          <div className="info-item">
                            <div className="info-label">
                              <svg className="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              User
                            </div>
                            <div className="info-value">{r.userName}</div>
                          </div>

                          <div className="info-item">
                            <div className="info-label">
                              <svg className="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                              Email
                            </div>
                            <div className="info-value">{r.userEmail}</div>
                          </div>

                          <div className="info-item">
                            <div className="info-label">
                              <svg className="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                              </svg>
                              Quantity
                            </div>
                            <div className="info-value">{r.quantity}</div>
                          </div>

                          <div className="info-item">
                            <div className="info-label">
                              <svg className="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              Condition
                            </div>
                            <div className="info-value">{r.condition}</div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="card-actions">
                          {STATUS_FLOW[r.status] && (
                            <select
                              className="status-select"
                              defaultValue=""
                              onChange={e => updateStatus(r.id, e.target.value)}
                            >
                              <option value="">Update Status</option>
                              {STATUS_FLOW[r.status].map(s => (
                                <option key={s} value={s}>{s}</option>
                              ))}
                            </select>
                          )}

                          {r.status === "APPROVED" && (
                            <Link to={`/admin/assign/${r.id}`} className="assign-btn">
                              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              Assign Pickup
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Table View */}
              {view === "table" && (
                <div className="table-container">
                  <table className="requests-table">
                    <thead>
                      <tr>
                        <th>User Details</th>
                        <th>Device Information</th>
                        <th>Quantity</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRequests.map(r => (
                        <tr key={r.id}>
                          <td>
                            <div className="user-cell">
                              <div className="user-name">{r.userName}</div>
                              <div className="user-email">{r.userEmail}</div>
                            </div>
                          </td>
                          <td>
                            <div className="device-cell">
                              <div className="device-type">{r.deviceType}</div>
                              <div className="device-brand">{r.brand} {r.model}</div>
                            </div>
                          </td>
                          <td>
                            <span className="quantity-badge">{r.quantity}</span>
                          </td>
                          <td>
                            <span className={`table-status-badge ${statusGradient[r.status]}`}>
                              {r.status}
                            </span>
                          </td>
                          <td>
                            <div className="table-actions">
                              {STATUS_FLOW[r.status] && (
                                <select
                                  className="table-status-select"
                                  defaultValue=""
                                  onChange={e => updateStatus(r.id, e.target.value)}
                                >
                                  <option value="">Update</option>
                                  {STATUS_FLOW[r.status].map(s => (
                                    <option key={s} value={s}>{s}</option>
                                  ))}
                                </select>
                              )}
                              {r.status === "APPROVED" && (
                                <Link to={`/admin/assign/${r.id}`} className="table-assign-btn">
                                  Assign
                                </Link>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}

        </div>
      </div>

      {/* Image Preview Modal */}
      {modalImage && (
        <div className="modal-backdrop" onClick={() => setModalImage(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setModalImage(null)}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img src={`data:image/*;base64,${modalImage}`} alt="Preview" className="modal-image" />
          </div>
        </div>
      )}

      <style>{`
        .admin-requests-container {
          min-height: calc(100vh - 64px);
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          padding: 2rem 1rem;
          margin-top: 64px;
        }

        .requests-content {
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

        /* Filter Tabs */
        .filter-tabs {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 2rem;
          overflow-x: auto;
          padding-bottom: 0.5rem;
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

        .filter-tab {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          background: white;
          border: 2px solid #e2e8f0;
          border-radius: 0.75rem;
          font-weight: 600;
          color: #64748b;
          cursor: pointer;
          transition: all 0.3s;
          white-space: nowrap;
        }

        .filter-tab:hover {
          border-color: #a855f7;
          color: #a855f7;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(168, 85, 247, 0.2);
        }

        .filter-tab.active {
          background: linear-gradient(135deg, #a855f7, #9333ea);
          border-color: #a855f7;
          color: white;
          box-shadow: 0 4px 12px rgba(168, 85, 247, 0.3);
        }

        .tab-label {
          font-size: 0.875rem;
        }

        .tab-count {
          background: rgba(255, 255, 255, 0.2);
          padding: 0.125rem 0.5rem;
          border-radius: 0.5rem;
          font-size: 0.75rem;
          font-weight: 700;
        }

        .filter-tab.active .tab-count {
          background: rgba(255, 255, 255, 0.3);
        }

        /* Controls Section */
        .controls-section {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          animation: fadeInUp 0.6s ease-out 0.3s backwards;
        }

        @media (max-width: 768px) {
          .controls-section {
            flex-direction: column;
          }
        }

        .search-wrapper {
          position: relative;
          flex: 1;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          width: 1.25rem;
          height: 1.25rem;
          color: #94a3b8;
        }

        .search-input {
          width: 100%;
          padding: 0.875rem 1rem 0.875rem 3rem;
          border: 2px solid #e2e8f0;
          border-radius: 0.75rem;
          font-size: 0.95rem;
          transition: all 0.3s;
          background: white;
        }

        .search-input:focus {
          outline: none;
          border-color: #a855f7;
          box-shadow: 0 0 0 4px rgba(168, 85, 247, 0.1);
        }

        .view-toggle {
          display: flex;
          gap: 0.5rem;
          background: white;
          padding: 0.25rem;
          border-radius: 0.75rem;
          border: 2px solid #e2e8f0;
        }

        .toggle-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.625rem 1rem;
          background: transparent;
          border: none;
          border-radius: 0.5rem;
          font-weight: 600;
          color: #64748b;
          cursor: pointer;
          transition: all 0.3s;
        }

        .toggle-btn svg {
          width: 1.125rem;
          height: 1.125rem;
        }

        .toggle-btn:hover {
          background: #f8fafc;
          color: #a855f7;
        }

        .toggle-btn.active {
          background: linear-gradient(135deg, #a855f7, #9333ea);
          color: white;
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

        /* Empty State */
        .empty-state {
          text-align: center;
          padding: 4rem 2rem;
          background: white;
          border-radius: 1.5rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .empty-icon {
          width: 100px;
          height: 100px;
          margin: 0 auto 2rem;
          background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .empty-icon svg {
          width: 3rem;
          height: 3rem;
          color: #94a3b8;
        }

        .empty-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 0.75rem;
        }

        .empty-text {
          font-size: 1rem;
          color: #64748b;
        }

        /* Requests Grid */
        .requests-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.5rem;
          animation: fadeInUp 0.6s ease-out 0.4s backwards;
        }

        /* Request Card */
        .request-card {
          background: white;
          border-radius: 1.25rem;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          transition: all 0.3s;
          animation: scaleIn 0.4s ease-out backwards;
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
}
to {
opacity: 1;
transform: scale(1);
}
}
    .request-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.25rem;
      background: linear-gradient(135deg, #f8fafc, #f1f5f9);
      border-bottom: 2px solid #e2e8f0;
    }

    .device-info {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      flex: 1;
      min-width: 0;
    }

    .device-icon {
      width: 45px;
      height: 45px;
      background: linear-gradient(135deg, #a855f7, #9333ea);
      border-radius: 0.75rem;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .device-icon svg {
      width: 1.5rem;
      height: 1.5rem;
      color: white;
    }

    .device-title {
      font-size: 1rem;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 0.125rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .device-subtitle {
      font-size: 0.8125rem;
      color: #64748b;
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .status-badge {
      padding: 0.375rem 0.75rem;
      border-radius: 0.5rem;
      font-size: 0.6875rem;
      font-weight: 700;
      color: white;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      white-space: nowrap;
      flex-shrink: 0;
    }

    .gradient-secondary { background: linear-gradient(135deg, #64748b, #475569); }
    .gradient-primary { background: linear-gradient(135deg, #3b82f6, #2563eb); }
    .gradient-warning { background: linear-gradient(135deg, #f59e0b, #d97706); }
    .gradient-info { background: linear-gradient(135deg, #06b6d4, #0891b2); }
    .gradient-success { background: linear-gradient(135deg, #10b981, #059669); }
    .gradient-danger { background: linear-gradient(135deg, #ef4444, #dc2626); }

    .card-body {
      padding: 1.25rem;
    }

    .image-container {
      position: relative;
      margin-bottom: 1.25rem;
      border-radius: 0.75rem;
      overflow: hidden;
      cursor: pointer;
      border: 2px solid #e2e8f0;
    }

    .device-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
      display: block;
      transition: transform 0.3s;
    }

    .image-container:hover .device-image {
      transform: scale(1.05);
    }

    .image-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 0.75rem;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
      color: white;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.8125rem;
      font-weight: 600;
      opacity: 0;
      transition: opacity 0.3s;
    }

    .image-container:hover .image-overlay {
      opacity: 1;
    }

    .image-overlay svg {
      width: 1.125rem;
      height: 1.125rem;
    }

    .no-image {
      height: 200px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      background: linear-gradient(135deg, #f8fafc, #f1f5f9);
      border-radius: 0.75rem;
      border: 2px solid #e2e8f0;
      margin-bottom: 1.25rem;
      color: #94a3b8;
    }

    .no-image svg {
      width: 3rem;
      height: 3rem;
    }

    .no-image span {
      font-size: 0.875rem;
      font-weight: 600;
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      margin-bottom: 1.25rem;
    }

    .info-item {
      display: flex;
      flex-direction: column;
      gap: 0.375rem;
    }

    .info-label {
      display: flex;
      align-items: center;
      gap: 0.375rem;
      font-size: 0.6875rem;
      font-weight: 600;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .info-icon {
      width: 0.875rem;
      height: 0.875rem;
      color: #a855f7;
    }

    .info-value {
      font-size: 0.875rem;
      font-weight: 600;
      color: #0f172a;
      word-break: break-word;
    }

    .card-actions {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .status-select {
      width: 100%;
      padding: 0.625rem 0.75rem;
      border: 2px solid #e2e8f0;
      border-radius: 0.5rem;
      font-size: 0.875rem;
      font-weight: 600;
      color: #334155;
      background: white;
      cursor: pointer;
      transition: all 0.3s;
    }

    .status-select:focus {
      outline: none;
      border-color: #a855f7;
      box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.1);
    }

    .assign-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.625rem;
      background: linear-gradient(135deg, #10b981, #059669);
      color: white;
      border-radius: 0.5rem;
      font-size: 0.875rem;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.3s;
    }

    .assign-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
      color: white;
    }

    .assign-btn svg {
      width: 1rem;
      height: 1rem;
    }

    /* Table View */
    .table-container {
      background: white;
      border-radius: 1.25rem;
      overflow: hidden;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
      animation: fadeInUp 0.6s ease-out 0.4s backwards;
    }

    .requests-table {
      width: 100%;
      border-collapse: collapse;
    }

    .requests-table thead {
      background: linear-gradient(135deg, #1e293b, #0f172a);
      color: white;
    }

    .requests-table th {
      padding: 1rem;
      text-align: left;
      font-weight: 700;
      font-size: 0.875rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .requests-table td {
      padding: 1rem;
      border-bottom: 1px solid #e2e8f0;
    }

    .requests-table tbody tr:hover {
      background: #f8fafc;
    }

    .user-cell {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .user-name {
      font-weight: 600;
      color: #0f172a;
    }

    .user-email {
      font-size: 0.8125rem;
      color: #64748b;
    }

    .device-cell {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .device-type {
      font-weight: 600;
      color: #0f172a;
    }

    .device-brand {
      font-size: 0.8125rem;
      color: #64748b;
    }

    .quantity-badge {
      display: inline-block;
      padding: 0.375rem 0.75rem;
      background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
      color: #0f172a;
      border-radius: 0.5rem;
      font-weight: 700;
    }

    .table-status-badge {
      display: inline-block;
      padding: 0.375rem 0.75rem;
      border-radius: 0.5rem;
      font-size: 0.75rem;
      font-weight: 700;
      color: white;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .table-actions {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }

    .table-status-select {
      padding: 0.5rem;
      border: 2px solid #e2e8f0;
      border-radius: 0.5rem;
      font-size: 0.8125rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
    }

    .table-status-select:focus {
      outline: none;
      border-color: #a855f7;
    }

    .table-assign-btn {
      padding: 0.5rem 1rem;
      background: linear-gradient(135deg, #10b981, #059669);
      color: white;
      border-radius: 0.5rem;
      font-size: 0.8125rem;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.3s;
      white-space: nowrap;
    }

    .table-assign-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
      color: white;
    }

    /* Modal */
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      padding: 2rem;
      animation: fadeIn 0.3s ease-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .modal-content {
      position: relative;
      max-width: 90vw;
      max-height: 90vh;
      animation: zoomIn 0.3s ease-out;
    }

    @keyframes zoomIn {
      from {
        opacity: 0;
        transform: scale(0.8);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    .modal-close {
      position: absolute;
      top: 1rem;
      right: 1rem;
      width: 3rem;
      height: 3rem;
      background: rgba(239, 68, 68, 0.9);
      border: none;
      border-radius: 0.5rem;
      color: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s;
      z-index: 1001;
    }

    .modal-close:hover {
      background: #dc2626;
      transform: scale(1.1);
    }

    .modal-close svg {
      width: 1.5rem;
      height: 1.5rem;
    }

    .modal-image {
      width: 100%;
      height: 100%;
      max-width: 90vw;
      max-height: 90vh;
      object-fit: contain;
      border-radius: 1rem;
    }

    /* Mobile Responsive */
    @media (max-width: 768px) {
      .page-title {
        font-size: 1.75rem;
      }

      .page-subtitle {
        font-size: 1rem;
      }

      .filter-tabs {
        overflow-x: scroll;
      }

      .requests-grid {
        grid-template-columns: 1fr;
      }

      .info-grid {
        grid-template-columns: 1fr;
      }

      .table-container {
        overflow-x: auto;
      }

      .requests-table {
        min-width: 800px;
      }
    }
  `}</style>
</>
);
}
export default AdminRequests;