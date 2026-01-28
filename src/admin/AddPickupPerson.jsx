
import { useState } from "react";
import api from "../api/axiosConfig";

function AddPickupPerson() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: ""
  });

  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setMsg("");
    setLoading(true);

    try {
      await api.post("/api/admin/ewaste/create", form);
      setMsg("Pickup person created successfully");
      setForm({ name: "", email: "", password: "", phone: "" });
    } catch (error) {
      setErr(error.response?.data || "Creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="add-pickup-container">
        <div className="pickup-content">
          
          {/* Header Section */}
          <div className="page-header">
            <div className="header-icon-wrapper">
              <div className="header-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
            </div>
            <h1 className="page-title">Add Pickup Person</h1>
            <p className="page-subtitle">
              Create and manage pickup staff accounts for your team
            </p>
          </div>

          {/* Form Card */}
          <div className="form-card">
            
            {/* Success Alert */}
            {msg && (
              <div className="alert alert-success">
                <svg className="alert-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <div className="alert-title">Success!</div>
                  <div className="alert-message">{msg}</div>
                </div>
              </div>
            )}

            {/* Error Alert */}
            {err && (
              <div className="alert alert-error">
                <svg className="alert-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <div className="alert-title">Error</div>
                  <div className="alert-message">{err}</div>
                </div>
              </div>
            )}

            <form onSubmit={submit} className="pickup-form">
              
              {/* Full Name */}
              <div className="form-group">
                <label className="form-label">
                  <svg className="label-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Full Name
                  <span className="required">*</span>
                </label>
                <input
                  className="form-input"
                  name="name"
                  placeholder="Enter full name"
                  value={form.name}
                  onChange={handleChange}
                  disabled={loading}
                  required
                />
              </div>

              {/* Email */}
              <div className="form-group">
                <label className="form-label">
                  <svg className="label-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                  Email Address
                  <span className="required">*</span>
                </label>
                <input
                  type="email"
                  className="form-input"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  disabled={loading}
                  required
                />
              </div>

              {/* Password */}
              <div className="form-group">
                <label className="form-label">
                  <svg className="label-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Password
                  <span className="required">*</span>
                </label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-input"
                    name="password"
                    placeholder="Create a strong password"
                    value={form.password}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                  >
                    {showPassword ? (
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Phone */}
              <div className="form-group">
                <label className="form-label">
                  <svg className="label-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Phone Number
                  <span className="optional-tag">Optional</span>
                </label>
                <input
                  className="form-input"
                  name="phone"
                  placeholder="Enter phone number"
                  value={form.phone}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              {/* Submit Button */}
              <div className="submit-section">
                <button 
                  type="submit" 
                  className="submit-button"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg className="spinner" viewBox="0 0 24 24">
                        <circle className="spinner-circle" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      </svg>
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <svg className="button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                      <span>Create Pickup Person</span>
                    </>
                  )}
                </button>

                <p className="submit-note">
                  <svg className="note-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  The new pickup person will receive login credentials via email
                </p>
              </div>

            </form>

            {/* Info Section */}
            <div className="info-section">
              <h3 className="info-title">What happens next?</h3>
              <div className="info-grid">
                <div className="info-item">
                  <div className="info-icon info-icon-blue">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="info-item-title">Account Created</div>
                    <div className="info-item-text">Pickup person account is instantly created</div>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon info-icon-green">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="info-item-title">Ready to Work</div>
                    <div className="info-item-text">They can login and start managing pickups</div>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon info-icon-purple">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div>
                    <div className="info-item-title">Secure Access</div>
                    <div className="info-item-text">Login credentials are encrypted and secure</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      <style>{`
        .add-pickup-container {
          min-height: calc(100vh - 64px);
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          padding: 2rem 1rem;
          margin-top: 64px;
        }

        .pickup-content {
          max-width: 600px;
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
          background: linear-gradient(135deg, #10b981, #059669);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 15px 40px rgba(16, 185, 129, 0.5);
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
          background: linear-gradient(135deg, #0f172a, #10b981);
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
        .pickup-form {
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
          color: #10b981;
        }

        .required {
          color: #ef4444;
          margin-left: 0.25rem;
        }

        .optional-tag {
          font-size: 0.75rem;
          font-weight: 400;
          color: #94a3b8;
          margin-left: 0.25rem;
        }

        .form-input {
          width: 100%;
          padding: 0.875rem 1rem;
          font-size: 0.95rem;
          border: 2px solid #e2e8f0;
          border-radius: 0.75rem;
          transition: all 0.3s;
          background: #f8fafc;
          font-family: inherit;
        }

        .form-input:focus {
          outline: none;
          border-color: #10b981;
          background: white;
          box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);
        }

        .form-input:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .password-input-wrapper {
          position: relative;
        }

        .password-input-wrapper .form-input {
          padding-right: 3rem;
        }

        .password-toggle {
          position: absolute;
          right: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #64748b;
          cursor: pointer;
          padding: 0.5rem;
          display: flex;
          align-items: center;
          transition: color 0.2s;
        }

        .password-toggle:hover {
          color: #10b981;
        }

        .password-toggle svg {
          width: 1.25rem;
          height: 1.25rem;
        }

        /* Submit Section */
        .submit-section {
          display: flex;
          flex-direction: column;
          align-items: center;
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

        .button-icon {
          width: 1.5rem;
          height: 1.5rem;
        }

        .spinner {
          width: 1.5rem;
          height: 1.5rem;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
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
        }

        .note-icon {
          width: 1rem;
          height: 1rem;
          color: #10b981;
          flex-shrink: 0;
        }

        /* Info Section */
        .info-section {
          margin-top: 2.5rem;
          padding-top: 2.5rem;
          border-top: 2px solid #f1f5f9;
        }

        .info-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .info-grid {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .info-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1.25rem;
          background: linear-gradient(135deg, #f8fafc, #f1f5f9);
          border-radius: 1rem;
          transition: all 0.3s;
        }

        .info-item:hover {
          transform: translateX(5px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .info-icon {
          width: 50px;
          height: 50px;
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .info-icon svg {
          width: 1.5rem;
          height: 1.5rem;
          color: white;
        }

        .info-icon-blue {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
        }

        .info-icon-green {
          background: linear-gradient(135deg, #10b981, #059669);
        }

        .info-icon-purple {
          background: linear-gradient(135deg, #a855f7, #9333ea);
        }

        .info-item-title {
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 0.25rem;
        }

        .info-item-text {
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

export default AddPickupPerson;