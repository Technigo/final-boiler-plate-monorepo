import mongoose from 'mongoose'
import crypto from 'crypto'

const { Schema } = mongoose

const userSchema = new Schema({
	username: {
		type: String,
		required: [true, 'username missing'],
		unique: [true, 'username is already in use'],
		minlength: 2,
	},
	password: {
		type: String,
		required: [true, 'password missing'],
		minlength: 6,
	},
	email: {
		type: String,
		required: [true, 'email missing'],
		unique: [true, 'email already in use'],
	},
	accessToken: {
		type: String,
		default: () => crypto.randomBytes(128).toString('hex'),
	},
	createdAt: {
		type: Date,
		default: new Date(),
	},
})

export const UserModel = mongoose.model('User', userSchema)
export default UserModel
