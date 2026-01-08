import "./Sidebar.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ username, email }) {
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    function handleLogout() {
        setMessage("Logout Successful!");
        localStorage.clear();

        setTimeout(() => {
            navigate("/");
        }, 3000)
        
    }


    return (
        <>
            <h5>Username : { username }</h5>
            <p>Email : { email }</p>
            <button className="btn btn-danger mx-2" onClick={handleLogout}>Logout</button>
            {message && <p>{message}</p>}
        </>
    )
}