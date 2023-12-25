import React, { useState } from 'react';
import Product from './components/ProductLook';
import productList from './components/Products';
import { transferToOwner, connectMetamask } from './components/connection';

const ProductList = () => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState(productList);

  const addToCart = (product) => {
    const updatedProducts = products.map((item) =>
      item.id === product.id ? { ...item, addedToCart: true } : item
    );
    setProducts(updatedProducts);
    setCart([...cart, product]);
  };

  const handleBuyNow = async () => {
    const updatedProducts = products.filter((item) => !item.addedToCart);
    setProducts(updatedProducts);
    
    const totalAmount = calculateTotal();
  
    try {
      // Connect to MetaMask and request access
      const { accounts, instance } = await connectMetamask();
      console.log('accounts' , accounts)
  
      // If there are accounts and MetaMask is connected
      if (accounts && accounts.length > 0) {
        // Call the transferToOwner function with the total amount
        await transferToOwner(totalAmount);
    
        // Clear the cart after successful transfer
        setCart([]);
       
          
      } else {
        // If MetaMask connection fails or no accounts found
        alert('Please connect to MetaMask to proceed with the transaction.');
      }

    } catch (error) {
      // Handle errors or display alerts if the transaction fails
      alert('Failed to complete the transaction. Please check the console for details.');
      console.error(error);
    }
     // Delay clearing cart to match the animation time
  };

  const calculateTotal = () => {
    const totalAmount = cart.reduce((total, item) => total + item.price, 0);
    // Use toFixed(5) to get the total with 5 decimal places and convert it back to a number
    const roundedTotal = Number(totalAmount.toFixed(5));
    return roundedTotal;
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>FLOWERS NFT</h1>
      <div style={styles.productList}>
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            addToCart={() => addToCart(product)}
            disabled={product.addedToCart}
          />
        ))}
      </div>
      <h2 style={styles.cartHeading}>Cart</h2>
      <div style={styles.cartItems}>
        {cart.map((item, index) => (
          <div key={index} style={styles.cartItem}>
            <img src={item.image} alt={`Product ${index + 1}`} style={styles.cartItemImage} />
          </div>
        ))}
      </div>
      <div style={styles.total}>
        <p style={styles.totalAmount}>Total Amount: {calculateTotal()} ETH</p>
        <button onClick={handleBuyNow} style={styles.buyNowButton}>
          Pay
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    background: 'linear-gradient(to bottom right, #2196F3, #FF5722)',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    color: '#fff',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    marginBottom: '20px',
  },
  productList: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',

  },
  cartHeading: {
    marginTop: '30px',
  },
  cartList: {
    listStyle: 'none',
    padding: 0,
  },
  cartItem: {
    marginBottom: '5px',
  },
  cartItems: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: '10px',
  },

  cartItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '5px',
    flex: '1', // Allow items to flex and fill available space
  },

  cartItemImage: {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
    borderRadius: '5px',
    marginRight: '5px',
  },
  total: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '20px',
    padding: '10px',
    borderTop: '1px solid #ccc',
  },

  buyNowButton: {
    padding: '10px 20px',
    fontSize: '1em',
    borderRadius: '5px',
    border: 'none',
    background: '#4CAF50',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
    
  },
  totalAmount: {
    fontSize: '1.2em',
    margin: 0,
    marginRight: '10px', // Add space between Total Amount and Buy Now button
    color: 'white',
    fontFamily: 'Arial, sans-serif',
    fontWeight: 'bold', // Bolder font weight
   
  },
};

export default ProductList;
