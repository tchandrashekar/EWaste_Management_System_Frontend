
import { useEffect, useState } from "react";
import api from "../api/axiosConfig";

function MyPickups() {
  const [pickups, setPickups] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState(null);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    fetchPickups();
  }, []);

  const fetchPickups = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/pickup/ewaste/my-pickups");
      setPickups(res.data.slice().reverse());
    } catch {
      setError("Failed to load pickups");
    } finally {
      setLoading(false);
    }
  };

  const markPicked = async (id) => {
    try {
      await api.put(`/api/pickup/ewaste/picked/${id}`);
      fetchPickups();
    } catch {
      setError("Failed to mark as picked");
    }
  };

  const statusColor = {
    SCHEDULED: "bg-warning text-dark",
    PICKED: "bg-primary",
    COMPLETED: "bg-success"
  };

  const statusGradient = {
    SCHEDULED: "gradient-warning",
    PICKED: "gradient-primary",
    COMPLETED: "gradient-success"
  };

  const filteredPickups = filter === "ALL" 
    ? pickups 
    : pickups.filter(p => p.status === filter);

  const statusCounts = {
    ALL: pickups.length,
    SCHEDULED: pickups.filter(p => p.status === "SCHEDULED").length,
    PICKED: pickups.filter(p => p.status === "PICKED").length,
    COMPLETED: pickups.filter(p => p.status === "COMPLETED").length,
  };

  return (
    <>
      <div className="my-pickups-container">
        <div className="pickups-content">
          
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
            <h1 className="page-title">My Assigned Pickups</h1>
            <p className="page-subtitle">View and manage your scheduled e-waste pickups</p>
          </div>

          {/* Filter Tabs */}
          <div className="filter-tabs">
            {Object.entries(statusCounts).map(([status, count]) => (
              <button
                key={status}
                className={`filter-tab ${filter === status ? 'active' : ''}`}
                onClick={() => setFilter(status)}
              >
                <span className="tab-label">{status}</span>
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
              <p className="loading-text">Loading pickups...</p>
            </div>
          ) : filteredPickups.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="empty-title">No Pickups Found</h3>
              <p className="empty-text">
                {filter === "ALL" 
                  ? "You don't have any assigned pickups yet."
                  : `No pickups with status "${filter}".`
                }
              </p>
            </div>
          ) : (
            <div className="pickups-grid">
              {filteredPickups.map((p, index) => (
                <div key={p.id} className="pickup-card" style={{animationDelay: `${index * 0.05}s`}}>
                  
                  {/* Image */}
                  {p.imageBase64 ? (
                    <div className="image-container" onClick={() => setPreviewImage(`data:image/*;base64,${p.imageBase64}`)}>
                      <img
                        src={`data:image/*;base64,${p.imageBase64}`}
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

                  {/* Card Header */}
                  <div className="card-header">
                    <div className="device-info">
                      <h3 className="device-title">{p.deviceType}</h3>
                      <p className="device-subtitle">{p.brand} {p.model}</p>
                    </div>
                    <span className={`status-badge ${statusGradient[p.status]}`}>
                      {p.status}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="card-body">
                    <div className="info-grid">
                      
                      <div className="info-item info-item-full">
                        <div className="info-label">
                          <svg className="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          User Name
                        </div>
                        <div className="info-value">{p.userName}</div>
                      </div>

                      <div className="info-item info-item-full">
                        <div className="info-label">
                          <svg className="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          Email
                        </div>
                        <div className="info-value">{p.userEmail}</div>
                      </div>

                      <div className="info-item info-item-full">
                        <div className="info-label">
                          <svg className="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          Phone
                        </div>
                        <div className="info-value">{p.userPhone || "Not provided"}</div>
                      </div>

                      <div className="info-item info-item-full">
                        <div className="info-label">
                          <svg className="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          Pickup Address
                        </div>
                        <div className="info-value">{p.pickupAddress}</div>
                      </div>

                      <div className="info-item">
                        <div className="info-label">
                          <svg className="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                          </svg>
                          Quantity
                        </div>
                        <div className="info-value">{p.quantity}</div>
                      </div>

                      <div className="info-item">
                        <div className="info-label">
                          <svg className="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Condition
                        </div>
                        <div className="info-value">{p.condition}</div>
                      </div>

                      <div className="info-item">
                        <div className="info-label">
                          <svg className="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Pickup Date
                        </div>
                        <div className="info-value">{p.pickupDate?.split("T")[0] || "Not set"}</div>
                      </div>

                      <div className="info-item">
                        <div className="info-label">
                          <svg className="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Time Slot
                        </div>
                        <div className="info-value">{p.pickupTimeSlot || "Not set"}</div>
                      </div>

                      <div className="info-item info-item-full">
                        <div className="info-label">
                          <svg className="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          Assigned Staff
                        </div>
                        <div className="info-value">{p.assignedStaff || "Not assigned"}</div>
                      </div>
                    </div>

                    {/* Action Button */}
                    {p.status === "SCHEDULED" && (
                      <button
                        className="mark-picked-btn"
                        onClick={() => markPicked(p.id)}
                      >
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Mark as Picked
                      </button>
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
        .my-pickups-container {
          min-height: calc(100vh - 64px);
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          padding: 2rem 1rem;
          margin-top: 64px;
        }

        .pickups-content {
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
          border-color: #f59e0b;
          color: #f59e0b;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(245, 158, 11, 0.2);
        }

        .filter-tab.active {
          background: linear-gradient(135deg, #f59e0b, #d97706);
          border-color: #f59e0b;
          color: white;
          box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
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

        /* Pickups Grid */
        .pickups-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2rem;
          animation: fadeInUp 0.6s ease-out 0.3s backwards;
        }

        /* Pickup Card */
        .pickup-card {
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

        .pickup-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
        }

        .image-container {
          position: relative;
          cursor: pointer;
          overflow: hidden;
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

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 1.25rem;
          background: linear-gradient(135deg, #f8fafc, #f1f5f9);
          border-bottom: 2px solid #e2e8f0;
        }

        .device-info {
          flex: 1;
          min-width: 0;
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

        .gradient-warning { background: linear-gradient(135deg, #f59e0b, #d97706); }
        .gradient-primary { background: linear-gradient(135deg, #3b82f6, #2563eb); }
        .gradient-success { background: linear-gradient(135deg, #10b981, #059669); }

        .card-body {
          padding: 1.25rem;
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

        .info-item-full {
          grid-column: 1 / -1;
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
          color: #f59e0b;
        }

        .info-value {
          font-size: 0.875rem;
          font-weight: 600;
          color: #0f172a;
          word-break: break-word;
        }

        .mark-picked-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          width: 100%;
          padding: 0.75rem;
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          border: none;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          font9:32 AM
-weight: 600;
cursor: pointer;
transition: all 0.3s;
}

    .mark-picked-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
    }

    .mark-picked-btn svg {
      width: 1.125rem;
      height: 1.125rem;
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

      .pickups-grid {
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

export default MyPickups;