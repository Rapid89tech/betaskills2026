import { promises as fs } from 'fs';
import path from 'path';

const markdownFilePath = path.resolve(process.cwd(), 'CourseDocuments/Entrepreneurship  - Version 3.md');
const outputDir = path.resolve(process.cwd(), 'src/data/entrepreneurship');
const outputFilePath = path.resolve(outputDir, 'generated-course.ts');

async function main() {
  try {
    const markdownContent = await fs.readFile(markdownFilePath, 'utf-8');
    console.log('Markdown file read successfully.');
    // The parsing and generation logic will go here.
  } catch (error) {
    console.error('Error reading the markdown file:', error);
    process.exit(1);
  }
}

main(); 