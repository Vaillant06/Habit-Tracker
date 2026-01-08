import "./Dashboard.css"

import HabitCardGrid from "../../components/HabitCardGrid/HabitCardGrid";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";

import { useState, useEffect } from "react";

export default function Dashboard() {
    const [username, setUsername] = useState("");
    const email = localStorage.getItem("email");

    useEffect(() => {
        const getData = async (email) => {
            try {
                const encodedEmail = encodeURIComponent(email);
                const response = await fetch(`http://127.0.0.1:8000/auth/user?email=${encodedEmail}`);

                if(!response.ok) {
                    const errorBody = await response.json();
                    throw new Error(errorBody.detail || "failed to fetch user");
                }

                const data = await response.json();
                setUsername(data.username);

            } catch( error ) {
                setUsername(error.message);
            }
        }

        if(email) {
            getData(email);
        }
    }, [email]);


    return (
        <>
        <Header />
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-4">
                    <Sidebar username={username} email={email}  />
                </div>

                <div className="col-lg-8">
                    <main className="main-content">
                        <p>
                            Create New Habit 
                            <button 
                                className="btn btn-success mx-2"
                                data-bs-toggle="modal"
                                data-bs-target="#createHabitModal"
                            >
                                <i className="bi bi-plus-circle me-1"></i>
                                New
                            </button>
                        </p>
                        <HabitCardGrid />
                    </main>
                </div>
            </div>

            <div className="modal fade" id="createHabitModal" tabIndex="-1">
                <div className="modal-dialog modal-dialog-bottom">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title">Create New Habit</h5>
                            <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            ></button>
                        </div>

                        <div className="modal-body">
                            <input
                            type="text"
                            className="form-control"
                            placeholder="Habit name"
                            />
                        </div>

                        <div className="modal-footer">
                            <button className="btn btn-secondary" data-bs-dismiss="modal">
                                Close
                            </button>
                            <button className="btn btn-primary">Save Habit</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        
        </>
        
    )
}