

import { useEffect, useState } from "react";
import api from "../api/axiosConfig";

function MyRequests() {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await api.get("/api/ewaste/my-requests");
        setRequests(res.data.slice().reverse());
      } catch (err) {
        setError(err.response?.data || "Failed to fetch requests");
      }
    };
    fetchRequests();
  }, []);

  const statusColor = (status) => {
    switch (status) {
      case "SUBMITTED": return "secondary";
      case "APPROVED": return "primary";
      case "SCHEDULED": return "info";
      case "PICKED": return "warning";
      case "CANCELLED": return "danger";
      case "COMPLETED": return "success";
      default: return "dark";
    }
  };

  return (
    <div className="container-fluid mt-5 pt-5 pb-5 page-content">
      <h3 className="fw-bold mb-3 text-center">📋 My E-Waste Requests</h3>
      <hr />

      {error && <div className="alert alert-danger">{error}</div>}

      {requests.length === 0 ? (
        <p className="text-center mt-4">
          No requests found.{" "}
          <a href="/user/create-request">Create one</a>
        </p>
      ) : (
        <div className="row g-4">
          {requests.map((r) => (
            <div key={r.id} className="col-lg-6 col-md-12">
              <div className="card shadow-sm h-100 border-0 rounded-4">
                
                {/* Header */}
                <div className="card-header bg-light d-flex justify-content-between align-items-center rounded-top-4">
                  <h6 className="mb-0 fw-semibold">
                    {r.deviceType} — {r.brand} {r.model}
                  </h6>
                  <span className={`badge bg-${statusColor(r.status)} fs-6`}>
                    {r.status}
                  </span>
                </div>

                {/* Body */}
                <div className="card-body">
                  <div className="row mb-2">
                    <div className="col-5 text-muted fw-semibold">📦 Condition</div>
                    <div className="col-7">{r.condition}</div>
                  </div>

                  <div className="row mb-2">
                    <div className="col-5 text-muted fw-semibold">🔢 Quantity</div>
                    <div className="col-7">{r.quantity}</div>
                  </div>

                  <div className="row mb-2">
                    <div className="col-5 text-muted fw-semibold">📅 Pickup Date</div>
                    <div className="col-7">{r.pickupDate ? new Date(r.pickupDate).toLocaleString() : "-"}</div>
                  </div>

                  <div className="row mb-2">
                    <div className="col-5 text-muted fw-semibold">⏰ Time Slot</div>
                    <div className="col-7">{r.timeSlot || "-"}</div>
                  </div>

                  <div className="row mb-2">
                    <div className="col-5 text-muted fw-semibold">🧑‍🔧 Assigned Staff</div>
                    <div className="col-7">{r.assignedStaff || "-"}</div>
                  </div>

                  <div className="row mb-2">
                    <div className="col-5 text-muted fw-semibold">📍 Pickup Address</div>
                    <div className="col-7">{r.pickupAddress}</div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-5 text-muted fw-semibold">📝 Remarks</div>
                    <div className="col-7">{r.remarks || "-"}</div>
                  </div>

                  {/* Image */}
                  {r.imageBase64 && (
                    <div className="text-center mt-3">
                      <img
                        src={`data:image/*;base64,${r.imageBase64}`}
                        alt="E-waste"
                        className="img-fluid rounded shadow-sm"
                        style={{ maxHeight: "220px", cursor: "pointer" }}
                        onClick={() => setPreviewImage(`data:image/*;base64,${r.imageBase64}`)}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Image Modal */}
      {previewImage && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
          onClick={() => setPreviewImage(null)}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body p-0">
                <img src={previewImage} alt="preview" className="img-fluid w-100 rounded" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyRequests;
