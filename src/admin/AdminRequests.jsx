
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axiosConfig";

const STATUS_FLOW = {
  SUBMITTED: ["APPROVED", "CANCELLED"],
  APPROVED: ["SCHEDULED"],
  SCHEDULED: ["PICKED"],
  PICKED: ["COMPLETED"]
};

const STATUS_LIST = [
  "ALL",
  "SUBMITTED",
  "APPROVED",
  "SCHEDULED",
  "PICKED",
  "COMPLETED",
  "CANCELLED"
];

const statusColor = {
  SUBMITTED: "secondary",
  APPROVED: "primary",
  SCHEDULED: "warning",
  PICKED: "info",
  COMPLETED: "success",
  CANCELLED: "danger"
};

function AdminRequests() {
  const [requests, setRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [view, setView] = useState("card");
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await api.get("/api/admin/ewaste/all");
        setRequests(res.data.slice().reverse());
      } catch (err) {
        console.error("Failed to fetch requests", err);
      }
    };
    fetchRequests();
  }, []);

  const updateStatus = async (id, status) => {
    if (!status) return;
    await api.put(`/api/admin/ewaste/update-status/${id}`, { status });
    setRequests(prev =>
      prev.map(r => (r.id === id ? { ...r, status } : r))
    );
  };

  const filteredRequests = requests.filter(r => {
    const matchesStatus = statusFilter === "ALL" || r.status === statusFilter;
    const searchText = search.toLowerCase();
    const matchesSearch =
      r.userName.toLowerCase().includes(searchText) ||
      r.userEmail.toLowerCase().includes(searchText) ||
      r.deviceType.toLowerCase().includes(searchText) ||
      r.brand.toLowerCase().includes(searchText) ||
      r.model.toLowerCase().includes(searchText);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="container-fluid mt-5 pt-5 px-4">
      {/* Header */}
      <h3 className="fw-bold mb-3">Admin – E-Waste Requests</h3>

      {/* Status Tabs */}
      <ul className="nav nav-pills mb-3 flex-wrap">
        {STATUS_LIST.map(s => (
          <li key={s} className="nav-item me-2 mb-2">
            <button
              className={`nav-link ${statusFilter === s ? "active" : ""}`}
              onClick={() => setStatusFilter(s)}
            >
              {s}
            </button>
          </li>
        ))}
      </ul>

      {/* Search + View toggle */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-2">
        <input
          type="text"
          className="form-control w-100 w-md-50"
          placeholder="Search by user, email, device..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="d-flex gap-2">
          <button
            className={`btn btn-sm ${view === "card" ? "btn-dark" : "btn-outline-dark"}`}
            onClick={() => setView("card")}
          >
            Card View
          </button>
          <button
            className={`btn btn-sm ${view === "table" ? "btn-dark" : "btn-outline-dark"}`}
            onClick={() => setView("table")}
          >
            Table View
          </button>
        </div>
      </div>

      {/* Card View */}
      {view === "card" && (
  <div className="row g-4">
    {filteredRequests.map(r => (
      <div key={r.id} className="col-lg-3 col-md-6">
        <div className="card shadow-sm border-0 h-100">

          <div className="card-header bg-light fw-semibold">
            {r.deviceType} — {r.brand} {r.model}
          </div>

          <div className="card-body small">
            {/* IMAGE */}
            <div className="text-center mb-3">
              {r.imageBase64 ? (
                <img
                  src={`data:image/*;base64,${r.imageBase64}`}
                  alt="E-waste"
                  className="img-fluid rounded shadow-sm"
                  style={{ maxHeight: "160px", objectFit: "cover", cursor: "pointer" }}
                  onClick={() => setModalImage(r.imageBase64)}
                />
              ) : (
                <div
                  className="bg-light rounded d-flex align-items-center justify-content-center"
                  style={{ height: "160px" }}
                >
                  <span className="text-muted small">No Image</span>
                </div>
              )}
            </div>

            {/* DETAILS */}
            <div className="row mb-2">
              <div className="col-4 text-muted">User</div>
              <div className="col-8 fw-semibold">{r.userName}</div>
            </div>

            <div className="row mb-2">
              <div className="col-4 text-muted">Email</div>
              <div className="col-8">{r.userEmail}</div>
            </div>

            <div className="row mb-2">
              <div className="col-4 text-muted">Quantity</div>
              <div className="col-8">{r.quantity}</div>
            </div>

            <div className="row mb-2">
              <div className="col-4 text-muted">Status</div>
              <div className="col-8">
                <span className={`badge bg-${statusColor[r.status]}`}>
                  {r.status}
                </span>
              </div>
            </div>

            {STATUS_FLOW[r.status] && (
              <select
                className="form-select form-select-sm mt-2"
                defaultValue=""
                onChange={e => updateStatus(r.id, e.target.value)}
              >
                <option value="">Update Status</option>
                {STATUS_FLOW[r.status].map(s => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            )}

            {r.status === "APPROVED" && (
              <Link
                to={`/admin/assign/${r.id}`}
                className="btn btn-success btn-sm w-100 mt-3"
              >
                Assign Pickup
              </Link>
            )}
          </div>
        </div>
      </div>
    ))}
  </div>
)}

      {/* Table View */}
      {view === "table" && (
        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead className="table-dark">
              <tr>
                <th>User</th>
                <th>Device</th>
                <th>Qty</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map(r => (
                <tr key={r.id}>
                  <td>
                    {r.userName} <br />
                    <small className="text-muted">{r.userEmail}</small>
                  </td>
                  <td>{r.deviceType} - {r.brand}</td>
                  <td>{r.quantity}</td>
                  <td>
                    <span className={`badge bg-${statusColor[r.status]}`}>
                      {r.status}
                    </span>
                  </td>
                  <td>
                    {STATUS_FLOW[r.status] && (
                      <select
                        className="form-select form-select-sm"
                        onChange={e => updateStatus(r.id, e.target.value)}
                      >
                        <option>Update</option>
                        {STATUS_FLOW[r.status].map(s => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Image Modal */}
      {modalImage && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          onClick={() => setModalImage(null)}
          style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={e => e.stopPropagation()}
          >
            <div className="modal-content bg-transparent border-0">
              <img
                src={`data:image/*;base64,${modalImage}`}
                alt="Preview"
                className="img-fluid rounded"
              />
            </div>
          </div>
        </div>
      )}

      {/* Footer spacing */}
      <div className="mb-5"></div>
    </div>
  );
}

export default AdminRequests;
