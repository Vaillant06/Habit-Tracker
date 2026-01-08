import "./Header.css";

import { Link } from "react-router-dom";

export default function Header() {
    return (
        <>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
                <h1 class="navbar-brand">HABIT TRACKER</h1>

                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
                <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navMenu">
                <ul class="navbar-nav gap-5 ms-auto">
                    <li class="nav-item">
                    <Link to="#" class="nav-link">Home</Link>
                    </li>
                    <li class="nav-item">
                    <Link to="#" class="nav-link" href="#">Features</Link>
                    </li>
                    <li class="nav-item">
                    <Link to="#" class="nav-link" href="#">Profile</Link>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
        </>
    )
}