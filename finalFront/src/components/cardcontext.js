import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            // Check if the product is already in the cart
            const existingProduct = prevCart.find(item => item.id === product.id);
            if (existingProduct) {
                // If product exists, increment the quantity
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            // If product is not in the cart, add it
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    const increment = (productId) => {
        setCart((prevCart) =>
            prevCart.map(item =>
                item.id === productId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    const decrement = (productId) => {
        setCart((prevCart) =>
            prevCart.map(item =>
                item.id === productId && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, increment, decrement }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
