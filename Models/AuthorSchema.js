const mongoose = require('mongoose');
const { Schema, model } = mongoose;


const authorSchema = new Schema({
    name: { type: String, required: true },
    bio: String,
    birthdate: Date,
    books: [{ type: Schema.Types.ObjectId, ref: 'Book' }]
  });
  
  module.exports = model('Author', authorSchema);
  