

import { useEffect, useState } from "react";
import api from "../api/axiosConfig";

function MyRequests() {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await api.get("/api/ewaste/my-requests");
         setRequests(res.data.slice().reverse());
        //setRequests(res.data);
      } catch (err) {
        setError(err.response?.data || "Failed to fetch requests");
      }
    };
    fetchRequests();
  }, []);

  return (
    <div className="container mt-5 pt-4">
      <h3>My E-Waste Requests</h3>
      <hr />

      {error && <div className="alert alert-danger">{error}</div>}

      {requests.length === 0 ? (
        <p>No requests found. <a href="/user/create-request">Create one</a></p>
      ) : (
        <div className="row">
          {requests.map((r) => (
  <div key={r.id} className="col-md-6 mb-4">
    <div className="card h-100">
      <div className="card-body">
        <h5 className="card-title">
          {r.deviceType} - {r.brand} {r.model}
        </h5>

        <p><strong>Condition:</strong> {r.condition}</p>
        <p><strong>Quantity:</strong> {r.quantity}</p>
        <p><strong>Pickup Address:</strong> {r.pickupAddress}</p>
        <p><strong>Remarks:</strong> {r.remarks}</p>
        <p><strong>Status:</strong> {r.status}</p>
        <p><strong>Pickup Date:</strong> {r.pickupDate ? new Date(r.pickupDate).toLocaleString() : "-"}</p>
        <p><strong>Time Slot:</strong> {r.timeSlot || "-"}</p>
        <p><strong>Assigned Staff:</strong> {r.assignedStaff || "-"}</p>

        {r.imageBase64 && (
          <img
            src={`data:image/*;base64,${r.imageBase64}`}
            alt="E-waste"
            className="img-fluid mt-2"
            style={{ maxHeight: "200px" }}
          />
        )}
      </div>
    </div>
  </div>
))}

        </div>
      )}
    </div>
  );
}

export default MyRequests;
