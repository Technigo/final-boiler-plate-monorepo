import { useState } from 'react';
import { adminStore } from '../../stores/adminStore';
import { useNavigate } from 'react-router-dom';

export const AdminRegister = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const { registerNewAdmin, isLoading, errorMessage } = adminStore((state) => ({
        registerNewAdmin: state.registerNewAdmin,
        isLoading: state.isLoading,
        errorMessage: state.errorMessage,
    }));

    const handleSubmit = async (event) => {
        event.preventDefault();
        await registerNewAdmin(username, password, email);
        // Handle post-registration logic here (e.g., navigate, clear form, show success message)
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register New Admin</h2>
            {isLoading && <p>Loading...</p>}
            {errorMessage && <p>Error: {errorMessage}</p>}
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <button type="submit" disabled={isLoading}>Register</button>
            {/* Consider removing this button if navigation is handled post-registration */}
            <button type="button" onClick={() => navigate('/admin/dashboard')}>Back to Dashboard</button>
        </form>
    );
};
