

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

function AssignPickup() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pickupPersons, setPickupPersons] = useState([]);
  const [form, setForm] = useState({
    pickupPersonId: "",
    pickupDate: "",
    timeSlot: "",
    assignedStaff: ""
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingPersons, setLoadingPersons] = useState(true);

  useEffect(() => {
    setLoadingPersons(true);
    api.get("/api/admin/ewaste/pickup-persons")
      .then(res => setPickupPersons(res.data))
      .catch(() => setError("Failed to load pickup persons"))
      .finally(() => setLoadingPersons(false));
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const payload = {
        pickupPersonId: form.pickupPersonId,
        pickupDate: `${form.pickupDate}T10:00`,
        timeSlot: form.timeSlot,
        staff: form.assignedStaff
      };

      await api.put(`/api/admin/ewaste/schedule/${id}`, payload);
      await api.put(`/api/admin/ewaste/update-status/${id}`, {
        status: "SCHEDULED"
      });

      setMessage("Pickup scheduled successfully!");
      setTimeout(() => navigate("/admin/requests"), 1500);

    } catch (err) {
      setError("Failed to schedule pickup");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="assign-pickup-container">
        <div className="assign-content">
          
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
            <h1 className="page-title">Assign & Schedule Pickup</h1>
            <p className="page-subtitle">
              Assign a pickup person and schedule the collection for this request
            </p>
          </div>

          {/* Form Card */}
          <div className="form-card">
            
            {/* Success Alert */}
            {message && (
              <div className="alert alert-success">
                <svg className="alert-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <div className="alert-title">Success!</div>
                  <div className="alert-message">{message}</div>
                </div>
              </div>
            )}

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

            <form onSubmit={handleSubmit} className="assign-form">
              
              {/* Pickup Person */}
              <div className="form-group">
                <label className="form-label">
                  <svg className="label-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Pickup Person
                  <span className="required">*</span>
                </label>
                {loadingPersons ? (
                  <div className="loading-select">
                    <div className="loading-spinner-small"></div>
                    <span>Loading pickup persons...</span>
                  </div>
                ) : (
                  <select
                    className="form-select"
                    name="pickupPersonId"
                    value={form.pickupPersonId}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  >
                    <option value="">-- Select Pickup Person --</option>
                    {pickupPersons.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.email})
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Pickup Date */}
              <div className="form-group">
                <label className="form-label">
                  <svg className="label-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Pickup Date
                  <span className="required">*</span>
                </label>
                <input
                  type="date"
                  className="form-input"
                  name="pickupDate"
                  value={form.pickupDate}
                  onChange={handleChange}
                  disabled={loading}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>

              {/* Time Slot */}
              <div className="form-group">
                <label className="form-label">
                  <svg className="label-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Time Slot
                  <span className="required">*</span>
                </label>
                <select
                  className="form-select"
                  name="timeSlot"
                  value={form.timeSlot}
                  onChange={handleChange}
                  disabled={loading}
                  required
                >
                  <option value="">-- Select Time Slot --</option>
                  <option value="9:00 AM - 11:00 AM">9:00 AM - 11:00 AM</option>
                  <option value="11:00 AM - 1:00 PM">11:00 AM - 1:00 PM</option>
                  <option value="1:00 PM - 3:00 PM">1:00 PM - 3:00 PM</option>
                  <option value="3:00 PM - 5:00 PM">3:00 PM - 5:00 PM</option>
                  <option value="5:00 PM - 7:00 PM">5:00 PM - 7:00 PM</option>
                </select>
              </div>

              {/* Assigned Staff */}
              <div className="form-group">
                <label className="form-label">
                  <svg className="label-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Assigned Staff Name
                  <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className="form-input"
                  name="assignedStaff"
                  placeholder="Enter staff member's full name"
                  value={form.assignedStaff}
                  onChange={handleChange}
                  disabled={loading}
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="submit-section">
                <button 
                  type="submit" 
                  className="submit-button"
                  disabled={loading || loadingPersons}
                >
                  {loading ? (
                    <>
                      <svg className="spinner" viewBox="0 0 24 24">
                        <circle className="spinner-circle" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      </svg>
                      <span>Scheduling Pickup...</span>
                    </>
                  ) : (
                    <>
                      <svg className="button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Schedule Pickup</span>
                    </>
                  )}
                </button>

                <button 
                  type="button" 
                  className="cancel-button"
                  onClick={() => navigate("/admin/requests")}
                  disabled={loading}
                >
                  Cancel
                </button>

                <p className="submit-note">
                  <svg className="note-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  The pickup person will be notified about this assignment
                </p>
              </div>

            </form>

            {/* Info Section */}
            <div className="info-section">
              <h3 className="info-title">Scheduling Guidelines</h3>
              <div className="info-list">
                <div className="info-list-item">
                  <svg className="check-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Choose a date at least 1 day in advance</span>
                </div>
                <div className="info-list-item">
                  <svg className="check-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Ensure pickup person is available for the selected slot</span>
                </div>
                <div className="info-list-item">
                  <svg className="check-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Request status will automatically update to "SCHEDULED"</span>
                </div>
                <div className="info-list-item">
                  <svg className="check-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>User will receive notification about the scheduled pickup</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      <style>{`
        .assign-pickup-container {
          min-height: calc(100vh - 64px);
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          padding: 2rem 1rem;
          margin-top: 64px;
        }

        .assign-content {
          max-width: 700px;
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

        /* Form Card */
        .form-card {
          background: white;
          border-radius: 1.5rem;
          padding: 2.5rem;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
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

        /* Alerts */
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

        .alert-success {
          background: linear-gradient(135deg, #d1fae5, #a7f3d0);
          border: 1px solid #6ee7b7;
        }

        .alert-error {
          background: linear-gradient(135deg, #fee2e2, #fecaca);
          border: 1px solid #fca5a5;
        }

        .alert-icon {
          width: 1.5rem;
          height: 1.5rem;
          flex-shrink: 0;
        }

        .alert-success .alert-icon {
          color: #059669;
        }

        .alert-error .alert-icon {
          color: #dc2626;
        }

        .alert-title {
          font-weight: 700;
          font-size: 0.875rem;
          margin-bottom: 0.25rem;
        }

        .alert-success .alert-title {
          color: #065f46;
        }

        .alert-error .alert-title {
          color: #991b1b;
        }

        .alert-message {
          font-size: 0.875rem;
        }

        .alert-success .alert-message {
          color: #047857;
        }

        .alert-error .alert-message {
          color: #b91c1c;
        }

        /* Form */
        .assign-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: #334155;
        }

        .label-icon {
          width: 1rem;
          height: 1rem;
          color: #f59e0b;
        }

        .required {
          color: #ef4444;
          margin-left: 0.25rem;
        }

        .form-input,
        .form-select {
          width: 100%;
          padding: 0.875rem 1rem;
          font-size: 0.95rem;
          border: 2px solid #e2e8f0;
          border-radius: 0.75rem;
          transition: all 0.3s;
          background: #f8fafc;
          font-family: inherit;
        }

        .form-input:focus,
        .form-select:focus {
          outline: none;
          border-color: #f59e0b;
          background: white;
          box-shadow: 0 0 0 4px rgba(245, 158, 11, 0.1);
        }

        .form-input:disabled,
        .form-select:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .loading-select {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.875rem 1rem;
          background: #f8fafc;
          border: 2px solid #e2e8f0;
          border-radius: 0.75rem;
          color: #64748b;
          font-size: 0.95rem;
        }

        .loading-spinner-small {
          width: 20px;
          height: 20px;
          border: 3px solid #e2e8f0;
          border-top-color: #f59e0b;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Submit Section */
        .submit-section {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 0.5rem;
        }

        .submit-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          width: 100%;
          padding: 1rem;
          font-size: 1.125rem;
          font-weight: 600;
          color: white;
          background: linear-gradient(135deg, #10b981, #059669);
          border: none;
          border-radius: 0.75rem;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
        }

        .submit-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
        }

        .submit-button:active:not(:disabled) {
          transform: translateY(0);
        }

        .submit-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .cancel-button {
          width: 100%;
          padding: 0.875rem;
          font-size: 1rem;
          font-weight: 600;
          color: #64748b;
          background: white;
          border: 2px solid #e2e8f0;
          border-radius: 0.75rem;
          cursor: pointer;
          transition: all 0.3s;
        }

        .cancel-button:hover:not(:disabled) {
          background: #f8fafc;
          border-color: #cbd5e1;
          color: #0f172a;
        }

        .cancel-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .button-icon {
          width: 1.5rem;
          height: 1.5rem;
        }

        .spinner {
          width: 1.5rem;
          height: 1.5rem;
          animation: spin 1s linear infinite;
        }

        .spinner-circle {
          stroke-dasharray: 60;
          stroke-dashoffset: 45;
          animation: spinCircle 1.5s ease-in-out infinite;
        }

        @keyframes spinCircle {
          0% { stroke-dashoffset: 60; }
          50% { stroke-dashoffset: 15; }
          100% { stroke-dashoffset: 60; }
        }

        .submit-note {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: #64748b;
          margin: 0;
          text-align: center;
          justify-content: center;
        }

        .note-icon {
          width: 1rem;
          height: 1rem;
          color: #f59e0b;
          flex-shrink: 0;
        }

        /* Info Section */
        .info-section {
          margin-top: 2.5rem;
          padding-top: 2.5rem;
          border-top: 2px solid #f1f5f9;
        }

        .info-title {
          font-size: 1.125rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 1rem;
        }

        .info-list {
          display: flex;
          flex-direction: column;
          gap: 0.875rem;
        }

        .info-list-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 0.875rem;
          background: linear-gradient(135deg, #f8fafc, #f1f5f9);
          border-radius: 0.75rem;
          font-size: 0.875rem;
          color: #334155;
          transition: all 0.3s;
        }

        .info-list-item:hover {
          transform: translateX(5px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .check-icon {
          width: 1.25rem;
          height: 1.25rem;
          color: #10b981;
          flex-shrink: 0;
          margin-top: 0.125rem;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .page-title {
            font-size: 1.75rem;
          }

          .page-subtitle {
            font-size: 1rem;
          }

          .form-card {
            padding: 1.5rem;
          }

          .submit-button {
            font-size: 1rem;
          }
        }
      `}</style>
    </>
  );
}

export default AssignPickup;

