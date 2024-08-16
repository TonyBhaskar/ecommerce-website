import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductsList from './components/ProductsList';
import Cart from './components/Cart';
import Navbar from './components/NavBar';
import Signup from './components/Signup';
import Signin from './components/Login';  // Updated import
import Notification from './components/Notification';
import './styles/app.css'

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [username, setUsername] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      setLoggedIn(true);
      setUsername(currentUser.username);
    }
  }, []);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      setLoggedIn(true);
      const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
      setCartItems(savedCart);
    }
  }, []);

  const addToCart = (product) => {
    if (!loggedIn) {
      setNotification({ message: 'You need to log in or sign up to add items to the cart.', type: 'error' });
      return;
    }
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    localStorage.setItem('cart', JSON.stringify([...cartItems, { ...product, quantity: 1 }]));
  };

  const removeFromCart = (product) => {
    const updatedCart = cartItems.filter(item => item.id !== product.id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const increaseQuantity = (productId) => {
    const updatedCart = cartItems.map(item =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const decreaseQuantity = (productId) => {
    const existingItem = cartItems.find(item => item.id === productId);
    if (existingItem.quantity > 1) {
      const updatedCart = cartItems.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      );
      setCartItems(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {
      removeFromCart(existingItem);
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('currentUser');
    setCartItems([]);
  };

  const handleCheckout = () => {
    setNotification({ message: 'Order placed successfully! Thank you for shopping with us.', type: 'success' });
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  const closeNotification = () => {
    setNotification({ message: '', type: '' });
  };

  return (
    <Router>
      <Navbar loggedIn={loggedIn} cartItems={cartItems} username={username} />
      <Routes>
        <Route path="/" element={<ProductsList addToCart={addToCart} />} />
        <Route path="/cart" element={loggedIn ? (
          <Cart
            cartItems={cartItems}
            removeFromCart={removeFromCart}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            handleLogout={handleLogout}
            handleCheckout={handleCheckout}
          />
        ) : (
          <div className='no-login'>
            <p className='notice'>You can't add items to the cart unless you log in or sign up.</p>
            <button className='login-btn' onClick={() => window.location.href = '/login'}>Login</button> {/* Updated to Login */}
            <button className='signup-btn' onClick={() => window.location.href = '/signup'}>Sign Up</button>
          </div>
        )} />
        <Route path="/signup" element={<Signup setLoggedIn={setLoggedIn} />} />
        <Route path="/login" element={<Signin setLoggedIn={setLoggedIn} />} /> {/* Updated to Signin */}
      </Routes>

      <Notification message={notification.message} type={notification.type} onClose={closeNotification} />
    </Router>
  );
}
