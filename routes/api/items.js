import { Router } from 'express';
import auth from '../../middleware/auth';
// Item Model
import Item from '../../models/Item';
import Category from '../../models/Category';

const router = Router();
/**
 * @route   GET api/items
 * @desc    Get All Items
 * @access  Public
 */

router.get('/', async (req, res) => {
  try {
    const items = await Item.find().populate("category");
    if (!items) throw Error('No items');
    
    res.status(200).json(items);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route   POST api/items
 * @desc    Create An Item
 * @access  Private
**/

router.post('/', auth, async (req, res) => {
  try {
    let category = await Category.findOne({name:req.body.category})
    if (!category) throw Error('Something went wrong with the category of the item');
    
    const newItem = new Item({
      name: req.body.name,
      category: category._id
    });

    let item = await newItem.save();
    item = await item.populate("category").execPopulate();
    if (!item) throw Error('Something went wrong saving the item');


    res.status(200).json(item);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route   DELETE api/items/:id
 * @desc    Delete A Item
 * @access  Private
**/

router.delete('/:id', auth, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) throw Error('No item found');

    const removed = await item.remove();
    if (!removed)
      throw Error('Something went wrong while trying to delete the item');

    res.status(200).json({ success: true });
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
});

export default router;