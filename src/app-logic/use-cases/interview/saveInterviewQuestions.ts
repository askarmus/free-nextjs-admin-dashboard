import { MongoDbInterviewRepository } from "@/app-logic/infrastructure/repositories/mongodb-interview-repository";

export class SaveInterviewQuestionsUseCase {
  constructor(private interviewRepository: MongoDbInterviewRepository) {}

  async execute(data: { jobId: string; yearsOfExperience: number; questionsAndAnswers: { question: string; answer: string }[] }) {
    return await this.interviewRepository.saveInterview(data);
  }
}
