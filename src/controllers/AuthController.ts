import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User';
import validator from 'validator';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body;

    
    if (!email || !username || !password) {
      return res.status(400).json({ error: 'Email, username, and password are required' });
    }


    const hashedPassword = await bcrypt.hash(password, 10);


    const newUser = await User.create({
      email: email,
      username: username,
      password: hashedPassword
    });

    return res.status(201).json(newUser);
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;


  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  try {

    const user = await User.findOne({ where: { email } });

    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

 
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'secret');


    res.json({ token });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};