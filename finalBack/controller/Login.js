const User = require('../model/db');
const jwt = require('jsonwebtoken');

const Login = async (req, res) => {
    const { usr, email, password, type } = req.body;

    try {
        const user = await User.findOne({ email: email });

        if (user) {
            console.log(user);
            const passcheck = user.password === password;

            if (passcheck) {
                
                const token = jwt.sign(
                    {  email: user.email, type: user.type },
                    'hello', 
                    { expiresIn: 3600 } 
                );

                return res.status(200).json({
                    message: "Email exists",
                    token: token 
                });

            } else {
                return res.status(401).json({ message: "Wrong Password" });
            }
        } else {
            return res.status(404).json({ message: "User doesn't exist" });
        }
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

module.exports = Login;
