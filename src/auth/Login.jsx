/*
import { useState } from "react";
import {useNavigate , Link} from "react-router-dom";
import api from "../api/axiosConfig";
import { getRoleFromToken } from "../utils/jwtUtils";


function Login(){
    const [email,setEmail] = useState("");
    const [password,setPassword]=useState("");
    const [error,setError]=useState("");
    const navigate=useNavigate();

    const handleLogin =async (e) =>{
        e.preventDefault();
        setError("");

        try{
            const res= await api.post("/api/auth/login",{
                email,
                password,
            });

            const token =res.data.token;
            localStorage.setItem("token",token);
           

            const role=getRoleFromToken(token);

            if(role=== "ADMIN") navigate("/admin");
            else if(role === "USER") navigate("/user");
            else if(role === "PICKUP") navigate("/pickup");
            else setError("Unknown role");
        }catch(err){
            setError(err.response?.data || "Login failed");
        }
    };
    return (
       <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h3 className="text-center mb-3">Login</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleLogin}>
        <input
          className="form-control mb-2"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="form-control mb-3"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="btn btn-primary w-100">Login</button>
      </form>

      <p className="text-center mt-3">
        New user? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;
*/

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axiosConfig";
import { getRoleFromToken } from "../utils/jwtUtils";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/api/auth/login", { email, password });
      const token = res.data.token;

      localStorage.setItem("token", token);

      const role = getRoleFromToken(token);
      localStorage.setItem("role", role);

      if (role === "ADMIN") navigate("/admin");
      else if (role === "USER") navigate("/user");
      else if (role === "PICKUP") navigate("/pickup");
      else setError("Unknown role");

    } catch (err) {
      setError(err.response?.data || "Login failed");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div className="card shadow p-4" style={{ width: 380 }}>
        <h4 className="text-center mb-3">Login</h4>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleLogin}>
          <input
            className="form-control mb-3"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="form-control mb-3"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="btn btn-primary w-100">Login</button>
        </form>

        <p className="text-center mt-3 mb-0">
          New user? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
