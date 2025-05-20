const mongoose = require('mongoose');

// Subdocument schema for individual work experiences
const WorkExperienceSchema = new mongoose.Schema({
  work_exp_id: {
    type: String,
    required: true
  },
  img_icon_src: {
    type: String,
    required: true
  },
  img_modal_src: {
    type: String,
    required: true
  },
  work_position: {
    type: String,
    required: true
  },
  work_location: {
    type: String,
    required: true
  },
  info: {
    type: String,
    default: ""
  },
  company: {
    type: String,
    required: true
  },
  start_year: {
    type: String,
    required: true
  },
  end_year: {
    type: String,
    required: true
  },
  work_responsibilities: {
    type: [String],
    required: true
  }
}, { _id: false }); // prevents Mongo from auto-adding _id to each subdocument

// Main user experience schema
const UserExperienceSchema = new mongoose.Schema({
  id_user: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  current_position: {
    type: String,
    required: true
  },
  about: {
    type: String,
    required: true
  },
  data_experiences: {
    type: [WorkExperienceSchema],
    default: []
  }
}, { timestamps: true });

module.exports = mongoose.model('UserExperience', UserExperienceSchema, 'user_experiences_collection');
