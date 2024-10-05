import { UserRepository } from '../../domain/repositories/user-repository';
import bcrypt from 'bcryptjs';

interface SignupInput {
  email: string;
  password: string;
  name: string;
}

export class SignupUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(input: SignupInput): Promise<void> {
    const existingUser = await this.userRepository.findByEmail(input.email);
    if (existingUser) {
      throw new Error('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(input.password, 10);

    const newUser = {
      ...input,
      hash: hashedPassword,
    };

    await this.userRepository.createUser(newUser);
  }
}
