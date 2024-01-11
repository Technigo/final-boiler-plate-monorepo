import { useNavigate } from 'react-router-dom';
//import style component
//authentication ?! -Mirela
//add logout button

export const AdminDashboard = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <button onClick={() => navigate('/admin/register')}>Register New Admin</button>
            <button onClick={() => navigate('/admin/users')}>List of Users</button>
            <button onClick={() => navigate('/admin/upgrade-user')}>Upgrade User to Admin</button>
            <button onClick={() => navigate('/admin/manage-cocktails')}>Manage Cocktails</button>
            <button onClick={() => navigate('/')}>Home</button>
        </div>
    );
};
