//A form to select a user and upgrade them to admin
// A form to select a user and send a `POST` request to `/admin/upgradeUser`.
// After an admin performs an action (like registering a new admin), you might want to navigate them back to the `AdminDashboard` or show a success message. This can be done using the `useNavigate` hook and state management within each component.

import { useState } from 'react';
import { adminStore } from '../../stores/adminStore';
import { useNavigate } from 'react-router-dom';


export const UpgradeUser = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState('');
    const { upgradeUserToAdmin } = adminStore((state) => ({
        upgradeUserToAdmin: state.upgradeUserToAdmin
    }));

    const handleSubmit = (event) => {
        event.preventDefault();
        upgradeUserToAdmin(userId);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Upgrade User to Admin</h2>
            <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="User ID" required />
            <button type="submit">Upgrade User</button>
            <button onClick={() => navigate('/admin/dashboard')}>Back to Dashboard</button>
        </form>
    );
};
