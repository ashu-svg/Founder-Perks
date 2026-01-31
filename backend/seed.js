const mongoose = require('mongoose');
const Deal = require('./models/Deal');
require('dotenv').config();

const initialDeals = [
  {
    title: "AWS Cloud Credits",
    description: "Get up to $5,000 in credits for your first year as an early-stage startup.",
    partnerName: "Amazon Web Services",
    category: "Cloud",
    isLocked: true, 
    benefitValue: "$5,000 Credits",
    requirement: "Must have raised less than $1M in funding."
  },
  {
    title: "Notion for Startups",
    description: "6 months of Notion Plus for free with unlimited AI usage.",
    partnerName: "Notion",
    category: "Productivity",
    isLocked: false, 
    benefitValue: "6 Months Free",
    requirement: "Available for all new accounts."
  }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await Deal.deleteMany(); 
    await Deal.insertMany(initialDeals);
    console.log("✅ Database Seeded with Startup Deals!");
    process.exit();
  });