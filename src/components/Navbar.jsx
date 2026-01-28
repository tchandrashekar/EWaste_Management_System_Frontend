
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [isOpen, setIsOpen] = useState(false);

  const logout = () => {
    localStorage.clear();
    navigate("/");
    setIsOpen(false);
  };

  const closeMenu = () => setIsOpen(false);

  const getRoleBadgeColor = () => {
    switch(role) {
      case "ADMIN": return "badge-admin";
      case "USER": return "badge-user";
      case "PICKUP": return "badge-pickup";
      default: return "badge-default";
    }
  };

  return (
    <>
      <nav className="navbar-modern">
        <div className="navbar-container">
          <div className="navbar-content">
            
            {/* Brand Logo */}
            <Link to="/" className="brand-logo" onClick={closeMenu}>
              <div className="brand-icon">♻️</div>
              <span className="brand-text">E-Waste Management</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="desktop-nav">
              
              {/* Navigation Links */}
              {token && role === "USER" && (
                <>
                  <Link to="/user" className="nav-link-modern">
                    <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Dashboard
                  </Link>
                  <Link to="/user/create-request" className="nav-link-modern">
                    <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Create Request
                  </Link>
                  <Link to="/user/my-requests" className="nav-link-modern">
                    <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    My Requests
                  </Link>
                </>
              )}

              {token && role === "ADMIN" && (
                <>
                  <Link to="/admin" className="nav-link-modern">
                    <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Dashboard
                  </Link>
                  <Link to="/admin/requests" className="nav-link-modern">
                    <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Requests
                  </Link>
                  <Link to="/admin/add-pickup" className="nav-link-modern">
                    <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    Add Pickup Person
                  </Link>
                </>
              )}

              {token && role === "PICKUP" && (
                <>
                  <Link to="/pickup" className="nav-link-modern">
                    <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Dashboard
                  </Link>
                  <Link to="/pickup/my-pickups" className="nav-link-modern">
                    <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                    My Pickups
                  </Link>
                </>
              )}

              {/* Auth Buttons */}
              <div className="auth-section">
                {token && (
                  <span className={`role-badge ${getRoleBadgeColor()}`}>
                    {role}
                  </span>
                )}

                {token ? (
                  <button onClick={logout} className="btn-logout">
                    <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Logout</span>
                  </button>
                ) : (
                  <>
                    <Link to="/" className="btn-login">Login</Link>
                    <Link to="/register" className="btn-register">Register</Link>
                  </>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <button onClick={() => setIsOpen(!isOpen)} className="mobile-menu-btn">
              <svg className="menu-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`mobile-menu ${isOpen ? 'mobile-menu-open' : ''}`}>
          <div className="mobile-menu-content">
            
            {token && role === "USER" && (
              <>
                <Link to="/user" onClick={closeMenu} className="mobile-nav-link">
                  <svg className="mobile-nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Dashboard
                </Link>
                <Link to="/user/create-request" onClick={closeMenu} className="mobile-nav-link">
                  <svg className="mobile-nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create Request
                </Link>
                <Link to="/user/my-requests" onClick={closeMenu} className="mobile-nav-link">
                  <svg className="mobile-nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  My Requests
                </Link>
              </>
            )}

            {token && role === "ADMIN" && (
              <>
                <Link to="/admin" onClick={closeMenu} className="mobile-nav-link">
                  <svg className="mobile-nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Dashboard
                </Link>
                <Link to="/admin/requests" onClick={closeMenu} className="mobile-nav-link">
                  <svg className="mobile-nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Requests
                </Link>
                <Link to="/admin/add-pickup" onClick={closeMenu} className="mobile-nav-link">
                  <svg className="mobile-nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Add Pickup Person
                </Link>
              </>
            )}

            {token && role === "PICKUP" && (
              <>
                <Link to="/pickup" onClick={closeMenu} className="mobile-nav-link">
                  <svg className="mobile-nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Dashboard
                </Link>
                <Link to="/pickup/my-pickups" onClick={closeMenu} className="mobile-nav-link">
                  <svg className="mobile-nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                  My Pickups
                </Link>
              </>
            )}

            {/* Mobile Auth */}
            <div className="mobile-auth">
              {token && (
                <div style={{padding: '0.75rem 1rem'}}>
                  <span className={`role-badge ${getRoleBadgeColor()}`}>
                    {role}
                  </span>
                </div>
              )}
              
              {token ? (
                <button onClick={logout} className="mobile-btn-logout">
                  <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Logout</span>
                </button>
              ) : (
                <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                  <Link to="/" onClick={closeMenu} className="mobile-btn-login">Login</Link>
                  <Link to="/register" onClick={closeMenu} className="mobile-btn-register">Register</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <style>{`
        /* Navbar Base Styles */
        .navbar-modern {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 50;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
          border-bottom: 1px solid #334155;
        }

        .navbar-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .navbar-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 4rem;
        }

        /* Brand Logo */
        .brand-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          transition: transform 0.3s;
        }

        .brand-logo:hover .brand-icon {
          transform: rotate(12deg);
        }

        .brand-icon {
          font-size: 1.875rem;
          transition: transform 0.3s;
        }

        .brand-text {
          font-size: 1.25rem;
          font-weight: 700;
          background: linear-gradient(135deg, #10b981, #059669);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Desktop Navigation */
        .desktop-nav {
          display: none;
          align-items: center;
          gap: 0.25rem;
        }

        @media (min-width: 768px) {
          .desktop-nav {
            display: flex;
          }
        }

        .nav-link-modern {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          color: #cbd5e1;
          font-weight: 500;
          border-radius: 0.5rem;
          text-decoration: none;
          transition: all 0.2s;
        }

        .nav-link-modern:hover {
          color: white;
          background-color: rgba(51, 65, 85, 0.5);
          transform: translateY(-1px);
        }

        .nav-icon {
          width: 1rem;
          height: 1rem;
        }

        /* Auth Section */
        .auth-section {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-left: 1rem;
          padding-left: 1rem;
          border-left: 1px solid #475569;
        }

        .role-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 600;
          color: white;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
        }

        .badge-admin {
          background: linear-gradient(135deg, #a855f7, #9333ea);
        }

        .badge-user {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
        }

        .badge-pickup {
          background: linear-gradient(135deg, #10b981, #059669);
        }

        .badge-default {
          background: #6b7280;
        }

        .btn-logout {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: linear-gradient(135deg, #ef4444, #dc2626);
          color: white;
          border: none;
          border-radius: 0.5rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .btn-logout:hover {
          background: linear-gradient(135deg, #dc2626, #b91c1c);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
          transform: scale(1.05);
        }

        .btn-login {
          padding: 0.5rem 1rem;
          color: #cbd5e1;
          font-weight: 500;
          text-decoration: none;
          transition: color 0.2s;
        }

        .btn-login:hover {
          color: white;
        }

        .btn-register {
          padding: 0.5rem 1rem;
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          border-radius: 0.5rem;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.2s;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .btn-register:hover {
          background: linear-gradient(135deg, #059669, #047857);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
          transform: scale(1.05);
        }

        .btn-icon {
          width: 1rem;
          height: 1rem;
        }

        /* Mobile Menu Button */
        .mobile-menu-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem;
          border-radius: 0.5rem;
          color: #94a3b8;
          background: none;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
        }

        .mobile-menu-btn:hover {
          color: white;
          background-color: #334155;
        }

        @media (min-width: 768px) {
          .mobile-menu-btn {
            display: none;
          }
        }

        .menu-icon {
          width: 1.5rem;
          height: 1.5rem;
        }

        /* Mobile Menu */
        .mobile-menu {
          display: block;
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition: all 0.3s ease-in-out;
        }

        .mobile-menu-open {
          max-height: 100vh;
          opacity: 1;
        }

        @media (min-width: 768px) {
          .mobile-menu {
            display: none;
          }
        }

        .mobile-menu-content {
          padding: 0.5rem;
          background: rgba(30, 41, 59, 0.95);
          backdrop-filter: blur(12px);
          border-top: 1px solid #475569;
        }

        .mobile-nav-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          color: #cbd5e1;
          font-weight: 500;
          border-radius: 0.5rem;
          text-decoration: none;
          transition: all 0.2s;
          margin-bottom: 0.25rem;
        }

        .mobile-nav-link:hover {
          color: white;
          background-color: rgba(51, 65, 85, 0.7);
        }

        .mobile-nav-icon {
          width: 1.25rem;
          height: 1.25rem;
        }

        .mobile-auth {
          padding-top: 1rem;
          border-top: 1px solid #475569;
          margin-top: 0.5rem;
        }

        .mobile-btn-logout {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.5rem 0.75rem;
          background: linear-gradient(135deg, #ef4444, #dc2626);
          color: white;
          border: none;
          border-radius: 0.5rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .mobile-btn-logout:hover {
          background: linear-gradient(135deg, #dc2626, #b91c1c);
        }

        .mobile-btn-login {
          display: block;
          width: 100%;
          padding: 0.5rem 0.75rem;
          text-align: center;
          color: #cbd5e1;
          background-color: #334155;
          border-radius: 0.5rem;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.2s;
        }

        .mobile-btn-login:hover {
          color: white;
          background-color: #475569;
        }

        .mobile-btn-register {
          display: block;
          width: 100%;
          padding: 0.5rem 0.75rem;
          text-align: center;
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          border-radius: 0.5rem;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.2s;
        }

        .mobile-btn-register:hover {
          background: linear-gradient(135deg, #059669, #047857);
        }
      `}</style>
    </>
  );
}

export default Navbar;