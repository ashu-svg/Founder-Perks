const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Deal = require('./models/Deal'); 

const app = express();


app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  next();
});
app.use(cors());
app.use('/api/auth', require('./routes/auth'));


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(' Local MongoDB Connected'))
  .catch(err => console.error(' Connection Error:', err));


app.get('/api/deals', async (req, res) => {
  try {
    const deals = await Deal.find();
    res.json(deals);
  } catch (err) {
    res.status(500).json({ message: "Error fetching deals" });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});