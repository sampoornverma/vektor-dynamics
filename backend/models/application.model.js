import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
	},
	role: {
		type: String,
		required: true,
		trim: true,
	},
	message: {
		type: String,
		trim: true,
	},
	resumePath: {
		type: String,
		trim: true,
	},
}, {
	timestamps: true,
});

const Application = mongoose.model('Application', applicationSchema);
export default Application;
