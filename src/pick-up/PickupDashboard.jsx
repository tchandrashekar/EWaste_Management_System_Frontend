
/*
import {Link} from "react-router-dom"

function PickupDashboard(){
    return(
        <div className="container mt-4">
      <h2>Pickup Person Dashboard</h2>
      <hr />

      <div className="row">
        <div className="col-md-4">
          <div className="card shadow p-3">
            <h5>My Assigned Pickups</h5>
            <p>View and manage assigned pickups</p>
            <Link to="/pickup/my-pickups" className="btn btn-primary">
              View Pickups
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PickupDashboard;
*/

import { Link } from "react-router-dom";

function PickupDashboard() {
  return (
    <div className="container-fluid mt-5 px-5">
      <h2 className="mb-3">Pickup Person Dashboard 🚚</h2>
      <hr />

      <div className="row justify-content-center mt-4">
        <div className="col-lg-10 col-md-12">
          <div className="card shadow-lg border-0 p-5">
            <h4 className="mb-2">My Assigned Pickups</h4>
            <p className="text-muted mb-4">
              View, track, and update the status of your assigned e-waste pickups
            </p>

            <Link to="/pickup/my-pickups" className="btn btn-primary px-4">
              View Pickups
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PickupDashboard;
