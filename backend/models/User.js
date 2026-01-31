const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // This line links your user to the deals they claim
  claimedPerks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Deal' }]
});


UserSchema.pre('save', async function() {
  if (!this.isModified('password')) return; // 
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', UserSchema);