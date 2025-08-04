// controllers/authController.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const createToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: 'Email already exists' });

    const user = await User.create({ name, email, password, role });
    const token = createToken(user);
    res.status(201).json({ token, user });
  } catch (err) {
    res.status(500).json({ msg: 'Register failed', err });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }

    const token = createToken(user);
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ msg: 'Login failed', err });
  }
};
