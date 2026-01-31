const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {
  try {
    const { fullName, email, password } = req.body;


    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    
    const user = new User({ fullName, email, password });
    await user.save();

  
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    
    res.status(201).json({ 
      token, 
      user: { id: user._id, fullName: user.fullName } 
    });
  } catch (err) {
    console.error("Registration Error:", err);
    res.status(500).json({ message: "Server error during registration" });
  }
});
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({
      token,
      user: { id: user._id, fullName: user.fullName, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ message: "Server error during login" });
  }
});
router.get('/user-perks/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('claimedPerks');
    res.json(user.claimedPerks || []);
  } catch (err) {
    res.status(500).json({ message: "Sync error" });
  }
});

// Route to handle the "Claim" button click
router.post('/claim-perk', async (req, res) => {
  try {
    const { userId, perkId } = req.body;
    const user = await User.findById(userId);
    if (!user.claimedPerks.includes(perkId)) {
      user.claimedPerks.push(perkId);
      await user.save();
    }
    res.status(200).json({ message: "Perk saved!" });
  } catch (err) {
    res.status(500).json({ message: "Claim failed" });
  }
});

module.exports = router;