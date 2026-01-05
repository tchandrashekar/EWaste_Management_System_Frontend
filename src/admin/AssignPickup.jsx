
/*
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

function AssignPickup() {
  const { id } = useParams(); // ewaste ID
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
    const fetchPickupPersons = async () => {
      try {
        const res = await api.get("/api/admin/pickup-persons");
        setPickupPersons(res.data);
      } catch {
        setError("Failed to load pickup persons");
      }
    };
    fetchPickupPersons();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const payload = {
        pickupPersonId: form.pickupPersonId,
        pickupDate: `${form.pickupDate}T10:00`, // convert to LocalDateTime
        timeSlot: form.timeSlot,
        staff: form.assignedStaff
      };

      await api.put(`/api/admin/ewaste/schedule/${id}`, payload);

      setMessage("Pickup scheduled successfully!");
      setTimeout(() => navigate("/admin/requests"), 1500);
    } catch (err) {
      setError(err.response?.data || "Failed to assign pickup");
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: 600 }}>
      <h3>Assign Pickup</h3>
      <hr />

      {error && <div className="alert alert-danger">{error}</div>}
      {message && <div className="alert alert-success">{message}</div>}

      <form onSubmit={handleSubmit}>
        <select
          className="form-select mb-2"
          name="pickupPersonId"
          value={form.pickupPersonId}
          onChange={handleChange}
          required
        >
          <option value="">Select Pickup Person</option>
          {pickupPersons.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} ({p.email})
            </option>
          ))}
        </select>

        <input
          type="date"
          className="form-control mb-2"
          name="pickupDate"
          value={form.pickupDate}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          className="form-control mb-2"
          name="timeSlot"
          placeholder="Time Slot (e.g., 10 AM - 12 PM)"
          value={form.timeSlot}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          className="form-control mb-2"
          name="assignedStaff"
          placeholder="Assigned Staff"
          value={form.assignedStaff}
          onChange={handleChange}
          required
        />

        <button className="btn btn-success w-100">
          Schedule Pickup
        </button>
      </form>
    </div>
  );
}

export default AssignPickup;
*/

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

      // 🔁 AUTO UPDATE STATUS
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
    <div className="container mt-4" style={{ maxWidth: 600 }}>
      <h3>Assign Pickup</h3>
      <hr />

      {error && <div className="alert alert-danger">{error}</div>}
      {message && <div className="alert alert-success">{message}</div>}

      <form onSubmit={handleSubmit}>

        <select
          className="form-select mb-2"
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

        <input
          type="date"
          className="form-control mb-2"
          name="pickupDate"
          value={form.pickupDate}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          className="form-control mb-2"
          name="timeSlot"
          placeholder="Time Slot"
          value={form.timeSlot}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          className="form-control mb-2"
          name="assignedStaff"
          placeholder="Assigned Staff"
          value={form.assignedStaff}
          onChange={handleChange}
          required
        />

        <button className="btn btn-success w-100">
          Schedule Pickup
        </button>
      </form>
    </div>
  );
}

export default AssignPickup;
