// Header.js
import React, { useState } from 'react';
import { HiShoppingCart } from "react-icons/hi2";
import { useSelector } from 'react-redux';

import styles from './Header.module.css';
import Cart from '../Cart/Cart';

const Header = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const toggleCart = () => setIsCartOpen(!isCartOpen);
    const cartItems = useSelector(state => state.cart.cartItems);
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <>
            <header className={styles.header}>
                <nav>
                    <ul className={styles.navList}>
                        <li>
                            <div onClick={toggleCart} className={styles.cartButton}>
                                <span>
                                    <HiShoppingCart size={22} />
                                </span>
                                <span style={{ paddingLeft: "5px" }}>
                                    {totalQuantity}
                                </span>
                            </div>
                        </li>
                    </ul>

                </nav>
            </header>
            <Cart isOpen={isCartOpen} toggleCart={toggleCart} />
        </>
    );
};

export default Header;

