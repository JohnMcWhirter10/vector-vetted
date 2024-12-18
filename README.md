# Vector Vetted

![Logo](logo.png)

Vector Vetted a web application designed to match Resumes with Job descriptions utilizing Text Embeddings and the Cosine Similarity function. 

## Features
- **Next.js Framework**: Efficient server-side rendering and static site generation.
- **TailwindCSS**: Styled components for a responsive and aesthetic design.
- **ReactJS**: Modern and declarative UI development.
- **REST API**: Fetch and handle data seamlessly.
- **Ollama API**: Integrated for local text analysis.
- **Cosine Similarity**: Utilize the cosine similarity function for match determination.
- **PDF Viewer**: A simple PDF viewer utilizing PDF.js. 

## Tech Stack
- **Backend**: Next.js
- **Frontend**: ReactJS, TailwindCSS

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/JohnMcWhirter10/vector-vetted.git
   cd vector-vetted
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

- `npm run dev`: Starts the development server with asset copying.
- `npm run build`: Builds the production-ready application.
- `npm run start`: Runs the production build.
- `npm run lint`: Lints the codebase using Next.js lint rules.
- `npm run tsc`: Checks for TypeScript errors without emitting compiled files.
- `npm run copy-assets`: Copies required assets to the `public/` directory.

## Environment Setup
To integrate OpenAI, Pinecone, and Ollama, ensure you have the required API keys and configurations:

1. Create a `.env.local` file in the root of your project.
2. Add the following variables:
   ```env
   OPENAI_API_KEY=your-openai-api-key
   PINECONE_API_KEY=your-pinecone-api-key
   VECTOR_VETTED_HOST=your-vector-vetted-host
   OLLAMA_EMBED_API_ENDPOINT=http://localhost:11434/api/embed
   ```

For installing the Ollama service locally, refer to their [GitHub repository](https://github.com/ollama).

## Dependencies
- **@pinecone-database/pinecone**: Used for vector database operations.
- **openai**: API client for OpenAI models.
- **pdfjs-dist**: Library for working with PDF files.
- **next**: React-based framework for building modern web applications.

## DevDependencies
- **autoprefixer**: Automatically adds vendor prefixes to CSS.
- **postcss**: CSS processing tool.
- **tailwindcss**: Utility-first CSS framework.
- **typescript**: Static type checking.
- **@types**: TypeScript definitions for React, Node.js, etc.

## Future Improvements
- Complete integration of OpenAI for easily obtainable text analysis.
- Leverage Pinecone for advanced vector search capabilities.
- Enhance UI/UX with interactive and responsive designs.
- Implement storage of resumes and job descriptions using **AWS RDS** and **S3 Bucket**.

## License
This project is licensed under the MIT License.

---


