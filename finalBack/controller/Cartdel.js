const Cart = require('../model/cart');

const Cartdel = async (req, res) => {
    const { userId, productId } = req.body;

    try {
        
        const check = await Cart.findOne({ userId: userId, productId: productId });

        if (check) {
            
            await Cart.deleteOne({ userId: userId, productId: productId });
            return res.status(200).json({ message: "Item deleted from cart" });
        } else {
            
            return res.status(404).json({ message: "Item not found in cart" });
        }
    } catch (e) {
        
        res.status(500).json({ error: e.message });
    }
}

module.exports = Cartdel;
