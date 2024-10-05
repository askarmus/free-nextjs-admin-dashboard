import mongoose from 'mongoose';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

export async function connectToDatabase() {
    const connectionString = process.env.MONGODB_URI || serverRuntimeConfig.connectionString;
    
    if (!mongoose.connection.readyState) {
        await mongoose.connect(connectionString, {
             
        });
        mongoose.Promise = global.Promise;
    }
    
    return mongoose.connection;
}
