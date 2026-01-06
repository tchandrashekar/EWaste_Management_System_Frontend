

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
    <div className="page-content">
  <div className="container-fluid px-4">
    <div className="row justify-content-center">
      <div className="col-12 col-xxl-10">


          <div className="card shadow-lg border-0 rounded-4">

            {/* Header */}
            <div className="card-header bg-dark text-white text-center py-4 rounded-top-4">
              <h4 className="mb-1">♻️ Create E-Waste Pickup Request</h4>
              <small className="text-light">
                Fill in the details to schedule a responsible pickup
              </small>
            </div>

            <div className="card-body p-5">

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

              <form onSubmit={handleSubmit}>

                {/* Section: Device Details */}
                <h6 className="fw-bold text-success mb-3">
                  📱 Device Information
                </h6>

                <div className="row g-4 mb-4">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Device Type
                    </label>
                    <input
                      name="deviceType"
                      className="form-control"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Brand
                    </label>
                    <input
                      name="brand"
                      className="form-control"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Model
                    </label>
                    <input
                      name="model"
                      className="form-control"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Condition
                    </label>
                    <input
                      name="condition"
                      className="form-control"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Quantity
                    </label>
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

                <hr />

                {/* Section: Pickup Details */}
                <h6 className="fw-bold text-primary mb-3">
                  📍 Pickup Details
                </h6>

                <div className="row g-4 mb-4">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Pickup Address
                    </label>
                    <textarea
                      rows="3"
                      name="pickupAddress"
                      className="form-control"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Remarks (optional)
                    </label>
                    <textarea
                      rows="3"
                      name="remarks"
                      className="form-control"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Upload Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      className="form-control"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>

                {/* Submit */}
                <div className="text-center mt-5">
                  <button className="btn btn-success btn-lg px-5 shadow">
                    Submit Request
                  </button>
                </div>

              </form>
            </div>
          </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default CreateRequest;

