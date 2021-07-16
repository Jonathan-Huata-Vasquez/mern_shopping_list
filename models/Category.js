import { Schema, model } from 'mongoose';

// Create Schema
const CategorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
});

const Category = model('category', CategorySchema);

export default Category;
