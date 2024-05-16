import express from 'express';
import { registerUser, loginUser } from '../services/authService.js';

const router = express.Router();

// Register a user
router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;
    const newUser = await registerUser({ firstName, lastName, email, password, role });
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to register user' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await loginUser(email, password);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid username or password' });
  }
});


export default router;


