import { FoodModel } from '../models/food.model.js';

export const getAllFoods = async (req, res) => {
  const foods = await FoodModel.find({});
  res.send(foods);
};

export const addFood = async (req, res) => {
  const { name, price, tags, favorite, imageUrl, origins, cookTime, calories, protein, fat, carbs } = req.body;

  const food = new FoodModel({
    name,
    price,
    tags: tags.split ? tags.split(',') : tags,
    favorite,
    imageUrl,
    origins: origins.split ? origins.split(',') : origins,
    cookTime,
    calories,
    protein,
    fat,
    carbs,
  });

  await food.save();
  res.send(food);
};

export const updateFood = async (req, res) => {
  const { id, name, price, tags, favorite, imageUrl, origins, cookTime, calories, protein, fat, carbs } = req.body;

  await FoodModel.updateOne(
    { _id: id },
    {
      name,
      price,
      tags: tags.split ? tags.split(',') : tags,
      favorite,
      imageUrl,
      origins: origins.split ? origins.split(',') : origins,
      cookTime,
      calories,
      protein,
      fat,
      carbs,
    }
  );

  res.send();
};

export const deleteFood = async (req, res) => {
  const { foodId } = req.params;
  await FoodModel.deleteOne({ _id: foodId });
  res.send();
};

export const getAllTags = async (req, res) => {
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
};
