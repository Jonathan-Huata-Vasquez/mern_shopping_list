import { Router } from 'express';
import Category from '../../models/Category';

const router = Router();

/**
 * @route    api/categories
 * 
**/
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    if (!categories) throw Error('No categories');

    res.status(200).json(categories);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});



router.post('/',  async (req, res) => {
  const newCategory = new Category({
    name: req.body.name
  });

  try {
    const category = await newCategory.save();
    if (!category) throw Error('Something went wrong saving the category');

    res.status(200).json(category);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route   DELETE api/categories/:id
 * @desc    Delete A Item
 * @access  Private
 */

router.delete('/:id',  async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) throw Error('No category found');

    const removed = await category.remove();
    if (!removed)
      throw Error('Something went wrong while trying to delete the category');

    res.status(200).json({ success: true });
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
});

export default router;
