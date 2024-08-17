import React, { useState } from 'react';
import '../styles/Cart.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Cart({ cartItems, removeFromCart, increaseQuantity, decreaseQuantity, handleLogout, handleCheckout }) {
    const [discountCode, setDiscountCode] = useState('');
    const [discount, setDiscount] = useState(0);

    // Calculate totals
    const totalOriginalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalDefaultDiscount = cartItems.reduce((sum, item) => sum + item.discount * item.quantity, 0);
    const totalBeforeDiscount = totalOriginalPrice - totalDefaultDiscount;
    const totalAfterDiscount = totalBeforeDiscount - discount;

    // Handle discount code application
    const handleApplyDiscount = () => {
        if (discountCode === 'SAVE05' && cartItems.length > 0) {
            const discountAmount = (totalBeforeDiscount * 0.05).toFixed(2); // 5% discount, rounded to 2 decimal places
            setDiscount(parseFloat(discountAmount));
            toast.success('Discount applied!');
        } else if (cartItems.length === 0) {
            toast.error('Your cart is empty');
        } else {
            toast.error('Invalid discount code');
            setDiscount(0);
        }
    };

    // Handle checkout
    const handleCheckoutClick = () => {
        handleCheckout();
        setDiscount(0);
        setDiscountCode('');
    };

    return (
        <div className="Cart">
            <div className="cartDetails">
                <h1 className='cartHeading'>Your Cart</h1>
                <div className="cartItems">
                    {cartItems.length === 0 ? (
                        <p className='empty-cart'>Your cart is empty.</p>
                    ) : (
                        <ul className="CartItems">
                            {cartItems.map((item, index) => (
                                <React.Fragment key={item.id}>
                                    <li className="CartItem">
                                        <div className="ItemImage">
                                            <img src={item.image} alt={item.name} />
                                            <div className="ItemActions">
                                                <button className='count-btn' onClick={() => decreaseQuantity(item.id)}>-</button>
                                                <span>{item.quantity}</span>
                                                <button className='count-btn' onClick={() => increaseQuantity(item.id)}>+</button>
                                            </div>
                                        </div>
                                        <div className="ItemDetails">
                                            <h3>{item.name}</h3>
                                            <p>{item.desc}</p>
                                            <div className="ItemPrice">
                                                <span className="original-price">₹{item.price}</span>
                                                <span className="discounted-price">₹{(item.price - item.discount)}</span>
                                            </div>
                                            <button className='remove-btn' onClick={() => removeFromCart(item)}>Remove</button>
                                        </div>
                                    </li>
                                    {index < cartItems.length - 1 && <hr className="item-divider" />}
                                </React.Fragment>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            <div className="CartSummary">
                <h1>Price Details</h1>
                <hr />
                <div className="cartCalculation">
                    <h3 className='price-tags'>Price ({cartItems.length} items): ₹{totalOriginalPrice}</h3>
                    <h4 className='price-tags'>Discount: − ₹{totalDefaultDiscount}</h4>
                    <h4 className='price-tags'>Coupon for you: − ₹{discount > 0 ? discount : '0'}</h4>
                    <h2 className='price-tags total-amount'>Total Amount: ₹{totalAfterDiscount}</h2>
                    <hr />
                    <div className="DiscountSection">
                        <p className='coupon-code'>! Enter SAVE05 to get 5% discount</p>
                        <input
                            type="text"
                            placeholder="Enter discount code"
                            value={discountCode}
                            onChange={(e) => setDiscountCode(e.target.value)}
                        />
                        <button className='apply-discount' onClick={handleApplyDiscount}>Apply Discount</button>
                    </div>
                    <hr />
                    <div className="checkOut">
                        <button className='checkOut-actions logout' onClick={handleLogout}>Logout</button>
                        {cartItems.length > 0 && (
                            <button className='checkOut-actions checkout' onClick={handleCheckoutClick}>Checkout</button>
                        )}
                    </div>
                </div>
            </div>

            <ToastContainer
                position="top-center"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
}
