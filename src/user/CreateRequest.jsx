/*
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/axiosConfig";



function CreateRequest() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    deviceType: "",
    brand: "",
    model: "",
    condition: "",
    quantity: 1,
    pickupAddress: "",
    remarks: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setImageFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setMessage("");

    try {
      const formData = new FormData();
      Object.keys(form).forEach(key => formData.append(key, form[key]));
      if (imageFile) formData.append("image", imageFile);

      await api.post("/api/ewaste/submit", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("E-waste request submitted successfully");
      setTimeout(() => navigate("/user/my-requests"), 1500);
    } catch (err) {
      setError(err.response?.data || "Failed to submit request");
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: 600 }}>
      <h3>Create E-Waste Pickup Request</h3>
      <hr />
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" name="deviceType" placeholder="Device Type" onChange={handleChange} required />
        <input className="form-control mb-2" name="brand" placeholder="Brand" onChange={handleChange} required />
        <input className="form-control mb-2" name="model" placeholder="Model" onChange={handleChange} required />
        <input className="form-control mb-2" name="condition" placeholder="Condition" onChange={handleChange} required />
        <input className="form-control mb-2" name="quantity" type="number" min="1" onChange={handleChange} required />
        <textarea className="form-control mb-2" name="pickupAddress" placeholder="Pickup Address" onChange={handleChange} required />
        <textarea className="form-control mb-3" name="remarks" placeholder="Remarks" onChange={handleChange} />
        <input type="file" accept="image/*" className="form-control mb-2" onChange={handleFileChange} />
        <button className="btn btn-success w-100">Submit Request</button>
      </form>
    </div>
  );
}

export default CreateRequest;


*/
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/axiosConfig";

function CreateRequest() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    deviceType: "",
    brand: "",
    model: "",
    condition: "",
    quantity: 1,
    pickupAddress: "",
    remarks: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) => setImageFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) =>
        formData.append(key, form[key])
      );
      if (imageFile) formData.append("image", imageFile);

      await api.post("/api/ewaste/submit", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("E-waste request submitted successfully");
      setTimeout(() => navigate("/user/my-requests"), 1500);
    } catch (err) {
      setError(err.response?.data || "Failed to submit request");
    }
  };


   return (
  <div className="container my-5">
    <div className="row justify-content-center">
      <div className="col-lg-15">

        <div className="card shadow-lg border-0">
          <div className="card-header bg-dark text-white text-center py-3">
            <h4 className="mb-0">♻️ Create E-Waste Pickup Request</h4>
          </div>

          <div className="card-body px-5 py-4">

            {message && (
              <div className="alert alert-success text-center mb-4">
                {message}
              </div>
            )}
            {error && (
              <div className="alert alert-danger text-center mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>

              {/* Device Type */}
              <div className="row mb-4 align-items-center">
                <label className="col-md-4 col-form-label fw-semibold">
                  Device Type
                </label>
                <div className="col-md-8">
                  <input
                    name="deviceType"
                    className="form-control"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Brand */}
              <div className="row mb-4 align-items-center">
                <label className="col-md-4 col-form-label fw-semibold">
                  Brand
                </label>
                <div className="col-md-8">
                  <input
                    name="brand"
                    className="form-control"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Model */}
              <div className="row mb-4 align-items-center">
                <label className="col-md-4 col-form-label fw-semibold">
                  Model
                </label>
                <div className="col-md-8">
                  <input
                    name="model"
                    className="form-control"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Condition */}
              <div className="row mb-4 align-items-center">
                <label className="col-md-4 col-form-label fw-semibold">
                  Condition
                </label>
                <div className="col-md-8">
                  <input
                    name="condition"
                    className="form-control"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Quantity */}
              <div className="row mb-4 align-items-center">
                <label className="col-md-4 col-form-label fw-semibold">
                  Quantity
                </label>
                <div className="col-md-8">
                  <input
                    type="number"
                    min="1"
                    name="quantity"
                    className="form-control"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Pickup Address */}
              <div className="row mb-4">
                <label className="col-md-4 col-form-label fw-semibold">
                  Pickup Address
                </label>
                <div className="col-md-8">
                  <textarea
                    rows="3"
                    name="pickupAddress"
                    className="form-control"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Remarks */}
              <div className="row mb-4">
                <label className="col-md-4 col-form-label fw-semibold">
                  Remarks
                </label>
                <div className="col-md-8">
                  <textarea
                    rows="2"
                    name="remarks"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Image */}
              <div className="row mb-5 align-items-center">
                <label className="col-md-4 col-form-label fw-semibold">
                  Upload Image
                </label>
                <div className="col-md-8">
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control"
                    onChange={handleFileChange}
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="text-center">
                <button className="btn btn-success px-5 py-2">
                  Submit Request
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

export default CreateRequest;
