"use client"

import { extractPdf, getQA, getSummary } from '@/const/api';
import { questionAnswerSchemaType } from '@/utils/helpers';

import { fetchSummary, MOCK_SUMMARY } from '@/utils/misc';
import { Dispatch, SetStateAction, useState } from 'react';


const testData = "Introduction to Algorithms: 6.006 Massachusetts Institute of Technology Instructors: Erik Demaine, Jason Ku, and Justin Solomon Lecture 2: Data Structures Lecture 2: Data Structures Data Structure Interfaces • A data structure is a way to store data, with algorithms that support operations on the data • Collection of supported operations is called an interface (also API or ADT) • Interface is a speciﬁcation: what operations are supported (the problem!) • Data structure is a representation: how operations are supported (the solution!) • In this class, two main interfaces: Sequence and Set Sequence Interface (L02, L07) ";




const url:string = extractPdf
export async function getPdfContent({setState,setQuestionAnswer,setIsLoading}:{setState:Dispatch<SetStateAction<string>>,setQuestionAnswer:Dispatch<SetStateAction<questionAnswerSchemaType | null>>,setIsLoading:Dispatch<SetStateAction<boolean>>}){
  setIsLoading(true);
  try {
    // const respose = await fetch(url,{
    //   signal:AbortSignal.timeout(3000),
    // })
    // if(!respose.ok){
    //   throw new HttpError(respose);
    // }
    // const data = await respose.json();
    // console.log(data.content);
    // console.log('getting summary from openai' );
    // const summary = await fetchSummary(testData);
    // console.log('got the summary', summary);
    const summary = MOCK_SUMMARY;
    console.log('getting question answer from openai' );
    const response = await fetch(getQA,{
        method:'POST',
        body:JSON.stringify({summary})
    });
    const data = await response.json();
    // console.log('question answer from openai', data.content);
    const questionAnswer = data.content as questionAnswerSchemaType;
    console.log('question answer', questionAnswer);
    setQuestionAnswer(questionAnswer);
  }
  catch(error){
    console.error('error', error);
    if(error instanceof HttpError){
      
      if(error.response.status === 404){
        console.log('PDF not found');
      } 
      else if(error.response.status === 408){
        console.log('Request timed out');
      }
      else if(error.response.status === 500){
        console.log('Internal server error');
      }
      else  {
        throw error;
      }
    } else {
      console.error('An unexpected error occurred:', error);
    }
  }
  finally {
    setIsLoading(false);
  }
    
  

}

export default function Home() {
  const [pdfContent, setPdfContent] = useState('');
  const [questionAnswer, setQuestionAnswer] = useState<questionAnswerSchemaType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">PDF Question Generator</h1>
        <button 
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mb-8"
          onClick={() => getPdfContent({setState: setPdfContent, setQuestionAnswer: setQuestionAnswer, setIsLoading})}
          disabled={isLoading}
        >
          {isLoading ? 'Generating Questions...' : 'Get PDF Questions'}
        </button>
        
        {isLoading && (
          <div className="flex justify-center items-center mb-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {!isLoading && questionAnswer && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-center mb-4 text-gray-700">Generated Questions</h2>
            {questionAnswer.answer.map((answer, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg p-6 transition duration-300 ease-in-out hover:shadow-lg">
                <p className="text-xl font-semibold mb-4 text-gray-800">{answer.question}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <p className="bg-gray-100 p-3 rounded text-gray-700 hover:bg-gray-200 transition duration-300">{answer.answer1}</p>
                  <p className="bg-gray-100 p-3 rounded text-gray-700 hover:bg-gray-200 transition duration-300">{answer.answer2}</p>
                  <p className="bg-gray-100 p-3 rounded text-gray-700 hover:bg-gray-200 transition duration-300">{answer.answer3}</p>
                  <p className="bg-gray-100 p-3 rounded text-gray-700 hover:bg-gray-200 transition duration-300">{answer.answer4}</p>
                </div>
                <p className="font-medium text-green-600 mb-2">Correct Answer: {answer.correctAnswer}</p>
                <p className="text-gray-600 italic">{answer.explanation}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}



class HttpError extends Error {
  constructor(public response:Response) {
    super(`HTTP error! status: ${response.status}`);
  }
}