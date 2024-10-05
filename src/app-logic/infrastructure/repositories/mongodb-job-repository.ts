import { JobRepository } from "@/app-logic/domain/repositories/job-repository";
import { connectToDatabase } from "../database/mongodb";
import { Job } from "@/app-logic/domain/entities/job";
import { JobModel } from "../models/job-model";


export class MongoDbJobRepository implements JobRepository {
  async createJob(job: Partial<Job>): Promise<void> {
    await connectToDatabase();
    const newJob = new JobModel(job);
    await newJob.save();
  }

  async updateJob(id: string, job: Partial<Job>): Promise<void> {
    await connectToDatabase();
    await JobModel.findByIdAndUpdate(id, job);
  }

  async deleteJob(id: string): Promise<void> {
    await connectToDatabase();
    await JobModel.findByIdAndDelete(id);
  }

  async getAllJobs(): Promise<Job[]> {
    await connectToDatabase();
    return await JobModel.find().exec();
  }
}
