import { Link, useNavigate } from 'react-router-dom';
import { adminLoginStore } from '../stores/adminLoginStore';
//import style component

export const AdminDashboard = () => {
    const navigate = useNavigate();
    const { handleAdminLogout } = adminLoginStore((state) => ({
        handleAdminLogout: state.handleAdminLogout,
    }));

    // Logout handler
    const onLogoutClick = () => {
        handleAdminLogout();
        navigate('/admin/login'); // Redirect to login after logout
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <Link to='/admin/register'><button>Register New Admin</button></Link>
            <Link to='/admin/users'><button>List of Users</button></Link>
            <Link to='/admin/upgrade-user'><button>Upgrade User to Admin</button></Link>
            <Link to='/admin/manage-cocktails'><button>Manage Cocktails</button></Link>
            <Link to='/'><button>Home</button></Link>
            <button onClick={onLogoutClick}>Logout</button>
        </div >
    );
};
