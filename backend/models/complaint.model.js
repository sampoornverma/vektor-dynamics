import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true,
	},
	description: {
		type: String,
		required: true,
		trim: true,
	},
	category: {
		type: String,
		required: true,
		trim: true,
	},
	images: [{
		type: String, // URLs from Cloudinary
	}],
	status: {
		type: String,
		enum: ['pending', 'resolved'],
		default: 'pending',
	},
	raisedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users',
		required: true,
	},
}, {
	timestamps: true,
});

const Complaint = mongoose.model('complaints', complaintSchema);
export default Complaint;