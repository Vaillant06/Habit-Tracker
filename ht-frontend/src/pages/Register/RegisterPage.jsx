import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setMessage("");
    };
    
    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
      
        if (formData.password !== formData.confirmPassword) {
          setMessage("Passwords do not match");
          setFormData({ ...formData, password: "", confirmPassword: "" });
      
          setTimeout(() => {
            setMessage("");
          }, 3000);
      
          return;
        }
      
        const { username, email, password } = formData;

        try {
            const result = await fetch("http://127.0.0.1:8000/auth/register", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ username, email, password }),
            });

            const data = await result.json();
            if (result.ok) {
                setMessage(`User ${data.username} registered successfully!`);
                setMessageType("success");

                setTimeout(() => {
                    setMessage("");
                    navigate("/");
                }, 3000);
            } else {
                setMessage(data.detail || "Registration failed");
                setMessageType("danger");
            }
            
            console.log(data);
        }

        catch (err) {
            setMessage(err.message);
        }

        setLoading(false);
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
                        autoComplete="off"
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
                        autoComplete="off"
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

                    {message && (
                    <div className={messageType === "success" ? "alert alert-success py-2" : "alert alert-danger py-2"}>
                        {message}
                    </div>
                    )}

                    {loading && (
                    <div className="alert alert-info py-2">
                        <i className="bi bi-hourglass-split me-2"></i>
                        Registering your account, please wait...
                    </div>
                    )}

                    <button className="btn primary w-100 text-white fw-semibold mt-3" type="submit">
                        <i className="bi bi-arrow-right-circle me-2"></i>
                        Register
                    </button>

                    <div className="redirection text-center mt-3">
                        <p>Already have an account? <Link to='/'>Login</Link></p>
                    </div>
                </form>
            </div>
        </div>
        </>
    );
}