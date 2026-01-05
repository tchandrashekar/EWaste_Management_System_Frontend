/*
import { Link } from "react-router-dom";

function AdminDashboard(){
   return (
    <div className="container mt-4">
      <h2>Admin Dashboard 🛠️</h2>
      <hr />

      <div className="row mt-6">
        <div className="col-md-6">
          <div className="card shadow p-5">
            <h5>All E-Waste Requests</h5>
            <p>View and manage all pickup requests</p>
            <Link to="/admin/requests" className="btn btn-primary">
              View Requests
            </Link>
          </div>
        </div>

        
      </div>
    </div>
  );
}
export default AdminDashboard;
*/
import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="container-fluid mt-5 px-5">
      <h2 className="mb-3">Admin Dashboard 🛠️</h2>
      <hr />

      <div className="row justify-content-center mt-4">
        <div className="col-lg-10 col-md-12">
          <div className="card shadow-lg border-0 p-5">
            <h4 className="mb-2">All E-Waste Requests</h4>
            <p className="text-muted mb-4">
              View, approve, schedule, and manage all e-waste pickup requests
            </p>

            <Link to="/admin/requests" className="btn btn-primary px-4">
              View Requests
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
