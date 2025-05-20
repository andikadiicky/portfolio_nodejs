const mongoose = require('mongoose');
// Subdocument schema for individual work experiences
const PortfolioSchema = new mongoose.Schema({
  portfolio_id: {
    type: String,
    required: true
  },
  info: {
    type: String,
    required: true
  },
  img_portfolio_src: {
    type: String,
    required: true
  },
  project: {
    type: String,
    required: true
  },
  project_responsibilities: {
    type: [String],
    required: true
  }
}, { _id: false }); // prevents Mongo from auto-adding _id to each subdocument

// Main user experience schema
const UserPortfolioSchema = new mongoose.Schema({
  id_user: {
    type: String,
    required: true,
    unique: true
  },
  data_portfolios: {
    type: [PortfolioSchema],
    default: []
  }
}, { timestamps: true });

module.exports = mongoose.model('UserPortfolio', UserPortfolioSchema, 'user_portfolios_collection');
