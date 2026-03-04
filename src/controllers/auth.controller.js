import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { isValidEmail, isStrongPassword } from "../utils/validators.js";

export const register = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    // ❌ Missing fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 🔥 NORMALIZE EMAIL
    email = email.toLowerCase();

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (!isStrongPassword(password)) {
      return res.status(400).json({
        message:
          "Password must be 8+ chars, include uppercase, lowercase, number & special character",
      });
    }

    // ❌ User exists (case-insensitive safe)
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    await User.create({
      name,
      email, // ✅ STORED AS LOWERCASE
      password: hashedPassword,
    });

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email & password required" });
    }

    // 🔥 NORMALIZE EMAIL
    email = email.toLowerCase();

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
