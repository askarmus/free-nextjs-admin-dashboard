import mongoose, { Schema } from 'mongoose';

const jobSchema = new Schema({
  title: { type: String, required: true },
  jobMode: { type: String, enum: ['Remote', 'Onsite'], required: true },
  uploadedFileName: { type: String, required: true }
}, {
  timestamps: true  
});

jobSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;  
  }
});

export const JobModel = mongoose.models.Job || mongoose.model('Job', jobSchema);
