import { Route } from 'react-router-dom'
import { Home } from '../pages/Home'
import { Login } from '../pages/Login'
import { Register } from '../pages/Register'
import { Booking } from '../pages/Booking'
import { UserProfile } from '../pages/UserProfile'
import { Movie } from '../pages/Movie'
import { NotFound } from '../pages/NotFound'

const routes = (
	<>
		<Route
			path="/"
			element={<Home />}
		/>
		<Route
			path="/login"
			element={<Login />}
		/>
		<Route
			path="/register"
			element={<Register />}
		/>
		<Route
			path="/booking"
			element={<Booking />}
		/>
		<Route
			path="/:movie"
			element={<Movie />}
		/>
		<Route
			path="/user-profile/:userId"
			element={<UserProfile />}
		/>
		<Route
			path="*"
			element={<NotFound />}
		/>
	</>
)

export default routes
