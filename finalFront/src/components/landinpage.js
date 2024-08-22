import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/landinpage.css';
import image1 from '../Assets/image1.jpg';
import image2 from '../Assets/image2.png';  // Ensure this path is correct
// Ensure this path is correct
import { CartProvider } from './cardcontext';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Product from './product';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Columns = () => {
    // const history = useHistory();
    const sidebarStyle = {
        position: 'sticky',
        top: 0,
        height: '100vh',
        width: '16.67%', 
        backgroundColor: '#f8f9fa',
        overflowY: 'auto',
        zIndex: 1000,
    };
   
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2 d-none d-lg-flex flex-column sidebar" >
                    <div className="list-group flex-grow-1">
                        <Link to="womenfashion" className="list-group-item list-group-item-action">
                            <i className="fas fa-female"></i> Women's Fashion
                        </Link>
                        <Link to="menfashion" className="list-group-item list-group-item-action">
                            <i className="fas fa-male"></i> Men's Fashion
                        </Link>
                        <Link to="footware" className="list-group-item list-group-item-action">
                            <i className="fas fa-shoe-prints"></i> Shoes Apparel
                        </Link>
                        <Link to="electronics" className="list-group-item list-group-item-action">
                            <i className="fas fa-tshirt"></i> Accessories
                        </Link>
                        <Link to="electronics" className="list-group-item list-group-item-action">
                            <i className="fas fa-laptop"></i> Electronics
                        </Link>
                    </div>
                    {/* <div className="logout-section mt-auto">
                        <a href="#" className="list-group-item list-group-item-action">
                            <i className="fas fa-sign-out-alt"></i> Logout
                        </a>
                    </div> */}
                </div>
                <div className="col-md-10">
                    <div className="image-row">
                        <img src={image1} alt="First image" className="image-item image-item-first" />
                        <img src={image2} alt="Second image" className="image-item image-item-second" />
                    </div>
                    <CartProvider>
                        <Product />
                    </CartProvider>
                </div>
            </div>
        </div>
    );
};

export default Columns;
