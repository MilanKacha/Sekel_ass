import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Cart.module.css';
import { removeFromCart, clearCart } from '../../feature/cart/cartSlice';

const Cart = ({ isOpen, toggleCart }) => {
    const dispatch = useDispatch();
    const { cartItems, totalAmount } = useSelector(state => state.cart);

    return (
        <div className={`${styles.cart} ${isOpen ? styles.open : ''}`}>
            <button className={styles.closeButton} onClick={toggleCart}>X</button>
            <h2 style={{ fontSize: "25px", textAlign:"center",borderBottom:"1px solid gray" }}>Your Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <>
                    <ul className={styles.cartItems}>
                        {cartItems.map(item => (
                            <li key={item.id} className={styles.cartItem}>
                                <img src={item.image} alt={item.title} className={styles.cartImage} />
                                <div>
                                    <p style={{ fontSize: "15px" }}>{item.title}</p>
                                    <p>Quantity: {item.quantity}</p>
                                    <p>${(item.price * item.quantity).toFixed(2)}</p>


                                    <button
                                        className={styles.removeButton}
                                        onClick={() => dispatch(removeFromCart(item))}
                                    >
                                        Remove
                                    </button>

                                </div>
                            </li>
                        ))}
                    </ul>
                    <p className={styles.total}>Total: ${totalAmount.toFixed(2)}</p>
                    <button className={styles.clearButton} onClick={() => dispatch(clearCart())}>Clear Cart</button>
                </>
            )}
        </div>
    );
};

export default Cart;
