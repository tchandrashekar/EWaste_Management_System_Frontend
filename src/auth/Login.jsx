

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axiosConfig";
import { getRoleFromToken } from "../utils/jwtUtils";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/api/auth/login", { email, password });
      const token = res.data.token;

      localStorage.setItem("token", token);
      const role = getRoleFromToken(token);
      localStorage.setItem("role", role);

      if (role === "ADMIN") navigate("/admin");
      else if (role === "USER") navigate("/user");
      else if (role === "PICKUP") navigate("/pickup");

    } catch (err) {
      //setError(err.response?.data || "Invalid email or password");
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (err.response?.data) {
        setError(JSON.stringify(err.response.data));
      } else {
        setError("Invalid email or password");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="login-container">
        {/* LEFT SIDE - Brand Section */}
        <div className="login-brand-section">
          <div className="brand-content">
            <div className="brand-logo-large">
              <div className="logo-circle">
                <span className="logo-icon">♻️</span>
              </div>
              <h1 className="brand-title">Smart E-Waste</h1>
            </div>
            
            <p className="brand-description">
              Manage, schedule & track e-waste pickups responsibly and digitally. 
              Join thousands of users making a difference for our environment.
            </p>

            <div className="feature-badges">
              <div className="feature-badge feature-secure">
                <svg className="badge-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Secure</span>
              </div>
              <div className="feature-badge feature-fast">
                <svg className="badge-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Fast</span>
              </div>
              <div className="feature-badge feature-eco">
                <svg className="badge-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Eco-Friendly</span>
              </div>
            </div>

            <div className="brand-stats">
              <div className="stat">
                <div className="stat-number">10K+</div>
                <div className="stat-label">Active Users</div>
              </div>
              <div className="stat">
                <div className="stat-number">50K+</div>
                <div className="stat-label">Pickups Completed</div>
              </div>
              <div className="stat">
                <div className="stat-number">99%</div>
                <div className="stat-label">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Login Form */}
        <div className="login-form-section">
          <div className="form-container">
            <div className="form-header">
              <h2 className="form-title">Welcome Back 👋</h2>
              <p className="form-subtitle">Login to your account to continue</p>
            </div>

            {error && (
              <div className="error-alert">
                <svg className="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group">
                <label className="form-label">
                  <svg className="label-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                  Email Address
                </label>
                <input
                  className="form-input"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <svg className="label-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Password
                </label>
                <div className="password-input-wrapper">
                  <input
                    className="form-input"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
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
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <svg className="button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>
            </form>

            <div className="form-footer">
              <p className="signup-text">
                New here?{" "}
                <Link to="/register" className="signup-link">
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .login-container {
          display: flex;
          min-height: 100vh;
          width: 100%;
        }

        /* LEFT SIDE - Brand Section */
        .login-brand-section {
          display: none;
          width: 50%;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
          padding: 3rem;
          position: relative;
          overflow: hidden;
        }

        @media (min-width: 1024px) {
          .login-brand-section {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
        }

        .login-brand-section::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%);
          animation: pulse 8s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }

        .brand-content {
          position: relative;
          z-index: 1;
          max-width: 500px;
          text-align: center;
        }

        .brand-logo-large {
          margin-bottom: 2rem;
        }

        .logo-circle {
          width: 100px;
          height: 100px;
          margin: 0 auto 1.5rem;
          background: linear-gradient(135deg, #10b981, #059669);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 40px rgba(16, 185, 129, 0.3);
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .logo-icon {
          font-size: 3rem;
        }

        .brand-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: white;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #ffffff, #10b981);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .brand-description {
          font-size: 1.125rem;
          color: #94a3b8;
          line-height: 1.7;
          margin-bottom: 2.5rem;
        }

        .feature-badges {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 3rem;
        }

        .feature-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          border-radius: 50px;
          font-weight: 600;
          font-size: 0.875rem;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          transition: transform 0.3s;
        }

        .feature-badge:hover {
          transform: translateY(-3px);
        }

        .feature-secure {
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
        }

        .feature-fast {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          color: white;
        }

        .feature-eco {
          background: linear-gradient(135deg, #f59e0b, #d97706);
          color: white;
        }

        .badge-icon {
          width: 1.25rem;
          height: 1.25rem;
        }

        .brand-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .stat {
          text-align: center;
        }

        .stat-number {
          font-size: 2rem;
          font-weight: 800;
          background: linear-gradient(135deg, #10b981, #059669);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-size: 0.875rem;
          color: #64748b;
        }

        /* RIGHT SIDE - Form Section */
        .login-form-section {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          padding: 2rem;
        }

        @media (min-width: 1024px) {
          .login-form-section {
            width: 50%;
          }
        }

        .form-container {
          width: 100%;
          max-width: 460px;
          background: white;
          border-radius: 1.5rem;
          padding: 2.5rem;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
        }

        .form-header {
          margin-bottom: 2rem;
          text-align: center;
        }

        .form-title {
          font-size: 2rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 0.5rem;
        }

        .form-subtitle {
          color: #64748b;
          font-size: 0.95rem;
        }

        .error-alert {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.875rem 1rem;
          background: linear-gradient(135deg, #fee2e2, #fecaca);
          border: 1px solid #fca5a5;
          border-radius: 0.75rem;
          color: #991b1b;
          font-size: 0.875rem;
          margin-bottom: 1.5rem;
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

        .error-icon {
          width: 1.25rem;
          height: 1.25rem;
          flex-shrink: 0;
        }

        .login-form {
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

        .form-input {
          width: 100%;
          padding: 0.875rem 1rem;
          font-size: 0.95rem;
          border: 2px solid #e2e8f0;
          border-radius: 0.75rem;
          transition: all 0.3s;
          background: #f8fafc;
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

        .submit-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          width: 100%;
          padding: 1rem;
          font-size: 1rem;
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
          width: 1.25rem;
          height: 1.25rem;
        }

        .spinner {
          width: 1.25rem;
          height: 1.25rem;
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

        .form-footer {
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid #e2e8f0;
        }

        .signup-text {
          text-align: center;
          font-size: 0.875rem;
          color: #64748b;
          margin: 0;
        }

        .signup-link {
          color: #10b981;
          font-weight: 600;
          text-decoration: none;
          transition: color 0.2s;
        }

        .signup-link:hover {
          color: #059669;
          text-decoration: underline;
        }

        /* Mobile Responsive */
        @media (max-width: 640px) {
          .form-container {
            padding: 1.5rem;
          }

          .form-title {
            font-size: 1.5rem;
          }

          .brand-stats {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }
      `}</style>
    </>
  );
}

export default Login;