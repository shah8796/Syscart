const Cart = require('../model/cart');
const Cartadd = async (req, res) => {
    const { userId, productId, quantity, price, img, title } = req.body;
    const data = {
        userId: userId,
        productId: productId,
        quantity: quantity,
        price: price,
        img: img,
        title: title

    }

    try {

        const check = await Cart.findOne({ productId: productId });
        if(check){
           check.quantity+=quantity;
           await check.save();
           return res.status(200).json({ message: "Quantity updated in cart" });
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
module.exports = Cartadd;