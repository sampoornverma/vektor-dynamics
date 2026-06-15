import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const hostelChoices = ['ABH', 'NDPG', 'APJ', 'BCH', 'VMH', 'VVS', 'HJB', 'JCB', 'CVR', 'VLB'];

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		trim: true,
		validate: {
			validator(v) {
				return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
			},
			message: (props) => `${props.value} is not a valid email!`,
		},
	},
	phoneNumber: {
		type: Number,
		unique: true,
		sparse: true,
	},
	googleId: {
		type: String,
		unique: true,
		sparse: true,
	},
	password: {
		type: String,
		required() {
			return !this.googleId;
		},
	},
	roomNumber: {
		type: String,
		required: true,
		trim: true,
	},
	hostelName: {
		type: String,
		required: true,
		enum: hostelChoices,
	},
	item: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'items',
		},
	],
});

// Hash password before saving (only if modified)
userSchema.pre('save', async function preSave() {
	if (!this.isModified('password') || !this.password) return;

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

// Compare password
userSchema.methods.comparePassword = async function comparePassword(candidatePassword) {
	return bcrypt.compare(candidatePassword, this.password);
};

// Create JWT
userSchema.methods.createJWT = function createJWT() {
	const payload = {
		userId: this._id,
		name: this.name,
		email: this.email,
		roomNumber: this.roomNumber,
		hostelName: this.hostelName,
	};

	if (this.phoneNumber !== undefined && this.phoneNumber !== null) {
		payload.phoneNumber = this.phoneNumber;
	}

	return jwt.sign(
		payload,
		process.env.JWT_SECRET,
		{ expiresIn: process.env.JWT_LIFETIME || '1d' }
	);
};

const userDetails = mongoose.model('users', userSchema);
export default userDetails;
