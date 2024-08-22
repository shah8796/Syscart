import React, { useState } from "react";
import '../css/login.css';
import Display from "./logsigndisplay";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function submit(e) {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/login", { email, password });

            if (response.status === 200 && response.data.message === 'Email exists') {
                localStorage.setItem('token', response.data.token);
                navigate('/');
            } else if (response.status === 401) {
                alert("Wrong Password");
            } else if (response.status === 404) {
                alert("User doesn't exist");
            } else {
                alert("An unknown error occurred.");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred. Please try again.");
        }
    }

    return (
        <div className="container-fluid">
            <div className="row mt-2">
                <div className="col-md-6 d-none d-md-block">
                    <Display />
                </div>
                <div className="col-md-6 d-flex justify-content-center align-items-center smallbord">
                    <form className="d-flex flex-column align-items-center frame-759" onSubmit={submit}>
                        <div className="text-dark fs-3 mb-3">Log into SysCart</div>
                        <div className="text-dark mb-3">Enter your details below</div>
                        
                        <input
                            type="email"
                            className="custom-input mb-3"
                            id="formGroupExampleInput2"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            className="custom-input mb-3"
                            id="formGroupExample3"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        
                        <button type="submit" className="btn btn-danger btnwidth">Sign In</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;
