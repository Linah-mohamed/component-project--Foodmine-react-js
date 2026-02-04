import express from 'express';
import { FoodModel } from '../models/food.model.js';

const router = express.Router();

// Get all foods
async function getAllFoods(req, res) {
  try {
    const foods = await FoodModel.find({});
    res.send(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Add a new food
async function addFood(req, res) {
  try {
    const {
      name,
      price,
      tags,
      favorite,
      imageUrl,
      origins,
      cookTime,
      protein,
      fat,
      carbs,
      calories,
    } = req.body;

    const food = new FoodModel({
      name,
      price,
      tags: typeof tags === 'string' ? tags.split(',') : tags || [],
      favorite,
      imageUrl,
      origins: typeof origins === 'string' ? origins.split(',') : origins || [],
      cookTime,
      protein,
      fat,
      carbs,
      calories,
    });

    await food.save();
    res.status(201).send(food);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Update existing food by ID
async function updateFood(req, res) {
  try {
    const { id } = req.params;
    const {
      name,
      price,
      tags,
      favorite,
      imageUrl,
      origins,
      cookTime,
      protein,
      fat,
      carbs,
      calories,
    } = req.body;

    await FoodModel.updateOne(
      { _id: id },
      {
        name,
        price,
        tags: typeof tags === 'string' ? tags.split(',') : tags || [],
        favorite,
        imageUrl,
        origins: typeof origins === 'string' ? origins.split(',') : origins || [],
        cookTime,
        protein,
        fat,
        carbs,
        calories,
      }
    );

    res.send({ message: 'Food updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Delete a food by ID
async function deleteFood(req, res) {
  try {
    const { foodId } = req.params;
    await FoodModel.deleteOne({ _id: foodId });
    res.send({ message: 'Food deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Get all tags with count
async function getAllTags(req, res) {
  try {
    const tags = await FoodModel.aggregate([
      { $unwind: '$tags' },
      {
        $group: {
          _id: '$tags',
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          name: '$_id',
          count: '$count',
        },
      },
    ]).sort({ count: -1 });

    const all = {
      name: 'All',
      count: await FoodModel.countDocuments(),
    };

    tags.unshift(all);
    res.send(tags);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Search foods by name
async function searchFoods(req, res) {
  try {
    const { searchTerm } = req.params;
    const searchRegex = new RegExp(searchTerm, 'i');

    const foods = await FoodModel.find({ name: { $regex: searchRegex } });
    res.send(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Get foods by tag
async function getFoodsByTag(req, res) {
  try {
    const { tag } = req.params;
    const foods = await FoodModel.find({ tags: tag });
    res.send(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Get food by ID
async function getFoodById(req, res) {
  try {
    const { foodId } = req.params;
    const food = await FoodModel.findById(foodId);
    res.send(food);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Routes
router.get('/', getAllFoods);
router.get('/tags', getAllTags);
router.get('/search/:searchTerm', searchFoods);
router.get('/tag/:tag', getFoodsByTag);
router.get('/:foodId', getFoodById);
router.post('/', addFood);
router.put('/:id', updateFood);
router.delete('/:foodId', deleteFood);

export default router;
