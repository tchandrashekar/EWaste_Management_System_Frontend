/*
import { useState } from "react";
import { useNavigate ,Link} from "react-router-dom";
import api from "../api/axiosConfig";

function Register(){
    const [form,setForm] =useState({
        name:"",
        email:"",
        password:"",
        phone:"",
    });

    const [message,setMessage] =useState("");
    const [error,setError]=useState("");
    const navigate=useNavigate();

    const handleChange =(e) =>{
        setForm({...form,[e.target.name]:e.target.value });
    };

    const handleRegister =async(e) =>{
        e.preventDefault();
        setError("");
        setMessage("");
        try{
            const res=await api.post("/api/auth/register",form);
            setMessage(res.data);
            setTimeout(()=> navigate("/"),3000);
        }catch(err){
            setError(err.response?.data || "Registration failed");
        }
    };
    return(
       <div className="container mt-5" style={{ maxWidth: 450 }}>
      <h3 className="text-center mb-3">User Registration</h3>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleRegister}>
        <input
          className="form-control mb-2"
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-2"
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-2"
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-3"
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
        />

        <button className="btn btn-success w-100">
          Register
        </button>
      </form>

      <p className="text-center mt-3">
        Already registered? <Link to="/">Login</Link>
      </p>
    </div>
  );
}

export default Register;
*/
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axiosConfig";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: ""
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await api.post("/api/auth/register", form);
      setMessage(res.data);
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setError(err.response?.data || "Registration failed");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div className="card shadow p-4" style={{ width: 420 }}>
        <h4 className="text-center mb-3">User Registration</h4>

        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleRegister}>
          <input className="form-control mb-2" name="name" placeholder="Full Name" onChange={handleChange} required />
          <input className="form-control mb-2" name="email" type="email" placeholder="Email" onChange={handleChange} required />
          <input className="form-control mb-2" name="password" type="password" placeholder="Password" onChange={handleChange} required />
          <input className="form-control mb-3" name="phone" placeholder="Phone Number" onChange={handleChange} />

          <button className="btn btn-success w-100">Register</button>
        </form>

        <p className="text-center mt-3 mb-0">
          Already registered? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
