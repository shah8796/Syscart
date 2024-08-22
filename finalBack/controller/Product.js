const Product = require('../model/prod')
const Prod=async (req, res) => {
    const { id } = req.params;
    
    try {
      const product = await Product.findOne({id:id});
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching product', error });
    }
  };
module.exports=Prod;