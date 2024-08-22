import React from 'react';
import StarRatings from 'react-star-ratings';
import '../css/product.css';
import { useCart } from './cardcontext';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { decodeToken } from './decodetoken';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const Truncate = (string, number) => {
    if (!string) return null;
    if (string.length <= number) return string;
    return string.slice(0, number) + "...";
};

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const navigate = useNavigate();

    // Handle cart icon click
    const handleCartClick = (e) => {
        e.stopPropagation(); // Prevent event from bubbling up to parent

        const user = decodeToken();
        if (user) {
            axios.post('http://localhost:8000/cart', {
                userId: user.email, // Assuming `email` is a unique identifier
                productId: product.id,
                quantity: 1,
                price: product.price,
                img: product.imgSrc,
                title: product.title
            }).then(() => {
                console.log('Product added to cart');
                toast.success("Item is added to the cart")
            }).catch(error => {
                console.error('Error adding product to cart:', error);
            });
        } else {
            navigate('/login');
        }
    };

    // Handle card click
    const handleCardClick = () => {
        const user = decodeToken();
        if (user) {
            navigate(`/items/${product.id}`);
        } else {
            navigate('/login');
        }
    };

    return (
        <div className="col-md-4 my-3 text-center" onClick={handleCardClick}>
            <div className="card" style={{ width: "18rem" }}>
                <img src={product.imgSrc} className='card-img-top' alt={product.title} />
                <div className="card-body">
                    <h5
                        className="card-title"
                        title={product.title.length >= 50 ? product.title : null}
                    >
                        {Truncate(product.title, 55)}
                    </h5>
                    <p className="card-text">
                        {Truncate(product.description, 55)}
                    </p>
                    <p className="card-price">${product.price}</p>
                    <div className="card-detail">
                        <div className="rating-cart-wrapper">
                            <StarRatings
                                rating={product.rating?.rate || 0}
                                starDimension="16px"
                                starSpacing="1px"
                                starRatedColor="black"
                            />
                            <FontAwesomeIcon
                                onClick={handleCartClick}
                                className="fas fa-cart-plus cart-icon"
                                title="Add to Cart"
                                icon={faCartPlus}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default ProductCard;
