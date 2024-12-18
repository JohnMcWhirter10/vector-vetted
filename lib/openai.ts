import { OpenAI } from 'openai';


async function embed(text: string ): Promise<number[]> {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY!
      });
    
      try {
        const response = await openai.embeddings.create({
          model: "text-embedding-ada-002",
          input: text,
        });
    
        const embedding = response.data[0]?.embedding;
        if (!embedding) {
          throw new Error("Failed to retrieve embedding");
        }
    
        return embedding;
      } catch (error) {
        console.error("Error generating embedding:", error);
        throw new Error("Embedding generation failed");
      }
}