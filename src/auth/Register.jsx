

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axiosConfig";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: ""
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await api.post("/api/auth/register", form);
      setMessage(res.data);
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setError(err.response?.data || "Registration failed");
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "90vh", paddingTop: "40px", paddingBottom: "40px" }}
    >
      <div className="card shadow-lg p-4" style={{ maxWidth: "450px", width: "100%" }}>
        <h4 className="text-center mb-4 fw-bold">User Registration</h4>

        {message && <div className="alert alert-success text-center">{message}</div>}
        {error && <div className="alert alert-danger text-center">{error}</div>}

        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <input
              className="form-control"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <input
              className="form-control"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="btn btn-success w-100 fw-semibold"
            style={{ transition: "0.3s" }}
            onMouseEnter={e => e.target.classList.add("shadow-sm")}
            onMouseLeave={e => e.target.classList.remove("shadow-sm")}
          >
            Register
          </button>
        </form>

        <p className="text-center mt-4 mb-0">
          Already registered? <Link to="/" className="text-decoration-underline">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
