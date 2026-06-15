import mongoose from 'mongoose';

const hostelChoices = ['ABH', 'NDPG', 'APJ', 'BCH', 'VMH', 'VVS', 'HJB', 'JCB', 'CVR', 'VLB'];

const reportSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrl: {
      type: String,
    },
    hostelName: {
      type: String,
      required: true,
      enum: hostelChoices,
    },
    attendantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Attendant',
      required: true,
    },
    status: {
      type: String,
      enum: ['Open', 'In Progress', 'Resolved'],
      default: 'Open',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Report', reportSchema);