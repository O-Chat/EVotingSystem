const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');

router.post('/register', async (req, res) => {
    const { name, email, password, role, adminCode} = req.body;
    try {
        //Checking for double user
        const userExists = await User.findOne({ email });
        if (userExists)
            return res.status(400).json({ message: "This user already exists" });
        // Check for admin code if role is admin
        if (role === 'admin') {
            if (adminCode !== process.env.ADMIN_SECRET_CODE) {
                return res.status(403).json({ message: "Invalid admin credentials" });
            }
        }
        //Hashing the password
        const SALT_Rounds = 10;
        const hashedPassword = await bcrypt.hash(password, SALT_Rounds);
        //Creating new User
        const newUser = new User({ name, email, password: hashedPassword, role});
        await newUser.save();
        return res.status(201).json({ message: "User added successfully with hashed password" });
    } catch (err) {
        return res.status(500).json({ message: "Server error" })
    }

})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        //Checking if this user is registered
        const userExists = await User.findOne({ email });
        if (!userExists)
            return res.status(400).json({ message: "User does not exist" });

        //Comparing password with registered password
        const isMatch = await bcrypt.compare(password, userExists.password);
        if (!isMatch)
            return res.status(400).json({ message: "Invalid Email or Password" });
        //signing JWT
        const token = jwt.sign(
            { id: userExists._id, role: userExists.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )
        console.log(token);
        //returning JWT
        return res.status(200).json({ 
            message: 'Login successful (bcrypt verified) 🎉',
             token:token
             });

    } catch (err) {
        return res.status(500).json({ message: "Server error" });
    }
})


module.exports = router;
