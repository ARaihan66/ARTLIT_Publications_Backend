const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const publisherSchema = new Schema({
    name: { type: String, required: true, unique: true },
    address: String,
    phone: String,
    books: [{ type: Schema.Types.ObjectId, ref: 'Book' }]
  });
  
  module.exports = model('Publisher', publisherSchema);
  