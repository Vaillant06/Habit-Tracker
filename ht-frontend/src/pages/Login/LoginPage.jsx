import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage() {
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [messageType, messageSetType] = useState("");
    const [loading, setLoading] = useState(false);
    
    const handleChange = (e) => {
      setUserData({ ...userData, [e.target.name]: e.target.value });
      setMessage(""); 
    };

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        const {  email, password } = userData;

        try {
            const result = await fetch("http://127.0.0.1:8000/auth/login", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
        
            const data = await result.json();
            setMessage(data.detail);
            messageSetType("failure")
        
            if (result.ok) {
                setMessage(data.message);
                localStorage.setItem("email", email);
                localStorage.setItem("isLoggedIn", "true");
                messageSetType("success");

                setTimeout(() => {
                    setMessage("");
                    navigate("/dashboard");
                }, 3000);
                  
            } else {
                setUserData({ ...userData, email: "", password: "" });
                setTimeout(() => {
                    setMessage("");
                }, 3000)
            }
        

        } catch (err) {
            setMessage(err.message);
        }

        setLoading(false);
    }
      

    return (
        <>
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card p-5">
                <h3 className="text-center mb-5 fw-bold">
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
                        placeholder="Enter your password"
                        name="password"
                        value={userData.password}
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
                        Checking credentials, please wait...
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