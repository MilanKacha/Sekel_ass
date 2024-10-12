import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './ProductList.module.css';
import { fetchProducts } from '../../feature/product/productSlice';
import { Link } from 'react-router-dom';
import { addToCart } from '../../feature/cart/cartSlice';
import Loader from '../../helper/Loader';

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);

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
  return (
    <>
      <div className={styles.productList}>
        {products.map((product, i) => (
          <div className={styles.card}>
            <Link to={`/product/${product.id}`} key={product.id} style={{ textDecoration: "none" }}>
              <img src={product.image} alt={product.title} className={styles.image} />
              <h2 style={{ textAlign: "left", fontSize: "20px", color: "black" }}>{product.title}</h2>
              <p style={{ textAlign: "left", fontWeight: "bold" }}>{product.price} USD</p>
              <p style={{ fontSize: "15px", textAlign: "justify" }}>
                {product.description.substring(0, 150)}...
              </p>
            </Link>
            <button className={styles.button} onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
          </div>
        ))}
      </div>
    </>
  )
}

export default ProductList
