const Cart = require('../model/cart');
const Cartred = async (req, res) => {
    const { userId, productId } = req.body;
    const data = {
        userId: userId,
        productId: productId,
        

    }

    try {

        const check = await Cart.findOne({userId: userId, productId: productId });
        if(check){
            if (check.quantity > 1) {
                check.quantity -= 1;
                await check.save();
                return res.status(200).json({ message: "Quantity updated in cart" });
            } else {
                return res.status(200).json({ message: "Quantity cannot be less than 1" });
            }
        }
        else{
            console.log("hello1");
            console.log(data);
            // await User.insertMany([data])
            Cart.create(data);
            return res.status(200).json({ message: "Item inserted in cart" });
        }
        
       

    }
    catch (e) {
        res.json(e);
    }


}
module.exports = Cartred;