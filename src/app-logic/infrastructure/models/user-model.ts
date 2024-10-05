import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    email: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    name: { type: String, required: true },
}, {
    timestamps: true // Automatically create `createdAt` and `updatedAt` fields
});

// Modify the toJSON method to remove sensitive fields like password hash
userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash; // Remove password hash from the JSON response
    }
});

export const UserModel = mongoose.models.User || mongoose.model('User', userSchema);
