const Item = require('../model/prod')
const Items = async (req,res) => {
    try {
        const items = await Item.find({ category: 'Men' });
        res.status(200).json(items);
    }
    catch{
        res.status(200).json({message:"Couldn't find items"})
    }
}
module.exports = Items;