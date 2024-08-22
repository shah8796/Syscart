import React, { useState } from "react";
import '../css/login.css';
import Display from "./logsigndisplay";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
    const [usr, setusr] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [type, settype] = useState(''); // Set default type to empty string
    const history = useNavigate();

    async function submit(e) {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/signup", { usr, email, password, type });
            console.log(response.data);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }

            if (response.data.message === 'Email already exists') {
                alert("Email already exists");
            }else if(response.data.message === 'Password must be between 6 and 20 characters'){
                alert(response.data.message);

            } else {
                history('/login'); // Correct way to navigate using react-router-dom v6
            }
        } catch (e) {
            alert('An error occurred: ' + e.message);
        }
    }

    return (
        <div className="container-fluid">
            <div className="row mt-2">
                <div className="col-md-6 d-none d-md-block">
                    <Display />
                </div>
                <div className="col-md-6 d-flex justify-content-center align-items-center">
                    <form className="d-flex flex-column align-items-start frame-759" onSubmit={submit}>
                        <div className="text-dark fs-3 mb-3">Create An Account</div>
                        <div className="text-dark mb-3">Enter your details below</div>
                        <input
                            type="text"
                            className="custom-input mb-3"
                            id="formGroupExampleInput"
                            placeholder="Name"
                            onChange={(e) => setusr(e.target.value)}
                        />
                        <input
                            type="email"
                            className="custom-input mb-3"
                            id="formGroupExampleInput2"
                            placeholder="Enter Email"
                            onChange={(e) => setemail(e.target.value)}
                        />
                        <input
                            type="password"
                            className="custom-input mb-3"
                            id="formGroupExample3"
                            placeholder="Password"
                            onChange={(e) => setpassword(e.target.value)}
                        />
                        <div className="d-flex mb-3">
                            <div className="form-check me-3">
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    id="radio1"
                                    name="optradio"
                                    value="Admin"
                                    checked={type === 'Admin'}
                                    onChange={(e) => settype(e.target.value)}
                                    required
                                />
                                <label className="form-check-label" htmlFor="radio1">Admin</label>
                            </div>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    id="radio2"
                                    name="optradio"
                                    value="Customer"
                                    checked={type === 'Customer'}
                                    onChange={(e) => settype(e.target.value)}
                                    required
                                />
                                <label className="form-check-label" htmlFor="radio2">Customer</label>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-danger btnwidth">Create Account</button>
                        <div className="text-dark mb-3">Already have an account? <Link to="/login">Sign In</Link></div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
