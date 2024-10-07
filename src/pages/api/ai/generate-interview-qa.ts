import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';


import path from 'path';
import { getTextFromImage, getTextFromPDF } from '../utils/textExtraction';
 
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// API Route to handle generating interview questions and answers
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { jobDescription, yearsOfExperience, filePath } = req.body;

  if (!jobDescription && !filePath) {
    return res.status(400).json({ message: 'Job description or file path is required' });
  }

  if (!yearsOfExperience) {
    return res.status(400).json({ message: 'Years of experience is required' });
  }

  try {
    let finalJobDescription = jobDescription;

    // Extract text based on file type
    if (filePath) {
      const extension = path.extname(filePath).toLowerCase();
      if (extension === '.pdf') {
        const pdfText = await getTextFromPDF(filePath);
        finalJobDescription = pdfText;
      } else if (['.jpg', '.jpeg', '.png'].includes(extension)) {
        const imageText = await getTextFromImage(filePath);
        finalJobDescription = imageText;
      } else {
        return res.status(400).json({ message: 'Invalid file type. Only .pdf, .jpg, .jpeg, and .png files are allowed.' });
      }
    }

    // Create the prompt for generating questions and answers
    const prompt = `Generate 10 interview questions and answers based on the following job description and the required years of experience.

Job Description: ${finalJobDescription}
Required Years of Experience: ${yearsOfExperience} years.

Interview Questions and Answers:`;

    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-3.5-turbo',
      max_tokens: 1500,
      temperature: 0.7,
    });


    const questionsAndAnswers = chatCompletion.choices[0]?.message?.content;

    if (!questionsAndAnswers) {
      return res.status(500).json({ message: 'Failed to generate questions and answers' });
    }

    // Return the generated questions and answers
    res.status(200).json({ jobDescription: finalJobDescription, yearsOfExperience, questionsAndAnswers });
  } catch (error) {
    console.error('Error generating questions and answers:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
 