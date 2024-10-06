import { NextApiRequest, NextApiResponse } from 'next';
import { MongoDbJobRepository } from '@/app-logic/infrastructure/repositories/mongodb-job-repository';
import { CreateJobUseCase } from '@/app-logic/use-cases/job/create-job';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // Directly extract the JSON from the body
    const { title, jobMode } = req.body;

    if (!title || !jobMode) {
      return res.status(400).json({ message: 'Title and Job Mode are required.' });
    }

    const jobRepository = new MongoDbJobRepository();
    const createJobUseCase = new CreateJobUseCase(jobRepository);

    // Execute the use case for creating the job
    const newJob = await createJobUseCase.execute({
      title: title as string,
      jobMode: jobMode as 'Remote' | 'Onsite',
      uploadedFileName: 'test.pdf', // Since no file upload, we just set this to an empty string
    });

    return res.status(201).json(newJob);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server Error', error: error.message });
  }
}
