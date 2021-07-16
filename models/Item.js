import { Schema, model,Types } from 'mongoose';

// Create Schema
const ItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  category: {
    type: Types.ObjectId, 
    ref: 'category',
    required :true}
});

const Item = model('item', ItemSchema);

export default Item;
