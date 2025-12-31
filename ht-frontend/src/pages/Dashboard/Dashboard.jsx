import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        const email = localStorage.getItem("email");

        if (!isLoggedIn || !email) {
            navigate("/");
            return;
        }

        async function fetchUser() {
            const res = await fetch(`https://habit-tracker-1j63.onrender.com/user/${email}`);
            const data = await res.json();

            if (res.ok) {
                setUser(data);
            }
        }

        fetchUser();
    }, []);
    
    if (!user) return <p className="mt-5 text-center">Loading user data...</p>;

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card p-5">
                <h1 className="card-title">Profile</h1>
                <h4 className="fw-bold">Name : {user.username}</h4>
                <p className="text-muted">Email : {user.email}</p>

                <button className="btn btn-danger mt-3"
                    onClick={() => {
                    localStorage.clear();
                    navigate("/");
                    }}>
                    Logout
                </button>
            </div>
        </div>
    );
}