import { JobRepository } from '../../domain/repositories/job-repository';

interface CreateJobInput {
  title: string;
  jobMode: 'Remote' | 'Onsite';
  uploadedFileName: string;
}

export class CreateJobUseCase {
  constructor(private jobRepository: JobRepository) {}

  async execute(input: CreateJobInput): Promise<void> {
    const newJob = {
      title: input.title,
      jobMode: input.jobMode,
      uploadedFileName: input.uploadedFileName,
    };

    await this.jobRepository.createJob(newJob);
  }
}
