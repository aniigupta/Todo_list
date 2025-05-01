const User = require("../Model/User");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(403).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ name, email, password: hashedPassword });

        return res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body; 

        if (!email || !password) {
            return res.status(403).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(403).json({ message: "Incorrect email or password" });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password); 
        if (!isPasswordMatch) {
            return res.status(403).json({ message: "Incorrect email or password" });
        }

        return res.status(200).json({ message: `Login successful. Welcome back, ${user.name}` });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
