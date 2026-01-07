
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

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setMsg("");

    try {
      await api.post("/api/admin/ewaste/create", form);
      setMsg("Pickup person created successfully");
      setForm({ name: "", email: "", password: "", phone: "" });
    } catch (error) {
      setErr(error.response?.data || "Creation failed");
    }
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center"
      style={{ marginTop: "90px", marginBottom: "70px" }}
    >
      <div
        className="card shadow-lg border-0 p-4"
        style={{ maxWidth: "520px", width: "100%" }}
      >
        {/* HEADER */}
        <div className="text-center mb-4">
          <h4 className="fw-bold mb-1">➕ Add Pickup Person</h4>
          <p className="text-muted mb-0">
            Create and manage pickup staff accounts
          </p>
        </div>

        {/* ALERTS */}
        {msg && (
          <div className="alert alert-success text-center py-2">
            {msg}
          </div>
        )}
        {err && (
          <div className="alert alert-danger text-center py-2">
            {err}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={submit}>
          {/* NAME */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <div className="input-group">
              <span className="input-group-text">👤</span>
              <input
                className="form-control"
                name="name"
                placeholder="Enter full name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* EMAIL */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Email Address</label>
            <div className="input-group">
              <span className="input-group-text">📧</span>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Enter email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <div className="input-group">
              <span className="input-group-text">🔒</span>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                name="password"
                placeholder="Create a password"
                value={form.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* PHONE */}
          <div className="mb-4">
            <label className="form-label fw-semibold">Phone Number</label>
            <div className="input-group">
              <span className="input-group-text">📞</span>
              <input
                className="form-control"
                name="phone"
                placeholder="Enter phone number"
                value={form.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* BUTTON */}
          <button className="btn btn-primary w-100 fw-semibold py-2">
            Create Pickup Person
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddPickupPerson;
