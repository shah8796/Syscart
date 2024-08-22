import logo from './logo.svg';
import './App.css';
import Login from './components/login';
import Signup from './components/signup';
import Item from './components/item';
import About from './components/about';
import Contacts from './components/contact';
import Footer from './components/footer';
import Columns from './components/landinpage';
import Navbar from './components/navbar';
import AllProducts from './components/allproducts';
import CartList from './components/cardlist';
import { CartProvider } from './components/cardcontext';
import ReactDOM from "react-dom/client";
import Home from './components/Home';
import MenProducts from './components/MenProducts';
import WomenProducts from './components/WomenProduct';
import Footware from './components/Footware';
import Electronics from './components/Electronics';
import ProductsPage from './components/search';
import Front from './components/order';
// import Footer from './components/footer';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserProfile from './components/userprofile';

// import Product from './components/product';


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          {/* <Route path="/" element={<Navbar />}/> */}
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contacts />} />
          <Route path='/about' element={<About />} />
          <Route path='/signup' element={<Login />} />
          <Route path='/login' element={<Signup />} />
          <Route path="/cart" element={<CartProvider><CartList /></CartProvider>} />
          <Route path='/all-products' element={<CartProvider><AllProducts /></CartProvider>} />
          <Route path='/menfashion' element={<CartProvider><MenProducts /></CartProvider>} />
          <Route path='/womenfashion' element={<CartProvider><WomenProducts /></CartProvider>} />
          <Route path='/electronics' element={<CartProvider><Electronics /></CartProvider>} />
          <Route path='/footware' element={<CartProvider><Footware /></CartProvider>} />
          <Route path='/items/:id' element={<CartProvider><Item /></CartProvider>} />
          <Route path="/search" element={<CartProvider><ProductsPage /></CartProvider>} />
          <Route path="/order" element={<CartProvider><Front /></CartProvider>} />
          <Route path="/profile" element={<UserProfile />} />

          {/* <Route index element={<Columns />} /> */}
          {/* </Route> */}

        </Routes>
        <Footer />
      </Router>

      {/* <Login/> */}
      {/* <Signup/> */}
      {/* <Navbar /> */}
      {/* <Item/> */}
      {/* <Columns/> */}
      {/* <About/> */}
      {/* <Contacts/> */}

      {/* <CartProvider>
        <Product/>
        <CartList />

        <AllProducts />
      </CartProvider> */}
      {/* <AllProducts/> */}

    </div>
  );
}

export default App;
