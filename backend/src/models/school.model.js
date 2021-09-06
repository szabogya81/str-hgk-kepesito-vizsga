const mongoose = require('mongoose');

const SchoolSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    zipcode: {
        type: Number,
        required: true
    },
    classrooms: [{
      type: String
  }]
}, {
    timestamps: true
});

module.exports = new mongoose.model('School', SchoolSchema, 'schools');