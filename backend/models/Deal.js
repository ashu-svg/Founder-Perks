const mongoose = require('mongoose');

const DealSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  partnerName: { type: String, required: true },
  category: { type: String, required: true }, 
  isLocked: { type: Boolean, default: false }, 
  benefitValue: { type: String },
  requirement: { type: String }
});

module.exports = mongoose.model('Deal', DealSchema);