import { UserModel } from '../models/user-model';
import { connectToDatabase } from './mongodb';

export const db = {
    User: UserModel,
    connect: connectToDatabase
};
