import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError("");
    };
    
    async function handleSubmit(e) {
        e.preventDefault();
      
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match");
          setFormData({ ...formData, password: "", confirmPassword: "" });
      
          setTimeout(() => {
            setError("");
          }, 3000);
      
          return;
        }
      
        const { username, email, password } = formData;

        try {
            const result = await fetch("https://habit-tracker-1j63.onrender.com/register", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ username, email, password }),
            });

            const data = await result.json();
            setMessage(data.message);

            if (result.ok) {
                navigate("/");
              }
            
              console.log(data);
        }

        catch (err) {
            setError(err.message);
        }
    };
      

    return (
        <>
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card p-5">
                <h3 className="text-center mb-5  fw-bold">
                    <i className="bi bi-person-plus me-2"></i>
                    Register
                </h3>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label fw-medium">Username</label>
                        <input
                        type="text"
                        className="form-control"
                        placeholder="Enter username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-medium">Email</label>
                        <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-medium">Password</label>
                        <input
                        type="password"
                        className="form-control"
                        placeholder="Create password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-medium">Confirm Password</label>
                        <input
                        type="password"
                        className="form-control"
                        placeholder="Confirm password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
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

                    <button className="btn primary w-100 text-white fw-semibold mt-3" type="submit">
                        <i className="bi bi-arrow-right-circle me-2"></i>
                        Register
                    </button>

                    <div className="redirection text-center mt-3">
                        <p>Already have an account? <Link to='/'>Login</Link></p>
                    </div>
                    
                    {message && (
                    <p>
                        {message}
                    </p>
                    )}

                </form>
            </div>
        </div>
        </>
    );
}