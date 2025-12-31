import { Link } from "react-router-dom";

export default function Dashboard() {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card p-5">
                <h3 className="card-title">Profile</h3>
                <h5 className="card-body">Name: USER</h5>
                <h5 className="card-body">Email: user@gmail.com</h5>
                <h5 className="card-body">Last Login: 31 December</h5>
                <div className="d-flex justify-content-center mt-4">
                    <Link to="/login" className="btn btn-primary">
                        Logout
                    </Link>
                </div>
            </div>   
        </div>
    );
}