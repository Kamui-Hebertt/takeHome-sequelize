import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User';
import validator from 'validator';
import { verifyToken } from '../middleware/authMiddleware';


export const register = async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body;


    const existingEmailUser = await User.findOne({ where: { email: email } });
    if (existingEmailUser) {
      return res.status(400).json({ error: 'Email já existe' });
    }


    const existingUsernameUser = await User.findOne({ where: { username: username } });
    if (existingUsernameUser) {
      return res.status(400).json({ error: 'Nome de usuário já existe' });
    }

    if (!email || !username || !password) {
      return res.status(400).json({ error: 'Email, nome de usuário e senha são obrigatórios' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email: email,
      username: username,
      password: hashedPassword
    });

    return res.status(201).json(newUser);
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};


export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;


  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: 'Formato de email inválido' });
  }

  try {

    const user = await User.findOne({ where: { email } });

  
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }


    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'segredo');

  
    res.json({ token });
  } catch (error) {
    console.error('Erro ao fazer login do usuário:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};


export const someProtectedRouteHandler = async (req: Request, res: Response) => {
  try {
 
    verifyToken(req, res, () => {
   
      res.json({ message: 'Usuário autenticado acessando rota protegida' });
    });
  } catch (error) {
    console.error('Erro ao lidar com rota protegida:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};
