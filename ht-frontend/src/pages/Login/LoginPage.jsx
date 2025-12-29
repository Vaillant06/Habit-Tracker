import { useState } from "react";

export default function LoginPage() {
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");

    
    const handleChange = (e) => {
      setUserData({ ...userData, [e.target.name]: e.target.value });
      setError(""); 
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (!userData.email || !userData.password) {
          setError("All fields are required");
    
          setTimeout(() => {
            setError("");
          }, 3000);
    
          return;
        }
    
        console.log("Login Data:", userData);
    };

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
                        placeholder="Create password"
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
                </form>
            </div>
        </div>
        </>
    );
}