import { NextApiRequest, NextApiResponse } from 'next';
import { LoginUseCase } from '../../app-logic/use-cases/auth/login';
import { LoginInput } from '../../app-logic/use-cases/auth/login';
import { connectToDatabase } from '@/app-logic/infrastructure/database/mongodb';
import { MongoDbUserRepository } from '@/app-logic/infrastructure/repositories/mongodb-user-repository';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, password }: LoginInput = req.body;

  try {
    // Ensure the MongoDB connection is established before proceeding
    await connectToDatabase();

    // Initialize the repository and the use case for login
    const userRepository = new MongoDbUserRepository();
    const loginUseCase = new LoginUseCase(userRepository);

    // Execute the login use case with the provided credentials
    const token = await loginUseCase.execute({ email, password});

    // Respond with the generated JWT token upon successful login
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    // Handle errors and send appropriate response
    res.status(400).json({ message: (error as Error).message });
  }
}
