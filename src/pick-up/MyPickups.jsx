
import { useEffect, useState } from "react";
import api from "../api/axiosConfig";

function MyPickups() {
  const [pickups, setPickups] = useState([]);
  const [error, setError] = useState("");
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    fetchPickups();
  }, []);

  const fetchPickups = async () => {
    try {
      const res = await api.get("/api/pickup/ewaste/my-pickups");
      setPickups(res.data.slice().reverse());
    } catch {
      setError("Failed to load pickups");
    }
  };

  const markPicked = async (id) => {
    try {
      await api.put(`/api/pickup/ewaste/picked/${id}`);
      fetchPickups();
    } catch {
      alert("Failed to mark as picked");
    }
  };

  const statusColor = {
    SCHEDULED: "bg-warning text-dark",
    PICKED: "bg-primary",
    COMPLETED: "bg-success"
  };

  return (
    <div className="container-fluid" style={{ paddingTop: "80px", paddingBottom: "60px" }}>
      
      {/* Header */}
      <div className="mb-4 text-center">
        <h3 className="fw-bold">🚚 My Assigned Pickups</h3>
        <p className="text-muted mb-0">View and manage your e-waste pickups</p>
        <hr />
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row g-4">
        {pickups.map(p => (
          <div key={p.id} className="col-xl-4 col-lg-6 col-md-12">
            <div className="card shadow-sm border-0 h-100">

              {/* IMAGE */}
              {p.imageBase64 ? (
                <img
                  src={`data:image/*;base64,${p.imageBase64}`}
                  alt="ewaste"
                  className="img-fluid rounded-top"
                  style={{
                    height: "220px",
                    objectFit: "cover",
                    cursor: "pointer"
                  }}
                  onClick={() => setPreviewImage(`data:image/*;base64,${p.imageBase64}`)}
                />
              ) : (
                <div
                  className="bg-light rounded-top d-flex justify-content-center align-items-center"
                  style={{ height: "220px" }}
                >
                  <span className="text-muted small">No Image</span>
                </div>
              )}

              <div className="card-body small">

                {/* HEADER */}
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h6 className="fw-semibold mb-0">
                    {p.deviceType} — {p.brand} {p.model}
                  </h6>
                  <span className={`badge ${statusColor[p.status]}`}>
                    {p.status}
                  </span>
                </div>

                <hr />

                {/* DETAILS GRID */}
                <div className="row mb-2">
                  <div className="col-5 text-muted">👤 User</div>
                  <div className="col-7 fw-semibold">{p.userName}</div>
                </div>

                <div className="row mb-2">
                  <div className="col-5 text-muted">📧 Email</div>
                  <div className="col-7">{p.userEmail}</div>
                </div>

                <div className="row mb-2">
                  <div className="col-5 text-muted">📞 Phone</div>
                  <div className="col-7">{p.userPhone}</div>
                </div>

                <div className="row mb-2">
                  <div className="col-5 text-muted">📍 Address</div>
                  <div className="col-7">{p.pickupAddress}</div>
                </div>

                <div className="row mb-2">
                  <div className="col-5 text-muted">📦 Quantity</div>
                  <div className="col-7">{p.quantity}</div>
                </div>

                <div className="row mb-2">
                  <div className="col-5 text-muted">⚙ Condition</div>
                  <div className="col-7">{p.condition}</div>
                </div>

                <div className="row mb-2">
                  <div className="col-5 text-muted">📅 Date</div>
                  <div className="col-7">{p.pickupDate?.split("T")[0]}</div>
                </div>

                <div className="row mb-3">
                  <div className="col-5 text-muted">⏰ Time</div>
                  <div className="col-7">{p.pickupTimeSlot}</div>
                </div>

                <div className="row mb-3">
                  <div className="col-5 text-muted">🧑‍🔧 Staff</div>
                  <div className="col-7">{p.assignedStaff}</div>
                </div>

                {/* ACTION */}
                {p.status === "SCHEDULED" && (
                  <button
                    className="btn btn-success btn-sm w-100"
                    onClick={() => markPicked(p.id)}
                  >
                    ✅ Mark as Picked
                  </button>
                )}

              </div>
            </div>
          </div>
        ))}
      </div>

      {/* IMAGE MODAL */}
      {previewImage && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
          onClick={() => setPreviewImage(null)}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered" onClick={e => e.stopPropagation()}>
            <div className="modal-content border-0 bg-transparent p-0">
              <img
                src={previewImage}
                alt="preview"
                className="img-fluid w-100 rounded"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyPickups;
