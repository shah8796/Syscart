const OrderModel=require('../model/order');
const Orderview=(req,res)=>{
    OrderModel.find()
    .then(orders=>res.json(orders))
    .catch(err=>res.json(err))
} 
module.exports=Orderview;