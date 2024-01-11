import { Link } from 'react-router-dom'
import { userStore } from '../store/userStore'
import userIcon from '/user.svg'

import './Header.css'

export const Header = () => {
	const isLoggedIn = userStore.getState().isLoggedIn

	return (
		<header className="the-header page-section" id="the-header">
			<div>{<Link to="/"><h3>CINEMA FK</h3></Link>}</div>

			<div className="the-nav-bar">
				<Link to="/about">
					<button>About</button>
				</Link>

				<button>Movies</button>

				{isLoggedIn ? (
					<Link to="/user">
						<button>User Page</button>
					</Link>
				) : (
					<>
						<Link to="/login">
							<button className="the-login-button">
								<img
									src={userIcon}
									className="login-icon"
								/>
								Login
							</button>
						</Link>
					</>
				)}
			</div>
		</header>
	)
}
