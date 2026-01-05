/*
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axiosConfig";

function AdminRequests() {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAllRequests = async () => {
      try {
        const res = await api.get("/api/admin/ewaste/all");
        setRequests(res.data);
      } catch (err) {
        setError(err.response?.data || "Failed to load requests");
      }
    };
    fetchAllRequests();
  }, []);

  return (
    <div className="container mt-4">
      <h3>All E-Waste Requests</h3>
      <hr />

      {error && <div className="alert alert-danger">{error}</div>}

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>User</th>
            <th>Item</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {requests.map((r) => (
            <tr key={r.id}>
              <td>{r.userName}</td>
              <td>{r.itemName}</td>
              <td>{r.quantity}</td>
              <td>
                <span className="badge bg-info">{r.status}</span>
              </td>
              <td>
                {r.imageUrl && (
                  <img
                    src={r.imageUrl}
                    alt="ewaste"
                    width="80"
                    height="60"
                  />
                )}
              </td>
              <td>
                {r.status === "REQUESTED" ? (
                  <Link
                    to={`/admin/assign/${r.id}`}
                    className="btn btn-sm btn-success"
                  >
                    Assign Pickup
                  </Link>
                ) : (
                  <span className="text-muted">Assigned</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminRequests;
*/

/*imp

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axiosConfig";

function AdminRequests() {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAllRequests = async () => {
      try {
        const res = await api.get("/api/admin/ewaste/all");
        setRequests(res.data);
      } catch (err) {
        setError(err.response?.data || "Failed to load requests");
      }
    };
    fetchAllRequests();
  }, []);

  return (
    <div className="container mt-4">
      <h3>All E-Waste Requests (Admin)</h3>
      <hr />

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row">
        {requests.map((r) => (
          <div key={r.id} className="col-md-6 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">
                  {r.deviceType} - {r.brand} {r.model}
                </h5>

               <p>
  <strong>User:</strong> {r.userName}
  <br />
  <small className="text-muted">{r.userEmail}</small>
</p>

                <p><strong>Condition:</strong> {r.condition}</p>
                <p><strong>Quantity:</strong> {r.quantity}</p>
                <p><strong>Pickup Address:</strong> {r.pickupAddress}</p>
                <p><strong>Remarks:</strong> {r.remarks}</p>

                <p>
                  <strong>Status:</strong>{" "}
                  <span className="badge bg-info">{r.status}</span>
                </p>

                {r.pickupDate && (
                  <p>
                    <strong>Pickup Date:</strong>{" "}
                    {new Date(r.pickupDate).toLocaleString()}
                  </p>
                )}

                {r.assignedStaff && (
                  <p><strong>Assigned Staff:</strong> {r.assignedStaff}</p>
                )}

                {r.imageBase64 && (
                  <img
                    src={`data:image/*;base64,${r.imageBase64}`}
                    alt="E-waste"
                    className="img-fluid mt-2 rounded"
                    style={{ maxHeight: "200px" }}
                  />
                )}
                

                <div className="mt-3">
                  {r.status === "SUBMITTED" ? (
                    <Link
                      to={`/admin/assign/${r.id}`}
                      className="btn btn-sm btn-success"
                    >
                      Assign Pickup
                    </Link>
                  ) : (
                    <span className="text-muted">Already Processed</span>
                  )}
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminRequests;
*/

