const Orderitem = require('../model/order')
const Order = async (req,res) => {
    const { firstName, lastName, address, city, state, zip, country, cartItems, customerId } = req.body;
    const data = {
        firstName: firstName,
        lastName: lastName,
        address: address,
        city: city,
        state: state,
        zip: zip,
        country: country,
        cartItems: cartItems,
        customerId: customerId

    }
    try {
        Orderitem.create(data);
        res.status(200).json({message:'order added'});
    }
    catch(e){
        res.status(200).json({message:'order not added'});
    }
}
module.exports=Order;