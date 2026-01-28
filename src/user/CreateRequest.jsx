

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
  const [imagePreview, setImagePreview] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    
    // Create preview
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  return (
    <>
      <div className="create-request-container">
        <div className="request-content">
          
          {/* Header Section */}
          <div className="page-header">
            <div className="header-icon-wrapper">
              <div className="header-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h1 className="page-title">Create E-Waste Pickup Request</h1>
            <p className="page-subtitle">
              Fill in the details to schedule a responsible pickup for your electronic waste
            </p>
          </div>

          {/* Form Card */}
          <div className="form-card">
            
            {/* Alerts */}
            {message && (
              <div className="alert alert-success">
                <svg className="alert-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <div className="alert-title">Success!</div>
                  <div className="alert-message">{message}</div>
                </div>
              </div>
            )}

            {error && (
              <div className="alert alert-error">
                <svg className="alert-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <div className="alert-title">Error</div>
                  <div className="alert-message">{error}</div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="request-form">
              
              {/* Device Information Section */}
              <div className="form-section">
                <div className="section-header">
                  <div className="section-icon section-icon-green">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="section-title">Device Information</h3>
                    <p className="section-subtitle">Tell us about your e-waste device</p>
                  </div>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">
                      <svg className="label-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      Device Type
                      <span className="required">*</span>
                    </label>
                    <input
                      name="deviceType"
                      className="form-input"
                      placeholder="e.g., Laptop, Mobile, TV"
                      value={form.deviceType}
                      onChange={handleChange}
                      disabled={loading}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <svg className="label-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                      Brand
                      <span className="required">*</span>
                    </label>
                    <input
                      name="brand"
                      className="form-input"
                      placeholder="e.g., Samsung, Apple, Dell"
                      value={form.brand}
                      onChange={handleChange}
                      disabled={loading}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <svg className="label-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      Model
                      <span className="required">*</span>
                    </label>
                    <input
                      name="model"
                      className="form-input"
                      placeholder="e.g., Galaxy S20, iPhone 12"
                      value={form.model}
                      onChange={handleChange}
                      disabled={loading}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <svg className="label-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Condition
                      <span className="required">*</span>
                    </label>
                    <input
                      name="condition"
                      className="form-input"
                      placeholder="e.g., Working, Broken, Partially Working"
                      value={form.condition}
                      onChange={handleChange}
                      disabled={loading}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <svg className="label-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                      </svg>
                      Quantity
                      <span className="required">*</span>
                    </label>
                    <input
                      type="number"
                      min="1"
                      name="quantity"
                      className="form-input"
                      placeholder="Number of items"
                      value={form.quantity}
                      onChange={handleChange}
                      disabled={loading}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Pickup Details Section */}
              <div className="form-section">
                <div className="section-header">
                  <div className="section-icon section-icon-blue">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="section-title">Pickup Details</h3>
                    <p className="section-subtitle">Where should we collect the items?</p>
                  </div>
                </div>

                <div className="form-grid">
                  <div className="form-group form-group-full">
                    <label className="form-label">
                      <svg className="label-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      Pickup Address
                      <span className="required">*</span>
                    </label>
                    <textarea
                      rows="4"
                      name="pickupAddress"
                      className="form-textarea"
                      placeholder="Enter complete address with landmark"
                      value={form.pickupAddress}
                      onChange={handleChange}
                      disabled={loading}
                      required
                    />
                  </div>

                  <div className="form-group form-group-full">
                    <label className="form-label">
                      <svg className="label-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                      </svg>
                      Additional Remarks
                      <span className="optional-tag">Optional</span>
                    </label>
                    <textarea
                      rows="3"
                      name="remarks"
                      className="form-textarea"
                      placeholder="Any special instructions or additional information"
                      value={form.remarks}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>

                  {/* Image Upload */}
                  <div className="form-group form-group-full">
                    <label className="form-label">
                      <svg className="label-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Upload Device Image
                      <span className="optional-tag">Optional</span>
                    </label>
                    
                    {!imagePreview ? (
                      <label className="file-upload-area">
                        <input
                          type="file"
                          accept="image/*"
                          className="file-input-hidden"
                          onChange={handleFileChange}
                          disabled={loading}
                        />
                        <div className="upload-placeholder">
                          <svg className="upload-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          <div className="upload-text">
                            <span className="upload-title">Click to upload image</span>
                            <span className="upload-subtitle">PNG, JPG, JPEG up to 10MB</span>
                          </div>
                        </div>
                      </label>
                    ) : (
                      <div className="image-preview-container">
                        <img src={imagePreview} alt="Preview" className="image-preview" />
                        <button
                          type="button"
                          className="remove-image-btn"
                          onClick={removeImage}
                          disabled={loading}
                        >
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
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
                      <span>Submitting Request...</span>
                    </>
                  ) : (
                    <>
                      <svg className="button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Submit Request</span>
                    </>
                  )}
                </button>

                <p className="submit-note">
                  <svg className="note-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  We'll review your request and get back to you within 24 hours
                </p>
              </div>

            </form>
          </div>

        </div>
      </div>

      <style>{`
        .create-request-container {
          min-height: calc(100vh - 64px);
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          padding: 2rem 1rem;
          margin-top: 64px;
        }

        .request-content {
          max-width: 1000px;
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
          max-width: 600px;
          margin: 0 auto;
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
        .request-form {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }

        .form-section {
          animation: fadeInUp 0.4s ease-out backwards;
        }

        .form-section:nth-child(2) { animation-delay: 0.1s; }
        .form-section:nth-child(3) { animation-delay: 0.2s; }

        .section-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid #f1f5f9;
        }

        .section-icon {
          width: 50px;
          height: 50px;
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .section-icon svg {
          width: 1.75rem;
          height: 1.75rem;
          color: white;
        }

        .section-icon-green {
          background: linear-gradient(135deg, #10b981, #059669);
        }

        .section-icon-blue {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
        }

        .section-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 0.25rem;
        }

        .section-subtitle {
          font-size: 0.875rem;
          color: #64748b;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        @media (max-width: 768px) {
          .form-grid {
            grid-template-columns: 1fr;
          }
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group-full {
          grid-column: 1 / -1;
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

        .form-input,
        .form-textarea {
          width: 100%;
          padding: 0.875rem 1rem;
          font-size: 0.95rem;
          border: 2px solid #e2e8f0;
          border-radius: 0.75rem;
          transition: all 0.3s;
          background: #f8fafc;
          font-family: inherit;
        }

        .form-input:focus,
        .form-textarea:focus {
          outline: none;
          border-color: #10b981;
          background: white;
          box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);
        }

        .form-input:disabled,
        .form-textarea:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .form-textarea {
          resize: vertical;
          min-height: 100px;
        }

        /* File Upload */
        .file-input-hidden {
          display: none;
        }

        .file-upload-area {
          display: block;
          padding: 2rem;
          border: 2px dashed #cbd5e1;
          border-radius: 0.75rem;
          background: #f8fafc;
          cursor: pointer;
          transition: all 0.3s;
        }

        .file-upload-area:hover {
          border-color: #10b981;
          background: rgba(16, 185, 129, 0.05);
        }

        .upload-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .upload-icon {
          width: 3rem;
          height: 3rem;
          color: #64748b;
        }

        .upload-text {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
        }

        .upload-title {
          font-weight: 600;
          color: #334155;
        }

        .upload-subtitle {
          font-size: 0.875rem;
          color: #94a3b8;
        }

        .image-preview-container {
          position: relative;
          border-radius: 0.75rem;
          overflow: hidden;
          border: 2px solid #e2e8f0;
        }

        .image-preview {
          width: 100%;
          max-height: 300px;
          object-fit: contain;
          display: block;
          background: #f8fafc;
        }

        .remove-image-btn {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          width: 2.5rem;
          height: 2.5rem;
          background: rgba(239, 68, 68, 0.9);
          border: none;
          border-radius: 0.5rem;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s;
        }

        .remove-image-btn:hover {
          background: #dc2626;
          transform: scale(1.1);
        }

        .remove-image-btn svg {
          width: 1.25rem;
          height: 1.25rem;
        }

        /* Submit Section */
        .submit-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          margin-top: 1rem;
          padding-top: 2rem;
          border-top: 2px solid #f1f5f9;
        }

        .submit-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          padding: 1rem 3rem;
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
          animation:spin 1s linear infinite;
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
    }

    .note-icon {
      width: 1rem;
      height: 1rem;
      color: #10b981;
    }

    /* Mobile Responsive */
    @media (max-width: 768px) {
      .create-request-container {
        padding: 1.5rem 1rem;
      }

      .page-title {
        font-size: 1.75rem;
      }

      .page-subtitle {
        font-size: 1rem;
      }

      .form-card {
        padding: 1.5rem;
      }

      .section-header {
        flex-direction: column;
        align-items: flex-start;
      }

      .submit-button {
        width: 100%;
        padding: 1rem;
      }
    }
  `}</style>
</>
);
}

export default CreateRequest;