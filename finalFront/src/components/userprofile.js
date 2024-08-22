import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { decodeToken } from './decodetoken';
import { useNavigate } from 'react-router-dom';
import '../css/userprofile.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const UserProfile = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const user = decodeToken();

    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            toast.success('User Should be Login First');
            setTimeout(() => {
                navigate('/login');
            }, 2000); 
        }
    }, [user, navigate]); 

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8000/profile', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const { username, email } = response.data;
                setUsername(username);
                setEmail(email);
            } catch (error) {
                console.error('Error fetching user profile:', error.response?.data || error.message);
            }
        };

        if (user) {
            fetchUserProfile();
        }
    }, [user]); // Add `user` dependency to only run when `user` changes

    const handleSubmit = async (event) => {
        event.preventDefault();

        const token = localStorage.getItem('token');

        console.log('Sending data to server:', { username, email, currentPassword, newPassword });

        try {
            const response = await axios.put('http://localhost:8000/profile', {
                username,
                email,
                currentPassword,
                newPassword
            }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            console.log('Response data:', response.data);
            toast.success('Profile updated successfully!');
        } catch (error) {
            console.log('Error block reached');
            console.error('Error:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            toast.error('Error updating profile.');
        }
    };

    const handleCancel = () => {
        setUsername('');
        setEmail('');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
    };

    return (
        <div className="userContainer">
            <div className='text1'>Edit Your Profile</div>

            <div className="form-group2 email-address">
                <label className='text2u'>User Name</label>
                <input
                    type="text"
                    className="input-field email"
                    placeholder="User Name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div className="form-group2 email-address">
                <label className='text2u'>Email</label>
                <input
                    type="email"
                    className="input-field email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className='text2u'>Password Changes</div>
            <div className='form-group2'>
                <input
                    type="password"
                    className="input-field"
                    placeholder="Current Password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                />
            </div>
            <div className="form-group2">
                <input
                    type="password"
                    className="input-field"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            </div>
            <div className='form-group2'>
                <input
                    type="password"
                    className="input-field"
                    placeholder="Confirm New Password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
            </div>

            <div className="button-group">
                <button className="btn-secondary" onClick={handleCancel}>Cancel</button>
                <button className="btn-primary" onClick={handleSubmit}>Save Changes</button>
            </div>
            <ToastContainer />
        </div>
    );
};

export default UserProfile;
