import Navbar from "./navbar";
import Columns from "./landinpage";
import Product from "./product";
import AllProducts from "./allproducts";
import { CartProvider } from "./cardcontext";

function Home() {
    return (
        <>
            {/* <Navbar /> */}
            
            <CartProvider>
            <Columns />
            </CartProvider>


        </>
    )
}
export default Home;