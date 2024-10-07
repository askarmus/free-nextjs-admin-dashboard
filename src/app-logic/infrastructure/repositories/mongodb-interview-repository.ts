import { InterviewModel } from "../models/interview-model";

export class MongoDbInterviewRepository {
  async saveInterview(data: { jobId: string; yearsOfExperience: number; questionsAndAnswers: { question: string; answer: string }[] }) {
    const newInterview = new InterviewModel(data);
    await newInterview.save();
    return newInterview;
  }

  async getInterviewById(id: string) {
    return await InterviewModel.findById(id).populate('jobId'); // Populate jobId reference
  }
}
