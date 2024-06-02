const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const bookSchema = new Schema({
  title: { type: String, required: true },
  summary: String,
  authors: [{ type: Schema.Types.ObjectId, ref: 'Author', required: true }],
  publisher: { type: Schema.Types.ObjectId, ref: 'Publisher', required: true },
  publishedDate: Date,
  pages: Number,
  coverImage: String
});

module.exports = model('Book', bookSchema);
