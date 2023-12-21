import { Link } from 'react-router-dom'
import { userStore } from '../store/userStore'
import userIcon from '/user.svg'
import './header.css'

export const Header = () => {
	const isLoggedIn = userStore.getState().isLoggedIn

	return (
		<header className="the-header">
			<div>{<Link to="/">HOME</Link>}</div>
			<div>
				{isLoggedIn ? (
					<img src={userIcon} />
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
