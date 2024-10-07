import mongoose, { Schema } from 'mongoose';

const interviewSchema = new Schema({
  jobId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Job', // Reference to the Job model
    required: true 
  },
  yearsOfExperience: { type: Number, required: true },
  questionsAndAnswers: [
    {
      question: { type: String, required: true },
      answer: { type: String, required: true },
    },
  ],
}, {
  timestamps: true,
});

export const InterviewModel = mongoose.models.Interview || mongoose.model('Interview', interviewSchema);
