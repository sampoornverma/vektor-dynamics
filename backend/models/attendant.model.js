import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const hostelChoices = ['ABH', 'NDPG', 'APJ', 'BCH', 'VMH', 'VVS', 'HJB', 'JCB', 'CVR', 'VLB'];

const attendantSchema = new mongoose.Schema({
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
        // Cleaned up the regex escaping here as well
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  password: {
    type: String,
    required: true,
  },
  hostelName: {
    type: String,
    required: true,
    enum: hostelChoices,
  },
});

attendantSchema.pre('save', async function preSave() {
  // 1. Removed 'next' from the function arguments and return statement
  if (!this.isModified('password')) return;
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  // 2. Removed the final next() call
});

attendantSchema.methods.comparePassword = async function comparePassword(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

attendantSchema.methods.createJWT = function createJWT() {
  return jwt.sign(
    {
      userId: this._id,
      name: this.name,
      email: this.email,
      hostelName: this.hostelName,
      role: 'attendant',
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME || '1d' }
  );
};

export default mongoose.model('Attendant', attendantSchema);