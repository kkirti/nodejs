import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    refreshToken: { type: String },
  });

  userSchema.pre('save', async function () {
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  });

  userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
  };

  export default mongoose.model('User', userSchema);