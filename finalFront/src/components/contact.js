import React, { useState } from 'react';
// import { FaPhone, FaEnvelope } from "@fortawesome/free-solid-svg-icons";
import Footer from './footer';
import '../css/contact.css';
import Navbar from './navbar';

function Contacts() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [message, setMessage] = useState('');

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        console.log('Form submitted:', { firstName, lastName, message });
        // Reset form fields
        setFirstName('');
        setLastName('');
        setMessage('');
    };

    return (
        <>
            {/* <Navbar /> */}
            <div className='container-fluid'>
            <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="card1">
                        <div className="card-body">
                            <div className="container">
                                <h3>
                                    {/* <FaPhone /> Call to us */}
                                    Call to us
                                </h3>
                                <p>We are available 24/7</p>
                                <p>+9230011223344</p>

                                <hr />
                                <h3>
                                    {/* <FaEnvelope /> Write to us */}
                                    Write to us
                                </h3>
                                <p>Fill out the form and we will contact you in 24 hours</p>
                                <p>Email: customersupport@syscart.com</p>
                                <p>Email: customersupport1@syscart.com</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="card1">
                        <div className="card-body">
                            <div className="container">
                                <h2>Contact Us</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="firstName">First Name:</label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            className="form-control"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="lastName">Last Name:</label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            className="form-control"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="message">Message:</label>
                                        <textarea
                                            id="message"
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            className="form-control"
                                            rows="4"
                                            required
                                        />
                                    </div>
                                    <div className='buttons'>
                                        <button type="submit" className="btn btn-primary btn-sm">Enter</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>

            
        </>
    );
}

export default Contacts;
