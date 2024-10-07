import path from 'path';
import pdfParse from 'pdf-parse';
import Tesseract from 'tesseract.js';
import fs from 'fs';


// Utility function to extract text from a PDF file path
export async function getTextFromPDF(filePath: string): Promise<string> {
    const pdfBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(pdfBuffer);
    return pdfData.text;
  }
  
  // Utility function to extract text from an image file path
  export async function getTextFromImage(filePath: string): Promise<string> {
    const { data: { text } } = await Tesseract.recognize(filePath, 'eng');
    return text;
  }