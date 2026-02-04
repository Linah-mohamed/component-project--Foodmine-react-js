import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import classes from '../FoodEdit/foodEdit.module.css';
import { useEffect, useState } from 'react';
import { add, getById, update } from '../../services/foodService';
import Title from '../../components/Title/Title';
import InputContainer from '../../components/InputContainer/InputContainer';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { uploadImage } from '../../services/uploadService';
import { toast } from 'react-toastify';
import { useAuth } from '../../Hooks/useAuth';

export default function FoodAdminPage() {
  const { foodId } = useParams();
  const [imageUrl, setImageUrl] = useState(null);
  const isEditMode = !!foodId;
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.isAdmin) {
      navigate('/');
    }
  }, [user, navigate]);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (!isEditMode) return;

    getById(foodId).then(food => {
      if (!food) return;
      reset({
        ...food,
        calories: food.calories || '',
        protein: food.protein || '',
        fat: food.fat || '',
        carbs: food.carbs || '',
        tags: food.tags ? food.tags.join(', ') : '',
        origins: food.origins ? food.origins.join(', ') : '',
      });
      setImageUrl(food.imageUrl);
    });
  }, [foodId, isEditMode, reset]);

  const submit = async foodData => {
    if (!imageUrl) {
      toast.error("Please upload an image before submitting.");
      return;
    }

    const food = {
      ...foodData,
      imageUrl,
      tags: foodData.tags?.split(',').map(t => t.trim()).filter(Boolean),
      origins: foodData.origins?.split(',').map(o => o.trim()).filter(Boolean),
      calories: Number(foodData.calories),
      protein: Number(foodData.protein),
      fat: Number(foodData.fat),
      carbs: Number(foodData.carbs),
    };

    try {
      if (isEditMode) {
        await update(food);
        toast.success(`Food "${food.name}" updated successfully!`);
      } else {
        const newFood = await add(food);
        toast.success(`Food "${food.name}" added successfully!`);
        navigate('/admin/editFood/' + newFood.id, { replace: true });
      }
    } catch (error) {
      toast.error("Failed to save food: " + (error.response?.data?.message || error.message));
    }
  };

  const upload = async event => {
    event.preventDefault();
    const file = event.target.files[0];
    if (!file) {
      toast.error("No file selected!");
      return;
    }

    try {
      const uploadedUrl = await uploadImage(file);
      if (!uploadedUrl) {
        toast.error("Image upload failed!");
        return;
      }
      setImageUrl(uploadedUrl);
    } catch (error) {
      toast.error("Upload error: " + error.message);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <Title title={isEditMode ? 'Edit Food' : 'Add Food'} />
        <form className={classes.form} onSubmit={handleSubmit(submit)} noValidate>
          <InputContainer label="Select Image">
            <input type="file" onChange={upload} accept="image/jpeg, image/png" />
          </InputContainer>

          {imageUrl && (
  <a href={imageUrl} className={classes.image_link} target="_blank" rel="noopener noreferrer">
    <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '200px', maxHeight: '200px' }} />
  </a>
)}

          <Input
            type="text"
            label="Name"
            {...register('name', { required: true, minLength: 5 })}
            error={errors.name}
          />

          <Input
            type="number"
            label="Price"
            {...register('price', { required: true })}
            error={errors.price}
          />

          <Input
            type="text"
            label="Tags"
            {...register('tags')}
            error={errors.tags}
          />

          <Input
            type="text"
            label="Origins"
            {...register('origins', { required: true })}
            error={errors.origins}
          />

          <Input
            type="text"
            label="Cook Time"
            {...register('cookTime', { required: true })}
            error={errors.cookTime}
          />

          <Input
            type="number"
            label="Calories"
            {...register('calories', { required: true })}
            error={errors.calories}
          />
          <Input
            type="number"
            label="Protein (g)"
            {...register('protein', { required: true })}
            error={errors.protein}
          />
          <Input
            type="number"
            label="Fat (g)"
            {...register('fat', { required: true })}
            error={errors.fat}
          />
          <Input
            type="number"
            label="Carbs (g)"
            {...register('carbs', { required: true })}
            error={errors.carbs}
          />

          <Button type="submit" text={isEditMode ? 'Update' : 'Create'} />
        </form>
      </div>
    </div>
  );
}
