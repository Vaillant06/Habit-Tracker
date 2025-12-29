import { useState } from "react";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [error, setError] = useState("");


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError("");
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if(formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");

            setTimeout(() => {
                setError("");
            }, 3000)
            return;
        } 
        console.log(formData); 
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

                    <button className="btn primary w-100 text-white fw-semibold mt-3">
                        <i className="bi bi-arrow-right-circle me-2"></i>
                        Register
                    </button>
                </form>
            </div>
        </div>
        </>
    );
}