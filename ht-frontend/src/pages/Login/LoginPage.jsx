import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage() {
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    
    const handleChange = (e) => {
      setUserData({ ...userData, [e.target.name]: e.target.value });
      setError(""); 
    };

    async function handleSubmit(e) {
        e.preventDefault();
      
        const { username, email, password } = userData;

        try {
            const result = await fetch("http://127.0.0.1:5000/login", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ username, email, password }),
              });
            
              const data = await result.json();
            
              if (result.ok) {
                navigate("/dashboard");  
              }
              else{
                setError(data.message);
              }
            
              console.log(data);
        }

        catch (err) {
            setError(err.message);
        }
    }
      

    return (
        <>
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card p-5">
                <h3 className="text-center mb-5  fw-bold">
                    <i className="bi bi-person me-2"></i>
                    Login
                </h3>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label fw-medium">Email</label>
                        <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-medium">Password</label>
                        <input
                        type="password"
                        className="form-control"
                        placeholder="Enter your password"
                        name="password"
                        value={userData.password}
                        onChange={handleChange}
                        required
                        />
                    </div>

                    {error && (
                    <div className="alert alert-danger py-2">
                        <i className="bi bi-exclamation-triangle me-2"></i>
                        {error}
                    </div>
                    )}

                    <button className="btn primary w-100 text-white fw-semibold mt-3">
                        <i className="bi bi-arrow-right-circle me-2"></i>
                        Login
                    </button>

                    <div className="redirection text-center mt-3">
                        <p>Don't have an account? <Link to="/register">Register</Link></p>
                    </div>
                </form>
            </div>
        </div>
        </>
    );
}