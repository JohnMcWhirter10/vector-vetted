import { Pinecone } from "@pinecone-database/pinecone"; 

function init() {
    return new Pinecone({
      apiKey: process.env.PINECONE_API_KEY!
    })
}

function getIndex() {
    return init().index('vector-vetted', process.env.VECTOR_VETTED_HOST! );
}

export async function upsert(namespace: string, description: string, values: number[]) {

    return getIndex().namespace('job-descriptions').upsert([
        {
          id: `desc-${Date.now()}`,
          values: values,
          metadata: { description }
        }
      ])
}


        