/*
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axiosConfig";

const STATUS_OPTIONS = [
  "SUBMITTED",
  "APPROVED",
  "SCHEDULED",
  "PICKED",
  "COMPLETED",
  "CANCELLED"
];

function AdminRequests() {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAllRequests();
  }, []);

  const fetchAllRequests = async () => {
    try {
      const res = await api.get("/api/admin/ewaste/all");
      setRequests(res.data);
    } catch (err) {
      setError("Failed to load requests");
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await api.put(`/api/admin/ewaste/update-status/${id}`, {
        status: newStatus
      });

      // 🔄 Update UI instantly
      setRequests(prev =>
        prev.map(r =>
          r.id === id ? { ...r, status: newStatus } : r
        )
      );
    } catch (err) {
      alert("Failed to update status");
    }
  };

  return (
    <div className="container mt-4">
      <h3>All E-Waste Requests (Admin)</h3>
      <hr />

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row">
        {requests.map((r) => (
          <div key={r.id} className="col-md-6 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">
                  {r.deviceType} - {r.brand} {r.model}
                </h5>

                <p>
                  <strong>User:</strong> {r.userName}
                  <br />
                  <small className="text-muted">{r.userEmail}</small>
                </p>

                <p><strong>Condition:</strong> {r.condition}</p>
                <p><strong>Quantity:</strong> {r.quantity}</p>
                <p><strong>Pickup Address:</strong> {r.pickupAddress}</p>
                <p><strong>Remarks:</strong> {r.remarks}</p>

              
                <div className="mb-2">
                  <strong>Status:</strong>
                  <select
                    className="form-select mt-1"
                    value={r.status}
                    onChange={(e) => updateStatus(r.id, e.target.value)}
                  >
                    {STATUS_OPTIONS.map(status => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>

                {r.pickupDate && (
                  <p>
                    <strong>Pickup Date:</strong>{" "}
                    {new Date(r.pickupDate).toLocaleString()}
                  </p>
                )}

               {r.pickupPerson && (
  <p>
    <strong>Pickup Person:</strong> {r.pickupPerson.name}
    <br />
    <small className="text-muted">{r.pickupPerson.email}</small>
  </p>
)}


                {r.imageBase64 && (
                  <img
                    src={`data:image/*;base64,${r.imageBase64}`}
                    alt="E-waste"
                    className="img-fluid mt-2 rounded"
                    style={{ maxHeight: "200px" }}
                  />
                )}

             
                <div className="mt-3">
                  {r.status === "SUBMITTED" ? (
                    <Link
                      to={`/admin/assign/${r.id}`}
                      className="btn btn-sm btn-success"
                    >
                      Assign Pickup
                    </Link>
                  ) : (
                    <span className="text-muted">Already Processed</span>
                  )}
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminRequests;
*/

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axiosConfig";

const STATUS_FLOW = {
  SUBMITTED: ["APPROVED", "CANCELLED"],
  APPROVED: ["SCHEDULED"],
  SCHEDULED: ["PICKED"],
  PICKED: ["COMPLETED"]
};

function AdminRequests() {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAllRequests();
  }, []);

  const fetchAllRequests = async () => {
    try {
      const res = await api.get("/api/admin/ewaste/all");
       setRequests(res.data.slice().reverse());
    } catch {
      setError("Failed to load requests");
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await api.put(`/api/admin/ewaste/update-status/${id}`, {
        status: newStatus
      });

      setRequests(prev =>
        prev.map(r =>
          r.id === id ? { ...r, status: newStatus } : r
        )
      );
    } catch {
      alert("Failed to update status");
    }
  };

  return (
    <div className="container mt-4 pt-5">
      <h3>All E-Waste Requests (Admin)</h3>
      <hr />

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row">
        {requests.map((r) => (
          <div key={r.id} className="col-md-6 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">

                <h5>{r.deviceType} - {r.brand} {r.model}</h5>

                <p>
                  <strong>User:</strong> {r.userName}<br />
                  <small>{r.userEmail}</small>
                </p>

                <p><strong>Status:</strong> {r.status}</p>
                <p><strong>Quantity:</strong> {r.quantity}</p>
                <p><strong>Pickup Address:</strong> {r.pickupAddress}</p>

                {/* 🔒 CONTROLLED STATUS DROPDOWN */}
                {STATUS_FLOW[r.status] && (
                  <select
                    className="form-select mt-2"
                    defaultValue=""
                    onChange={(e) =>
                      updateStatus(r.id, e.target.value)
                    }
                  >
                    <option value="">Update Status</option>
                    {STATUS_FLOW[r.status].map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                )}

                {r.pickupPerson && (
                  <p className="mt-2">
                    <strong>Pickup Person:</strong> {r.pickupPerson.name}<br />
                    <small>{r.pickupPerson.email}</small>
                  </p>
                )}

                {r.imageBase64 && (
                  <img
                    src={`data:image/*;base64,${r.imageBase64}`}
                    className="img-fluid rounded mt-2"
                    style={{ maxHeight: 200 }}
                  />
                )}

                {/* ✅ ASSIGN ONLY AFTER APPROVAL */}
                {r.status === "APPROVED" && (
                  <Link
                    to={`/admin/assign/${r.id}`}
                    className="btn btn-success btn-sm mt-3"
                  >
                    Assign Pickup
                  </Link>
                )}

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminRequests;
