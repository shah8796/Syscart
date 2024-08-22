const Cart = require('../model/cart')
const Carts = async (req,res) => {
    const { userId } = req.params;
    try {
        
        const items = await Cart.find({userId:userId});
        res.status(200).json(items);
    }
    catch{
        res.status(200).json({message:"Couldn't find items"})
    }
}
module.exports = Carts;