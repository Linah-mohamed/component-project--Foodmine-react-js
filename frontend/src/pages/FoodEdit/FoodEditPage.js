import { useParams, useNavigate } from 'react-router-dom';
import classes from './foodEdit.module.css';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { add, getById, update } from '../../services/foodService';
import Title from '../../components/Title/Title';
import InputContainer from '../../components/InputContainer/InputContainer';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { uploadImage } from '../../services/uploadService';
import { toast } from 'react-toastify';
import { useAuth } from '../../Hooks/useAuth';

export default function FoodEditPage() {
  const { foodId } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!foodId;
  const { user } = useAuth();
  const [imageUrl, setImageUrl] = useState();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (!user?.isAdmin) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (isEditMode) {
      getById(foodId).then(food => {
        if (food) {
          reset(food);
          setImageUrl(food.imageUrl);
        }
      });
    }
  }, [foodId, isEditMode, reset]);

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      toast.error("No file selected!");
      return;
    }

    const uploadedUrl = await uploadImage(file);
    if (uploadedUrl) {
      setImageUrl(uploadedUrl);
    }
  };

 const submit = async (foodData) => {
  if (!imageUrl) {
    toast.error("Please upload an image before submitting.");
    return;
  }

  const requiredNumbers = ['calories', 'fat', 'carbs', 'protein', 'price'];
  for (let key of requiredNumbers) {
    if (!foodData[key] || isNaN(parseFloat(foodData[key]))) {
      toast.error(`Please provide a valid number for ${key}.`);
      return;
    }
  }

  const food = {
    ...foodData,
    imageUrl,
    tags: foodData.tags?.split(',').map(t => t.trim()).filter(Boolean),
    origins: foodData.origins?.split(',').map(o => o.trim()).filter(Boolean),
    calories: parseFloat(foodData.calories) || 0,
    fat: parseFloat(foodData.fat) || 0,
    carbs: parseFloat(foodData.carbs) || 0,
    protein: parseFloat(foodData.protein) || 0,
    price: parseFloat(foodData.price) || 0,
  };

  try {
    if (isEditMode) {
      await update(food);
      toast.success(`Food "${food.name}" updated successfully!`);
    } else {
      const newFood = await add(food);
      toast.success(`Food "${food.name}" added successfully!`);
      navigate(`/admin/editFood/${newFood.id}`, { replace: true });
    }
  } catch (error) {
    toast.error("Failed to save food: " + (error.response?.data?.message || error.message));
  }
};


  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <Title title={isEditMode ? 'Edit Food' : 'Add Food'} />

        <form className={classes.form} onSubmit={handleSubmit(submit)} noValidate>
          {}
          <InputContainer label="Select Image">
            <input type="file" onChange={handleImageUpload} accept="image/jpeg, image/png" />
          </InputContainer>

          {imageUrl && (
            <a href={imageUrl} className={classes.image_link} target="_blank" rel="noopener noreferrer">
              <img src={imageUrl} alt="Uploaded" />
            </a>
          )}

          {}
          <Input type="text" label="Name" placeholder="e.g. Spaghetti"
            {...register('name', { required: true, minLength: 3 })}
            error={errors.name}
          />

          <Input type="number" label="Price"
            {...register('price', { required: true })}
            error={errors.price}
          />

          <Input type="text" label="Tags" placeholder="e.g. Fast Food, Italian"
            {...register('tags')}
            error={errors.tags}
          />

          <Input type="text" label="Origins" placeholder="e.g. USA, Italy"
            {...register('origins', { required: true })}
            error={errors.origins}
          />

          <Input type="text" label="Cook Time"
            {...register('cookTime', { required: true })}
            error={errors.cookTime}
          />

          <Input type="text" label="Description"
            {...register('description', { required: true })}
            error={errors.description}
          />

          <Input type="number" label="Calories"
            {...register('calories', { required: true })}
            error={errors.calories}
          />

          <Input type="number" label="Protein (g)"
            {...register('protein', { required: true })}
            error={errors.protein}
          />

          <Input type="number" label="Fat (g)"
            {...register('fat', { required: true })}
            error={errors.fat}
          />

          <Input type="number" label="Carbs (g)"
            {...register('carbs', { required: true })}
            error={errors.carbs}
          />

          {}
          <Button type="submit" text={isEditMode ? 'Update' : 'Create'} />
        </form>
      </div>
    </div>
  );
}
