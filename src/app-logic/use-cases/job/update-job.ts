import { JobRepository } from '../../domain/repositories/job-repository';

interface UpdateJobInput {
  id: string;
  title: string;
  jobMode: 'Remote' | 'Onsite';
  uploadedFileName: string;
}

export class UpdateJobUseCase {
  constructor(private jobRepository: JobRepository) {}

  async execute(input: UpdateJobInput): Promise<void> {
    const updatedJob = {
      title: input.title,
      jobMode: input.jobMode,
      uploadedFileName: input.uploadedFileName,
    };

    await this.jobRepository.updateJob(input.id, updatedJob);
  }
}
