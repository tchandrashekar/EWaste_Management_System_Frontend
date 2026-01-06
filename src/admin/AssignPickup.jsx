

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

  useEffect(() => {
    api.get("/api/admin/ewaste/pickup-persons")
      .then(res => setPickupPersons(res.data))
      .catch(() => setError("Failed to load pickup persons"));
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

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
    }
  };

  return (
    <div className="container-fluid" style={{ paddingTop: "80px", paddingBottom: "60px" }}>
      <div className="row justify-content-center">

        {/* Full-width card on large screens */}
        <div className="col-xl-8 col-lg-10 col-md-12">

          <div className="card shadow-lg border-0 rounded-4">

            {/* Header */}
            <div className="card-header bg-gradient bg-dark text-white text-center py-4 rounded-top-4">
              <h4 className="mb-1">🚚 Assign & Schedule Pickup</h4>
              <small className="text-light">Fill the form to schedule pickup for this request</small>
            </div>

            <div className="card-body px-5 py-5">

              {/* Success & Error Messages */}
              {message && (
                <div className="alert alert-success text-center fw-semibold">
                  {message}
                </div>
              )}
              {error && (
                <div className="alert alert-danger text-center fw-semibold">
                  {error}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit}>

                <div className="mb-4">
                  <label className="form-label fw-semibold">Pickup Person</label>
                  <select
                    className="form-select"
                    name="pickupPersonId"
                    value={form.pickupPersonId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Pickup Person</option>
                    {pickupPersons.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.email})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">Pickup Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="pickupDate"
                    value={form.pickupDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">Time Slot</label>
                  <input
                    type="text"
                    className="form-control"
                    name="timeSlot"
                    placeholder="e.g., 10:00 AM - 12:00 PM"
                    value={form.timeSlot}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-5">
                  <label className="form-label fw-semibold">Assigned Staff</label>
                  <input
                    type="text"
                    className="form-control"
                    name="assignedStaff"
                    placeholder="Enter staff name"
                    value={form.assignedStaff}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="d-grid">
                  <button className="btn btn-success btn-lg shadow">
                    Schedule Pickup
                  </button>
                </div>

              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AssignPickup;
