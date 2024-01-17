//A component to display a list of users (might involve fetching data from `/users`).
// Fetch and display user data; 
// possibly with options to perform actions like upgrade or delete.
// also display admins?

import { useEffect } from 'react';
import { adminDashStore } from '../../stores/adminDashStore';
import { useNavigate } from 'react-router-dom';

export const ListUsers = () => {
    const navigate = useNavigate();
    const { users, fetchUsers, isLoadingUsers, usersErrorMessage } = adminDashStore((state) => ({
        users: state.users,
        fetchUsers: state.fetchUsers,
        isLoadingUsers: state.isLoadingUsers,
        usersErrorMessage: state.usersErrorMessage,
    }));

    useEffect(() => {
        fetchUsers(); // Fetch users when the component mounts
    }, [fetchUsers]);

    if (isLoadingUsers) {
        return <p>Loading users...</p>;
    }

    if (usersErrorMessage) {
        return <p>Error: {usersErrorMessage}</p>;
    }

    return (
        <div>
            <h1>List of Users</h1>
            <ul>
                {users.map((user) => (
                    <li key={user._id}>
                        Username: {user.username}, Email: {user.email}, ID: {user._id}, Role: {user.role}
                    </li>
                ))}
            </ul>
            <button onClick={() => navigate('/admin/dashboard')}>Back to Dashboard</button>
        </div>
    );
};