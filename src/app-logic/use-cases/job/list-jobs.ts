import { JobRepository } from '../../domain/repositories/job-repository';

export class ListJobsUseCase {
  constructor(private jobRepository: JobRepository) {}

  async execute() {
    return await this.jobRepository.getAllJobs();
  }
}
