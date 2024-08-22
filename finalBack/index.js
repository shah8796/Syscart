const express = require('express');
const cors = require('cors');
const SignupController = require('./controller/Signup');
const LoginController = require('./controller/Login');
const Itemcontroller = require('./controller/Item');
const MenController = require('./controller/Men');
const WomenController = require('./controller/Women');
const FootwareController = require('./controller/Footware');
const ElectronicController = require('./controller/Electronics');
const ProddetailController = require('./controller/Product');
const CartController = require('./controller/Cart');
const CartshowController = require('./controller/Cartshow');
const Cartred = require('./controller/Cartred');
const Cartdel = require('./controller/Cartdel');
const Cartinc = require('./controller/Cartinc');
const ordercontroller = require('./controller/Order');
const orderretrieve = require('./controller/Orderview');
const { getUserProfile, updateUserProfile } = require('./controller/userProfile');

const mongoose = require('mongoose');

const app = express();

// MongoDB connection
mongoose.connect('mongodb+srv://alishah03028796:Sasra03028796131@cluster0.uvfiyyq.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cors());

// Routes
app.post('/signup', SignupController);
app.post('/login', LoginController);
app.get('/items', Itemcontroller);
app.get('/Men', MenController);
app.get('/Women', WomenController);
app.get('/footware', FootwareController);
app.get('/Electronics', ElectronicController);
app.get('/items/:id', ProddetailController);
app.post('/cart', CartController);
app.get('/cartshow/:userId', CartshowController);
app.post('/cartred', Cartred);
app.post('/cartdel', Cartdel);
app.post('/cartinc', Cartinc);
app.post('/order', ordercontroller);
app.get('/orders', orderretrieve);

// Use the correct route handlers
app.get('/profile', getUserProfile);
app.put('/profile', updateUserProfile);

app.listen(8000, () => {
    console.log('Server running on port 8000');
});
