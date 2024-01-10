import { Link } from 'react-router-dom'
import { userStore } from '../store/userStore'
import userIcon from '/user.svg'
import './Header.css'

export const Header = () => {
	const isLoggedIn = userStore.getState().isLoggedIn

	return (

		<header className="the-header page-section">
			<div>{<Link to="/">HOME</Link>}</div>

			<div>
				{isLoggedIn ? (
					<Link to="/user">
						<img src={userIcon} />
					</Link>
				) : (
					<>
						<Link to="/login">
							<img
								src={userIcon}
								className="login-icon"
							/>
						</Link>
					</>
				)}
			</div>
		</header>
	)
}
