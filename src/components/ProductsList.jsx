import React, { useState } from 'react';
import '../styles/ProductsList.css';

import calvin from '../assets/Calvin Klien.jpg';
import citizen from '../assets/citizen.jpg';
import titan from '../assets/titan.jpg';
import g_shock from '../assets/g-shock.jpg';
import casio from '../assets/casio-men.jpg';
import casio_unisex from '../assets/casio-unisex.jpg';
import coach from '../assets/coach.jpg';
import fitbit from '../assets/fitbit.jpg';
import tissot from '../assets/tissot.jpg';
import victorinox from '../assets/victorinox.jpg';
import swarovski from '../assets/Swarovski.jpg';
import michael_kors from '../assets/Michael Kors.jpg';

export default function ProductsList({ addToCart }) {
    const [addedToCart, setAddedToCart] = useState([]);

    const products = [
        { id: 1, name: "Calvin Klein", price: 16800, discount: 1023, desc: 'Men | Sport Multi-Function', image: calvin },
        { id: 2, name: "Citizen", price: 34900, discount: 2000, desc: 'Men | Sport Multi-Function', image: citizen },
        { id: 3, name: "Titan", price: 15295, discount: 1901, desc: 'Men | Edge Baseline', image: titan },
        { id: 4, name: "G-Shock", price: 15495, discount: 1250, desc: 'Men | G-Shock', image: g_shock },
        { id: 5, name: "Casio", price: 11995, discount: 950, desc: 'Men | Edifice', image: casio },
        { id: 6, name: "Casio", price: 5995, discount: 450, desc: 'Unisex | Vintage', image: casio_unisex },
        { id: 7, name: "Coach", price: 22995, discount: 1250, desc: 'Women | Cadie', image: coach },
        { id: 8, name: "Fitbit", price: 21249, discount: 1590, desc: 'Unisex | Sense 2', image: fitbit },
        { id: 9, name: "Tissot", price: 35500, discount: 2000, desc: 'Men | PRX', image: tissot },
        { id: 10, name: "Victorinox", price: 58300, discount: 2150, desc: 'Men | Maverick', image: victorinox },
        { id: 11, name: "Swarovski", price: 35000, discount: 2900, desc: 'Women | Crystalline Aura watch', image: swarovski },
        { id: 12, name: "Michael Kors", price: 23995, discount: 1050, desc: 'Women | Parker', image: michael_kors },
    ];

    const handleAddToCart = (product) => {
        addToCart(product);
        setAddedToCart([...addedToCart, product.id]);

        // Optionally, remove the "Added to Cart" message after a few seconds
        setTimeout(() => {
            setAddedToCart(addedToCart.filter(id => id !== product.id));
        }, 3000); // 3 seconds
    };

    return (
        <div className="grid-container">
            {products.map(product => {
                const discountedPrice = product.price - product.discount;
                const isAdded = addedToCart.includes(product.id);

                return (
                    <div key={product.id} className="product-card">
                        <img src={product.image} alt={product.name} className="product-image" />
                        <h3>{product.name}</h3>
                        <p>{product.desc}</p>
                        <div>
                            <span className="original-price">₹{product.price}</span>
                            <span className="discounted-price">₹{discountedPrice}</span>
                        </div>
                        <button onClick={() => handleAddToCart(product)} className="add-button">Add to Cart</button>
                        {isAdded && <div className="added-message">Added to Cart</div>}
                    </div>
                );
            })}
        </div>
    );
}
