import { UserRepository } from '../../app-logic/domain/repositories/user-repository';
import { User } from '../../app-logic/domain/entities/user';
import { connectToDatabase } from '../database/mongodb';
import { UserModel } from '../models/user-model'; // Changed to named import

export class MongoDbUserRepository implements UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    await connectToDatabase();
    const user = await UserModel.findOne({ email }).exec();
    return user ? { id: user._id.toString(), ...user.toObject() } : null;
  }

  async createUser(user: Partial<User>): Promise<void> {
    await connectToDatabase();
    const newUser = new UserModel(user);
    await newUser.save();
  }
}
