

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axiosConfig";
import { getRoleFromToken } from "../utils/jwtUtils";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

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
      setError(err.response?.data || "Invalid email or password");
    }
  };

  return (
    <div className="min-vh-100 w-100 d-flex row g-0 h-100 w-100">

      {/* LEFT SIDE */}
      <div className="w-50 d-none d-lg-flex flex-column justify-content-center align-items-center bg-dark text-white px-5">
        <h1 className="fw-bold mb-3">♻ Smart E-Waste</h1>
        <p className="fs-5 text-center opacity-75">
          Manage, schedule & track e-waste pickups<br />
          responsibly and digitally.
        </p>

        <div className="mt-4">
          <span className="badge bg-success px-3 py-2 me-2">Secure</span>
          <span className="badge bg-primary px-3 py-2 me-2">Fast</span>
          <span className="badge bg-warning text-dark px-3 py-2">
            Eco-Friendly
          </span>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-50 d-flex justify-content-center align-items-center bg-light">
        <div className="card shadow-lg border-0 p-4" style={{ width: 420 }}>
          <h4 className="fw-bold text-center mb-1">
            Welcome Back 👋
          </h4>
          <p className="text-muted text-center mb-4">
            Login to your account
          </p>

          {error && (
            <div className="alert alert-danger text-center py-2">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label small">Email</label>
              <input
                className="form-control"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label small">Password</label>
              <input
                className="form-control"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button className="btn btn-primary w-100 py-2">
              Login
            </button>
          </form>

          <p className="text-center mt-3 mb-0 small">
            New here?{" "}
            <Link to="/register" className="fw-semibold">
              Create an account
            </Link>
          </p>
        </div>
      </div>

    </div>
  );
}

export default Login;
