import React from 'react';
import classes from './header.module.css';
import { Link } from 'react-router-dom';
import { useCart } from '../../Hooks/useCart';
import { useAuth } from '../../Hooks/useAuth';

export default function Header() {
  const { user, logout } = useAuth();
  const { cart } = useCart();

  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <Link to="/" className={classes.logo}>
          Food Mine!
        </Link>
        <nav>
          <ul className={classes.nav_list}>
            {user ? (
              <li className={classes.menu_container}>
                <Link to="/profile">{user.name}</Link>
                <div className={classes.menu}>
                  <Link to="/profile">Profile</Link>
                  <Link to="/orders">Orders</Link>

                  {/* Admin */}
                  {user.isAdmin && (
                    <Link to="/admin/dashboard">Dashboard</Link>
                  )}

                  <button
                    onClick={logout}
                    className={classes.logout_button}
                    type="button"
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'blue',
                      textDecoration: 'underline',
                      cursor: 'pointer',
                      padding: 0,
                      font: 'inherit',
                    }}
                  >
                    Logout
                  </button>
                </div>
              </li>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}

            <li>
              <Link to="/cart">
                Cart
                {cart.totalCount > 0 && (
                  <span className={classes.cart_count}>
                    {cart.totalCount}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
