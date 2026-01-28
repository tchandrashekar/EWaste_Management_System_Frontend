

import { useEffect, useState } from "react";
import api from "../api/axiosConfig";

function MyRequests() {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState(null);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const res = await api.get("/api/ewaste/my-requests");
        setRequests(res.data.slice().reverse());
      } catch (err) {
        setError(err.response?.data || "Failed to fetch requests");
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const statusColor = (status) => {
    switch (status) {
      case "SUBMITTED": return "secondary";
      case "APPROVED": return "primary";
      case "SCHEDULED": return "info";
      case "PICKED": return "warning";
      case "CANCELLED": return "danger";
      case "COMPLETED": return "success";
      default: return "dark";
    }
  };

  const statusGradient = (status) => {
    switch (status) {
      case "SUBMITTED": return "gradient-secondary";
      case "APPROVED": return "gradient-primary";
      case "SCHEDULED": return "gradient-info";
      case "PICKED": return "gradient-warning";
      case "CANCELLED": return "gradient-danger";
      case "COMPLETED": return "gradient-success";
      default: return "gradient-dark";
    }
  };

  const filteredRequests = filter === "ALL" 
    ? requests 
    : requests.filter(r => r.status === filter);

  const statusCounts = {
    ALL: requests.length,
    SUBMITTED: requests.filter(r => r.status === "SUBMITTED").length,
    APPROVED: requests.filter(r => r.status === "APPROVED").length,
    SCHEDULED: requests.filter(r => r.status === "SCHEDULED").length,
    PICKED: requests.filter(r => r.status === "PICKED").length,
    CANCELLED: requests.filter(r => r.status === "CANCELLED").length,
    COMPLETED: requests.filter(r => r.status === "COMPLETED").length,
  };

  return (
    <>
      <div className="my-requests-container">
        <div className="requests-content">
          
          {/* Header */}
          <div className="page-header">
            <div className="header-icon-wrapper">
              <div className="header-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
            </div>
            <h1 className="page-title">My E-Waste Requests</h1>
            <p className="page-subtitle">Track and manage all your e-waste pickup requests</p>
          </div>

          {/* Filter Tabs */}
          <div className="filter-tabs">
            {Object.entries(statusCounts).map(([status, count]) => (
              <button
                key={status}
                className={`filter-tab ${filter === status ? 'active' : ''}`}
                onClick={() => setFilter(status)}
              >
                <span className="tab-label">{status.replace('_', ' ')}</span>
                <span className="tab-count">{count}</span>
              </button>
            ))}
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
              <p className="loading-text">Loading your requests...</p>
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
                {filter === "ALL" 
                  ? "You haven't created any e-waste requests yet."
                  : `No requests with status "${filter}".`
                }
              </p>
              <a href="/user/create-request" className="empty-button">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Your First Request
              </a>
            </div>
          ) : (
            <div className="requests-grid">
              {filteredRequests.map((r, index) => (
                <div key={r.id} className="request-card" style={{animationDelay: `${index * 0.1}s`}}>
                  
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
                    <span className={`status-badge ${statusGradient(r.status)}`}>
                      {r.status}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="card-body">
                    <div className="info-grid">
                      
                      <div className="info-item">
                        <div className="info-label">
                          <svg className="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Condition
                        </div>
                        <div className="info-value">{r.condition}</div>
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
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Pickup Date
                        </div>
                        <div className="info-value">
                          {r.pickupDate ? new Date(r.pickupDate).toLocaleDateString() : "Not scheduled"}
                        </div>
                      </div>

                      <div className="info-item">
                        <div className="info-label">
                          <svg className="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Time Slot
                        </div>
                        <div className="info-value">{r.timeSlot || "Not assigned"}</div>
                      </div>

                      <div className="info-item info-item-full">
                        <div className="info-label">
                          <svg className="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          Assigned Staff
                        </div>
                        <div className="info-value">{r.assignedStaff || "Not assigned yet"}</div>
                      </div>

                      <div className="info-item info-item-full">
                        <div className="info-label">
                          <svg className="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          Pickup Address
                        </div>
                        <div className="info-value">{r.pickupAddress}</div>
                      </div>

                      {r.remarks && (
                        <div className="info-item info-item-full">
                          <div className="info-label">
                            <svg className="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                            </svg>
                            Remarks
                          </div>
                          <div className="info-value">{r.remarks}</div>
                        </div>
                      )}
                    </div>

                    {/* Image Preview */}
                    {r.imageBase64 && (
                      <div className="image-container">
                        <img
                          src={`data:image/*;base64,${r.imageBase64}`}
                          alt="E-waste device"
                          className="device-image"
                          onClick={() => setPreviewImage(`data:image/*;base64,${r.imageBase64}`)}
                        />
                        <div className="image-overlay">
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                          </svg>
                          Click to enlarge
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>
      </div>

      {/* Image Preview Modal */}
      {previewImage && (
        <div className="modal-backdrop" onClick={() => setPreviewImage(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setPreviewImage(null)}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img src={previewImage} alt="Preview" className="modal-image" />
          </div>
        </div>
      )}

      <style>{`
        .my-requests-container {
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
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 30px rgba(59, 130, 246, 0.3);
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 10px 30px rgba(59, 130, 246, 0.3);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 15px 40px rgba(59, 130, 246, 0.5);
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
          background: linear-gradient(135deg, #0f172a, #3b82f6);
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
          border-color: #3b82f6;
          color: #3b82f6;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
        }

        .filter-tab.active {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          border-color: #3b82f6;
          color: white;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
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
          border-top-color: #3b82f6;
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
          margin-bottom: 2rem;
        }

        .empty-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.875rem 1.5rem;
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          text-decoration: none;
          border-radius: 0.75rem;
          font-weight: 600;
          transition: all 0.3s;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }

        .empty-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(16, 185, 129, 0.4);
          color: white;
        }

        .empty-button svg {
          width: 1.25rem;
          height: 1.25rem;
        }

        /* Requests Grid */
        .requests-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
          gap: 2rem;
          animation: fadeInUp 0.6s ease-out 0.3s backwards;
        }

        @media (max-width: 768px) {
          .requests-grid {
            grid-template-columns: 1fr;
          }
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
          padding: 1.5rem;
          background: linear-gradient(135deg, #f8fafc, #f1f5f9);
          border-bottom: 2px solid #e2e8f0;
        }

        .device-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .device-icon {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .device-icon svg {
          width: 1.75rem;
          height: 1.75rem;
          color: white;
        }

        .device-title {
          font-size: 1.125rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 0.25rem;
        }

        .device-subtitle {
          font-size: 0.875rem;
          color: #64748b;
          margin: 0;
        }

        .status-badge {
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          font-size: 0.75rem;
          font-weight: 700;
          color: white;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          white-space: nowrap;
        }

        .gradient-secondary { background: linear-gradient(135deg, #64748b, #475569); }
        .gradient-primary { background: linear-gradient(135deg, #3b82f6, #2563eb); }
        .gradient-info { background: linear-gradient(135deg, #06b6d4, #0891b2); }
        .gradient-warning { background: linear-gradient(135deg, #f59e0b, #d97706); }
        .gradient-danger { background: linear-gradient(135deg, #ef4444, #dc2626); }
        .gradient-success { background: linear-gradient(135deg, #10b981, #059669); }
        .gradient-dark { background: linear-gradient(135deg, #1e293b, #0f172a); }

        .card-body {
          padding: 1.5rem;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.25rem;
        }

        .info-item {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .info-item-full {
          grid-column: 1 / -1;
        }

        .info-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .info-icon {
          width: 1rem;
          height: 1rem;
          color: #3b82f6;
        }

        .info-value {
          font-size: 0.95rem;
          font-weight: 600;
          color: #0f172a;
        }

        .image-container {
          position: relative;
          margin-top: 1.5rem;
          border-radius: 0.75rem;
          overflow: hidden;
          cursor: pointer;
          border: 2px solid #e2e8f0;
        }

        .device-image {
          width: 100%;
          max-height: 250px;
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
          padding: 1rem;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
          color: white;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          font-weight: 600;
          opacity: 0;
          transition: opacity 0.3s;
        }

        .image-container:hover .image-overlay {
          opacity: 1;
        }

        .image-overlay svg {
          width: 1.25rem;
          height: 1.25rem;
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
    }
  `}</style>
</>
);
}
export default MyRequests;