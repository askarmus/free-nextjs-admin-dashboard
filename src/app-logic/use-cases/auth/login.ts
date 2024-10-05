import { UserRepository } from '../../domain/repositories/user-repository';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';

export interface LoginInput {
  email: string;
  password: string;
}

export class LoginUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(input: LoginInput): Promise<string> {
    const user = await this.userRepository.findByEmail(input.email);
    
    if (!user) {
      throw new Error('User not found');
    }

    const isValidPassword = await compare(input.password, user.hash);
    const isValidName = user.email === input.email;

    if (!isValidPassword || !isValidName) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, name: user.name },
      process.env.JWT_SECRET || 'your_secret_key',
      { expiresIn: '1h' }
    );

    return token;
  }
}
