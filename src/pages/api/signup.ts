import { NextApiRequest, NextApiResponse } from 'next';
import { SignupUseCase } from '../../app-logic/use-cases/auth/signup';
import jwt from 'jsonwebtoken';
import { MongoDbUserRepository } from '@/app-logic/infrastructure/repositories/mongodb-user-repository';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, password, name } = req.body;

  try {
    const userRepository = new MongoDbUserRepository();
    const signupUseCase = new SignupUseCase(userRepository);
    await signupUseCase.execute({  email, password, name });

    // Generate JWT token after successful signup
    const token = jwt.sign( { email },  process.env.JWT_SECRET || 'your_jwt_secret',  { expiresIn: '1h' });

    // Return the token as part of the response
    res.status(201).json({ message: 'User created successfully', token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
