import { Job } from '../entities/job';

export interface JobRepository {
  createJob(job: Partial<Job>): Promise<void>;
  updateJob(id: string, job: Partial<Job>): Promise<void>;
  deleteJob(id: string): Promise<void>;
  getAllJobs(): Promise<Job[]>;
}
