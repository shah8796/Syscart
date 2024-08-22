import React,{useState,useEffect} from "react";
import OIP1 from '../Assets/OIP 1.png'; // Import the image
import '../css/item.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck } from '@fortawesome/free-solid-svg-icons';
import { faRecycle } from '@fortawesome/free-solid-svg-icons';
import { decodeToken } from './decodetoken';
import { useNavigate } from "react-router-dom";
import { useCart } from "./cardcontext";
import { useParams } from "react-router-dom";
import axios from "axios";
function Item() {
    const [item, setItem] = useState('');
    const { id } = useParams(); 
    useEffect(()=>{
        axios.get(`http://localhost:8000/items/${id}`)
        .then(response=>setItem(response.data))
        .catch(error => alert('Error fetching data:', error));
        console.log(item);
    },[id])
    const [count,setcount]=useState(1);
    const { addToCart } = useCart(); 
    const history = useNavigate();
    const goToCart = () => {
        const user = decodeToken();
        if (user) {
            addToCart(item);
            axios.post('http://localhost:8000/cart', {
                userId: user.email, // Assuming `id` is a property of the decoded user token
                productId: item.id,
                quantity: count,
                price:item.price,
                img:item.imgSrc,
                title:item.title


            })
            .then(history('/cart'))
            .catch(error => alert(error));

        } else {

            history('/login');
        }
    };
    const increasecount=()=>{
        setcount(prevCount => prevCount + 1);
    }
    const decreasecount=()=>{
        setcount(prevCount => Math.max(prevCount - 1, 1));
    }
    return (
        <>
        <div className="container-fluidp">
            <div className="row mt-2">
                <div className="col-lg-6">
                    <img src={item.imgSrc} className="item-img" />
                </div>
                <div className="col-lg-6 d-flex flex-column align-items-center align-items-lg-start">
                    <div className="text-dark fs-5 mb-1 fw-bold">{item.title}</div>
                    <div className="text-dark fs-5 mb-1">{item.price} RS</div>
                    <div className="text-dark fs-6 mb-1">{item.description}</div>
                    {/* <hr className="hr" /> */}
                    <div className="d-flex">
                        <div className="text-dark fs-5 ">Colors:</div>
                        <div className="custom-radio-group mt-1 ms-4 radio1">
                            <label class="custom-radio ">
                                <input type="radio" name="color" id="red" value="red" />
                                <span className="custom-radio-indicator"></span>

                            </label>
                            <label className="custom-radio">
                                <input type="radio" name="color" id="green" value="green" />
                                <span className="custom-radio-indicator"></span>

                            </label>
                            <label className="custom-radio">
                                <input type="radio" name="color" id="blue" value="blue" />
                                <span className="custom-radio-indicator"></span>

                            </label>
                        </div>
                    </div>
                    <div className="d-flex mt-1">
                        <div className="text-dark fs-5 ">Size:</div>
                        <div className="mt-1 ms-4">
                            <label>
                                <input type="radio" className="size ms-2" name="squareRadio" data-text="XS" />
                            </label>

                            <label>
                                <input type="radio" className="size ms-2" name="squareRadio" data-text="S" />
                            </label>

                            <label>
                                <input type="radio" className="size ms-2" name="squareRadio" data-text="M" />
                            </label>
                            <label>
                                <input type="radio" className="size ms-2" name="squareRadio" data-text="L" />
                            </label>
                            <label>
                                <input type="radio" className="size ms-2" name="squareRadio" data-text="XL" />
                            </label>
                        </div>

                    </div>
                    <div className="d-flex mt-1">
                        <div className="d-flex">
                            <button type="button" className="btnminus" onClick={decreasecount}>-</button>
                            <div className="countarea d-flex justify-content-center align-items-center">{count}</div>
                            <button type="button" className="btnplus" onClick={increasecount}>+</button>
                        </div>
                        <button className="d-flex justify-content-center align-items-center buy ms-2"  onClick={() => goToCart()}>Buy Now</button>
                    </div>
                    <div className="d-flex flex-column align-items-center justify-content-center mt-2 ">
                        <div className="d-flex justify-content-around align-items-center delivery">
                            <div className="mt-1">
                                <FontAwesomeIcon icon={faTruck} />
                            </div>
                            <div className="d-flex flex-column align-items-start">
                                <div>Free Delivery</div>
                                <div>You will receive order at your door step</div>
                            </div>

                        </div>
                        
                        <div className="d-flex justify-content-around align-items-center return">
                            <div className="mt-1">
                                <FontAwesomeIcon icon={faRecycle} />
                            </div>
                            <div className="d-flex flex-column align-items-start">
                                <div>Return Delivery</div>
                                <div>Free 30 days delivery returns</div>
                            </div>

                        </div>
                        




                    </div>




                </div>



            </div></div>
        </>
    )
}
export default Item;