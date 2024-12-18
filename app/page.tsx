'use client'
import { useActionState } from "react";
import Form from 'next/form';
import { Button, Input, PDFViewer } from "./ui";
import { upload } from "../lib/action";

const Page = () => {

  const [state, formAction, isPending] = useActionState(upload, {error: undefined, similarity: 0});


  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">
        Upload Your Resume and Job Description
      </h2>
      <Form action={formAction}>
        <PDFViewer id='resume' w={600}/>
        <Input type='textarea' placeholder='Enter job description' id='jobDescription' rows={4} >
          Job Description:
        </Input>
        <Button 
        type='submit' 
        disabled={isPending} 
        className={`${isPending ? 'bg-gray-500' : 'bg-blue-500'} text-white p-2 rounded`} >
          {isPending ? 'Loading...' : 'Submit'}
          </Button>
      </Form>
      {state.similarity > 0 && <h3 className="bg-green-500">Score: {state.similarity}</h3>}
      {state.error && <h3 className="bg-red-500">{state.error}</h3>}
    </div>
  );
};

export default Page;
