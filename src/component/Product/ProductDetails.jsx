import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProducts } from '../../feature/product/productSlice';
import styles from './ProductDetails.module.css';
import { addToCart } from '../../feature/cart/cartSlice';
import Loader from '../../helper/Loader';

const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { products, status, error } = useSelector((state) => state.products);
    const product = products.find((p) => p.id === Number(id));

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProducts());
        }
    }, [status, dispatch]);

    if (status === 'loading') {
        return <p><Loader/></p>;
    }

    if (status === 'failed') {
        return <p>Error: {error}</p>;
    }

    if (!product) {
        return <p>Product not found</p>;
    }

    return (
        <div className={styles.detailsContainer}>
            <div className={styles.imageContainer}>
                <img src={product.image} alt={product.title} className={styles.image} />
            </div>
            <div className={styles.details}>
                <h2>{product.title}</h2>
                <p className={styles.price}>Price: {product.price} USD</p>
                <p className={styles.category}>Category: {product.category}</p>
                <p className={styles.rating}>Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
                <p className={styles.description}>{product.description}</p>
                <button className={styles.button} onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
            </div>
        </div>
    );
};

export default ProductDetails;
