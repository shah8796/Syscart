// AllProducts.js
import React,{useState,useEffect} from 'react';
import items from './jsond/data';
import ProductCard from './productcard';
import '../css/allproducts.css';
import axios from 'axios';

const MenProducts = () => {
    const [item, setItem] = useState('');
    useEffect(()=>{
        axios.get('http://localhost:8000/Men')
        .then(response=>setItem(response.data))
        .catch(error => alert('Error fetching data:', error));
    },[])


    if (!item || item.length === 0) {
        return <div>No products available</div>;
    }
    return (
        <div className="container my-5">
            <div className='text1'>Men Products</div>
            <div className="row">
                {item.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}

export default MenProducts;
