const mongoose = require('mongoose');
const { Schema } = mongoose;

const ItemSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Please enter a name for the item']
  },
  description: {
    type: String,
    default: ''
  },
  imageurl: {
    type: String,
    default: ''
  },
  tags: {
    type: [String],
    default: ['']
  },
  itemowner: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  created: String,
  available: {
    type: Boolean,
    default: true
  },
  borrower: {
    type: Schema.Types.ObjectId,
    default: null,
    ref: 'user'
  }
});

const Item = mongoose.model('item', ItemSchema);
module.exports = { Item };
