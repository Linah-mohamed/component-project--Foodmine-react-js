import React from 'react';
import classes from './Cartpage.module.css';
import { useCart } from '../../Hooks/useCart';
import Title from '../../components/Title/Title';
import { Link } from 'react-router-dom';
import Price from '../../components/Price/Price';
import NotFound from '../../components/NotFound/NotFound';

export default function CartPage() {
  const { cart, removeFromCart, changeQuantity } = useCart();

  const baseURL = 'http://localhost:5000';
  const defaultImage = 'https://via.placeholder.com/100?text=No+Image';

  return (
    <>
      <Title title="Cart Page" margin="1.5rem 0 0 2.5rem" />

      {cart.items.length === 0 ? (
        <NotFound message="Cart Page Is Empty!" />
      ) : (
        <div className={classes.container}>
          <ul className={classes.list}>
            {cart.items.map((item) => {
              const food = item.food;
              const imagePath = food.imageUrl || food.image || '';
              const imageFullURL = imagePath.startsWith('http')
                ? imagePath
                : imagePath
                ? `${baseURL}${imagePath}`
                : defaultImage;

              return (
                <li key={food.id} className={classes.item}>
                  <div className={classes.imageWrapper}>
                    <img
                      src={imageFullURL}
                      alt={food.name}
                      className={classes.image}
                    />
                  </div>

                  <div className={classes.details}>
                    <Link to={`/food/${food.id}`} className={classes.foodName}>
                      {food.name}
                    </Link>

                    <div className={classes.controls}>
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          changeQuantity(item, Number(e.target.value))
                        }
                        className={classes.quantity}
                      >
                        {[...Array(10)].map((_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>

                      <Price price={item.price} className={classes.price} />

                      <button
                        className={classes.remove_button}
                        onClick={() => removeFromCart(food.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className={classes.checkout}>
            <div>
              <div className={classes.foods_count}>
                Total Items: {cart.totalCount}
              </div>
              <div className={classes.total_price}>
                <Price price={cart.totalPrice} />
              </div>
            </div>

            <Link to="/checkout" className={classes.checkout_link}>
              Proceed To Checkout
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
