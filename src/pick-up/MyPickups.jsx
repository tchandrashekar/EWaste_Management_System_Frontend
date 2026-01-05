

import { useEffect, useState } from "react";
import api from "../api/axiosConfig";

function MyPickups() {
  const [pickups, setPickups] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPickups();
  }, []);

  const fetchPickups = async () => {
    try {
      const res = await api.get("/api/pickup/ewaste/my-pickups");
       //setRequests(res.data.slice().reverse());
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

  return (
    <div className="container mt-4 pt-5">
      <h3>My Assigned Pickups</h3>
      <hr />

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row">
        {pickups.map(p => (
          <div key={p.id} className="col-md-6 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">

                <h5 className="card-title">
                  {p.deviceType} - {p.brand} {p.model}
                </h5>

                <p>
                  <strong>User:</strong> {p.userName}<br />
                  <small className="text-muted">{p.userEmail}</small><br />
                  <small className="text-muted">📞 {p.userPhone}</small>
                </p>

                <p><strong>Address:</strong> {p.pickupAddress}</p>
                <p><strong>Quantity:</strong> {p.quantity}</p>
                <p><strong>Condition:</strong> {p.condition}</p>

                <p>
                  <strong>Pickup:</strong><br />
                  {p.pickupDate?.split("T")[0]} 
                </p>
                <p>
                    <strong>Pickup Time:</strong><br/>
                    {p.pickupTimeSlot}
                </p>

                <p><strong>Assigned Staff:</strong> {p.assignedStaff}</p>

                <p>
                  <strong>Status:</strong>{" "}
                  <span className="badge bg-info">{p.status}</span>
                </p>

                {p.imageBase64 && (
                  <img
                    src={`data:image/*;base64,${p.imageBase64}`}
                    alt="ewaste"
                    className="img-fluid rounded mt-2"
                    style={{ maxHeight: "200px" }}
                  />
                )}

                {p.status === "SCHEDULED" && (
                  <button
                    className="btn btn-success btn-sm mt-3"
                    onClick={() => markPicked(p.id)}
                  >
                    Mark Picked
                  </button>
                )}

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyPickups;
