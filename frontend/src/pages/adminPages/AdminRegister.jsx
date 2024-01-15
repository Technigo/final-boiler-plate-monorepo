import { useState } from 'react';
import { adminDashStore } from '../../stores/adminDashStore';
import { useNavigate } from 'react-router-dom';

export const AdminRegister = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const { registerNewAdmin, isLoading, errorMessage } = adminDashStore((state) => ({
        registerNewAdmin: state.registerNewAdmin,
        isLoading: state.isLoading,
        errorMessage: state.errorMessage,
    }));

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await registerNewAdmin(username, password, email);
            // Handle success logic here
        } catch (error) {
            console.error('Registration error:', error);
            // Handle the error (e.g., show an error message to the user)
        }
    };
    // Handle post-registration logic here (e.g., navigate, clear form, show success message)

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register New Admin</h2>
            {isLoading && <p>Loading...</p>}
            {errorMessage && <p>Error: {errorMessage}</p>}
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <button type="submit" disabled={isLoading}>Register</button>
            <button type="button" onClick={() => navigate('/admin/dashboard')}>Back to Dashboard</button>
        </form>
    );
};
