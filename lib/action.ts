'use server';

import { revalidatePath } from "next/cache";
import * as pdfjsLib from "pdfjs-dist";
await import('pdfjs-dist/build/pdf.worker.min.mjs');
import { calculateCosineSimilarity } from './utils';

export type UploadState = {
    similarity: number;
    error?: string | undefined;
};

type OllamaResponse = {
  model: string; 
  embeddings: number[][];
  total_duration: number; 
  load_duration: number; 
  prompt_eval_count: number;
};


export async function upload(state: UploadState, formData: FormData) {  
    try {
        const description = formData.get('jobDescription') as string;
        const resume = formData.get('resume') as File;

        const pdfData = await resume.arrayBuffer();
        const pdfDocument = await pdfjsLib.getDocument(pdfData).promise;
        let parsedText = "";

        for (let i = 1; i <= pdfDocument.numPages; i++) {
            const page = await pdfDocument.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map(item => (item as any).str).join(" ");
            parsedText += ` ${pageText}`;
        }


        const values = await embedText(description);
        const resumeVector = await embedText(parsedText); 
        
        const cosineSimilarity = calculateCosineSimilarity(values, resumeVector);

        return { similarity: cosineSimilarity };
    } catch (error: unknown) {
      console.error(error);
        return { similarity: 0, error: 'An internal error occurred' };
    } finally {
        revalidatePath('/');
    }
}


async function embedText(text: string): Promise<number[]> {

  const request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "mistral",
      input: text
    })
  }

  const response = await fetch(process.env.OLLAMA_EMBED_API_ENDPOINT!, request);

  if(!response.ok) {
    throw new Error(await response.text());
  }

  const data: OllamaResponse = await response.json();
  console.log(data);

  if (!data.embeddings) {
    throw new Error("Failed to retrieve embedding")
  }

  return data.embeddings[0];
  
}
