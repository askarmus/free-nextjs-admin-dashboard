import { JobRepository } from '../../domain/repositories/job-repository';

export class DeleteJobUseCase {
  constructor(private jobRepository: JobRepository) {}

  async execute(id: string): Promise<void> {
    await this.jobRepository.deleteJob(id);
  }
}
