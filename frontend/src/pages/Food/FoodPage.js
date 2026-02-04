import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Price from '../../components/Price/Price';
import StarRating from '../../components/starRating/starRating';
import Tags from '../../components/Tags/Tags';
import { useCart } from '../../Hooks/useCart';
import { getById } from '../../services/foodService';
import classes from './FoodPage.module.css';
import NotFound from '../../components/NotFound/NotFound';

export default function FoodPage() {
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getById(id)
      .then(data => setFood(data))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    if (food) {
      addToCart(food);
      navigate('/cart');
    }
  };

  if (loading) return <p>Loading...</p>;

  if (!food) {
    return <NotFound message="Food Not Found!" linkText="Back To Homepage" />;
  }

  return (
    <div className={classes.container}>
      <img className={classes.image} src={food.imageUrl} alt={food.name} />

      <div className={classes.details}>
        <div className={classes.header}>
          <span className={classes.name}>{food.name}</span>
          <span className={`${classes.favorite} ${food.favorite ? '' : classes.not}`}>❤</span>
        </div>

        <div className={classes.rating}>
          <StarRating stars={food.stars} size={25} />
        </div>

        <div className={classes.origins}>
          {food.origins?.map(origin => (
            <span key={origin}>{origin}</span>
          ))}
        </div>

        <div className={classes.tags}>
          {food.tags && <Tags tags={food.tags.map(tag => ({ name: tag }))} forFoodPage={true} />}
        </div>

        <div className={classes.cook_time}>
          <span>
            Time to cook about <strong>{food.cookTime}</strong> minutes
          </span>
        </div>

        <div className={classes.description}>
          <p>{food.description}</p>
        </div>

        <div className={classes.macros}>
          <p><strong>Calories:</strong> {food.calories} kcal</p>
          <p><strong>Protein:</strong> {food.protein} g</p>
          <p><strong>Fat:</strong> {food.fat} g</p>
          <p><strong>Carbs:</strong> {food.carbs} g</p>
        </div>

        <div className={classes.price}>
          <Price price={food.price} />
        </div>

        <button onClick={handleAddToCart}>Add To Cart</button>
      </div>
    </div>
  );
}
