import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  date: {
    type: String, // "YYYY-MM-DD"
    required: true,
  },
  status: {
    type: String,
    enum: ['present', 'leave'],
    default: 'present',
  },
  markedAt: {
    type: Date,
    default: Date.now,
  },
  location: {
    lat: Number,
    lng: Number,
  },
}, { timestamps: true });

attendanceSchema.index({ student: 1, date: 1 }, { unique: true });

export default mongoose.model('Attendance', attendanceSchema);