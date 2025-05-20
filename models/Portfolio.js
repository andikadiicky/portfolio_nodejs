const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
  portfolio_id: String,
  info: String,
  img_portfolio_src: String,
  project: String,
  description: String,
  project_responsibilities: [mongoose.Schema.Types.Mixed],
});

module.exports = mongoose.model('Portfolio', PortfolioSchema, 'portfolio_collection');
