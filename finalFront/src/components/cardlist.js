import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { decodeToken } from './decodetoken';
import axios from 'axios';
import CheckoutForm from './checkoutform';
import { toast, ToastContainer } from 'react-toastify';
import '../css/cardlist.css';

function CartList() {
    const [cart, setCart] = useState([]);
    const [isCheckoutFormVisible, setCheckoutFormVisible] = useState(false); // Initialize to false
    const navigate = useNavigate();
    const user = decodeToken(); 

    const shippingCostThreshold = 2000;
    const defaultShippingCost = 200;

    useEffect(() => {
        if (!user) {
            alert('User Should be Login First');
            console.log('User Should be Login First')
           navigate('/login');
            return;
        }
    
        axios.get(`http://localhost:8000/cartshow/${user.email}`)
            .then(response => setCart(response.data))
            .catch(error => console.error('Error fetching cart items:', error));
    }, [user, navigate]);

    const subtotal = useMemo(() => {
        return cart.reduce((total, item) => {
            const price = parseFloat(item.price.replace(/,/g, ''));
            const quantity = parseFloat(item.quantity);

            console.log(`Item Price: ${item.price}, Parsed Price: ${price}`);
            console.log(`Item Quantity: ${item.quantity}, Parsed Quantity: ${quantity}`);

            return (!isNaN(price) && !isNaN(quantity)) ? total + (price * quantity) : total;
        }, 0);
    }, [cart]);

    const shippingCost = useMemo(() => {
        return subtotal > shippingCostThreshold ? 0 : defaultShippingCost;
    }, [subtotal]);

    const total = useMemo(() => subtotal + shippingCost, [subtotal, shippingCost]);

    useEffect(() => {
        console.log(`Subtotal: ${subtotal.toFixed(2)} Rs`);
        console.log(`Shipping: ${shippingCost} Rs`);
        console.log(`Total: ${total.toFixed(2)} Rs`);
    }, [subtotal, shippingCost, total]);

    const delfun = (productId) => {
        axios.post('http://localhost:8000/cartdel', {
            userId: user.email,
            productId: productId,
        })
            .then(() => {
                setCart(prevCart => prevCart.filter(item => item.productId !== productId));
            })
            .catch(error => console.error('Error deleting cart item:', error));
    }

    const increasecount = (productId, currentQuantity) => {
        const newQuantity = currentQuantity + 1;
        axios.post('http://localhost:8000/cartinc', {
            userId: user.email,
            productId: productId,
        }).then(() => {
            setCart(prevCart => prevCart.map(item =>
                item.productId === productId ? { ...item, quantity: newQuantity } : item
            ));
        });
    }

    const decreasecount = (productId, currentQuantity) => {
        const newQuantity = Math.max(currentQuantity - 1, 1);
        axios.post('http://localhost:8000/cartred', {
            userId: user.email,
            productId: productId,
        }).then(() => {
            setCart(prevCart => prevCart.map(item =>
                item.productId === productId ? { ...item, quantity: newQuantity } : item
            ));
        });
    }

    const handleCheckoutClick = () => {
        setCheckoutFormVisible(true);
    };

    const handleCloseForm = () => {
        setCheckoutFormVisible(false);
    };

    // Ensure checkout form is only visible when user is authenticated
    if (!user) {
        return null; // Optionally, you could show a loading spinner or message here
    }

    return (
        <div className="center-container">
            <ToastContainer/>
            <div className="cart-container">
                {cart.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    <>
                        <div className="cart-header">
                            <div className="header-item"></div> {/* Add Image heading */}
                            <div className="header-item">Product</div>
                            <div className="header-item">Price</div>
                            <div className="header-item">Quantity</div>
                            <div className="header-item">Subtotal</div>
                        </div>
                        {cart.map((cartItem) => {
                            const price = parseFloat(cartItem.price.replace(/,/g, ''));
                            const quantity = parseFloat(cartItem.quantity);
                            const itemSubtotal = (!isNaN(price) && !isNaN(quantity)) ? (price * quantity) : 0;

                            console.log(`Item ID: ${cartItem.id}`);
                            console.log(`Item Price: ${cartItem.price}, Parsed Price: ${price}`);
                            console.log(`Item Quantity: ${cartItem.quantity}, Parsed Quantity: ${quantity}`);
                            console.log(`Item Subtotal: ${itemSubtotal}`);

                            return (
                                <div key={cartItem.id} className="cart-item">
                                    <img src={cartItem.img} alt={cartItem.title} width={40} className="item-image" />
                                    <div className="data-item">{cartItem.title}</div>
                                    <div className="data-item">${price.toFixed(2)}</div>
                                    <div className="data-item">
                                        <div className="quantity-container">
                                            <button onClick={() => decreasecount(cartItem.productId, quantity)}>-</button>
                                            <p>{quantity}</p>
                                            <button onClick={() => increasecount(cartItem.productId, quantity)}>+</button>
                                        </div>
                                    </div>
                                    <div className="data-item">${itemSubtotal.toFixed(2)}</div>
                                    <div className=' delbtn' onClick={() => delfun(cartItem.productId)}>Delete</div>
                                </div>
                            );
                        })}
                    </>
                )}
            </div>
            <div className="cart-footer">
                <div className="coupon">
                    <input type="text" placeholder="Coupon Code" />
                    <button>Apply Coupon</button>
                </div>
                <div className='total-container'>
                    <div className='text1'>Cart Total</div>
                    <div className='text22'>
                        <span className='text2'>Subtotal :</span> {subtotal.toFixed(2)} Rs
                    </div>
                    <div className='text22'>
                        <span className='text2'>Shipping :</span> {shippingCost === 0 ? 'Free' : shippingCost}
                    </div>
                    <div className='text22'>
                        <span className='text3'>Total :</span> {total.toFixed(2)} Rs
                    </div>
                    <button className='checkout' onClick={handleCheckoutClick}>Proceed to Checkout</button>
                </div>
            </div>
            {isCheckoutFormVisible && (
                <CheckoutForm onClose={handleCloseForm}
                    cartItems={cart}   // Array of items in the cart
                    customerId={user.email} />
                // <div>Checkout Form Placeholder</div>
            )}
        </div>
    );
}

export default CartList;
