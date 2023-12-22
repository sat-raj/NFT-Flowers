import React from 'react';

const Product = ({ product, addToCart, disabled }) => {
  return (
    <div style={styles.product}>
      <img src={product.image} alt={product.name} style={styles.image} />
      <h3 style={styles.title}>{product.name}</h3>
      <p style={styles.price}>${product.price}</p>
      <button
        style={{ ...styles.addToCartButton, background: disabled ? '#ccc' : '#4CAF50' }}
        onClick={addToCart}
        disabled={disabled}
      >
        {disabled ? 'Added to Cart' : 'Add to Cart'}
      </button>
    </div>
  );
};


const styles = {
  product: {
    position: 'relative',
    overflow: 'hidden',
    border: '1px solid #ccc',
    padding: '10px',
    margin: '10px',
    width: '200px',
    borderRadius: '8px',
    textAlign: 'center',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    background: 'linear-gradient(to bottom right, #ff8a00, #e52e71)',
  },
  image: {
    maxWidth: '100%',
    borderRadius: '8px',
  },
  title: {
    fontSize: '1.2em',
    margin: '10px 0',
    color: '#fff',
    fontFamily: 'Arial, sans-serif',
  },
  price: {
    fontSize: '1em',
    margin: '5px 0',
    color: '#fff',
  },
  addToCartButton: {
    width: '100%',
    padding: '8px',
    borderRadius: '5px',
    border: 'none',
    background: '#4CAF50',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
};

export default Product;