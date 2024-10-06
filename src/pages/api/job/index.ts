import { MongoDbJobRepository } from '@/app-logic/infrastructure/repositories/mongodb-job-repository';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const jobRepository = new MongoDbJobRepository();
      const jobs = await jobRepository.getAllJobs();

      return res.status(200).json(jobs);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
