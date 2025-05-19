import jwt from 'jsonwebtoken';
import User from '../models/User.js';


const generateTokens = (user) => {
    const accessToken = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
    return { accessToken, refreshToken };
  };

  export const register = async (req, res) => {
    const { email, password, role } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email already in use' });
  
    const user = new User({ email, password, role });
    await user.save();
    res.status(201).json({ message: 'User registered' });
  };

  export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  
    const { accessToken, refreshToken } = generateTokens(user);
    user.refreshToken = refreshToken;
    await user.save();
  
    res.json({ accessToken, refreshToken });
  };

  export const refresh = async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ error: 'Refresh token missing' });
  
    try {
      const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      const user = await User.findById(payload.userId);
      if (!user || user.refreshToken !== refreshToken) {
        return res.status(403).json({ error: 'Invalid refresh token' });
      }
  
      const { accessToken, refreshToken: newRefreshToken } = generateTokens(user);
      user.refreshToken = newRefreshToken;
      await user.save();
  
      res.json({ accessToken, refreshToken: newRefreshToken });
    } catch {
      res.status(401).json({ error: 'Token expired or invalid' });
    }
  };