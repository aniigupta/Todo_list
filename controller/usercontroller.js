const User = require("../Model/User");
const bcrypt = require("bcrypt"); // Import bcrypt

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
        await User.create({ name, email, password:hashedPassword });

        return res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};
