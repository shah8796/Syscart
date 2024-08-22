import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from './productcard';

const normalizeText = (text) => {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
};

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get('query') || '';

  // Normalize search term
  const normalizedSearchTerm = normalizeText(searchTerm);

  // Fetch products from the backend
  useEffect(() => {
    fetch('http://localhost:8000/items')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  // Filter products based on the normalized search term
  const filteredProducts = products.filter(product =>
    normalizeText(product.title).includes(normalizedSearchTerm)
  );

  console.log('URL Search Params:', location.search);
  console.log('Search Term:', searchTerm);
  console.log('Filtered Products:', filteredProducts);

  if (loading) {
    return <p>Loading products...</p>;
  }

  return (
    <div className="container">
      <div className="row">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
