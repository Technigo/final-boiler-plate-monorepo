import jwt from 'jsonwebtoken'
import { UserModel } from '../models/UserModel'

export const authenticateUser = async (req, res, next) => {
	// The user's access token is stored under the key "Authorization" in the request header
	const accessToken = req.header('Authorization')

	if (!accessToken) {
		return res
			.status(401)
			.json({ success: false, response: 'Please log in' })
	}

	try {
		const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET)

		const user = await UserModel.findById(decodedToken.userId)
		//		const user = await UserModel.findOne({ accessToken: accessToken })

		if (user) {
			req.user = user //If user has an access token, no need to log in - add user to the request body
			next()
		} else {
			res.status(401).json({ success: false, response: 'Please log in' })
		}
	} catch (error) {
		res.status(500).json({ success: false, response: error.message })
	}
}
