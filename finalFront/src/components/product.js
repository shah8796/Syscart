
// Product.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { items } from './jsond/data'
import ProductCard from './productcard';
import '../css/product.css';
import axios from 'axios';


const Product = () => {

    const [item, setItem] = useState('');
    useEffect(()=>{
        axios.get('http://localhost:8000/items')
        .then(response=>setItem(response.data))
        .catch(error => alert('Error fetching data:', error));
    },[])


    if (!item || item.length === 0) {
        return <div>No products available</div>;
    }

    return (
        <>
            <Link to="/cart" className='view-cart'>View Cart</Link>
            <div className=" my-5">
                <div className='text1p'>Products</div>
                <div className='text2p'>New Arrival</div>
                <div className="row landing">
                    {item.slice(0, 6).map((product) => (

                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
                <div className='button-container'>
                    <Link to="/all-products" className='view-allp'>View All Products</Link>
                </div>
                <div className='best-product'>
                    <div className='text3p'>Best Selling Product</div>
                    <Link to="/all-products" className='view-all2p'>View All</Link>
                </div>
                <div className='best-product2 row'>
                    {item.slice(0, 3).map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Product;
