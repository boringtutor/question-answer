"use client"

import { extractPdf } from '@/const/api';
import { Dispatch, SetStateAction, useState } from 'react';

const url:string = extractPdf
export async function getPdfContent({setState}:{setState:Dispatch<SetStateAction<string>>}){
  try {
    const respose = await fetch(url,{
      signal:AbortSignal.timeout(3000),
    })
    if(!respose.ok){
      throw new HttpError(respose);
    }
    const data = await respose.json();
    // console.log(data);
    setState(data.content);
  }
  catch(error){
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
    
  

}

export default function Home() {
  const [pdfContent, setPdfContent] = useState('');

  return (
    <div>
      <button 
      className='bg-blue-500 text-white p-2 rounded-md mx-6 my-6'
      onClick={()=>getPdfContent({setState:setPdfContent})}
        >Get PDF</button>
        <div>
          {pdfContent}
        </div>
    </div>
  );
}



class HttpError extends Error {
  constructor(public response:Response) {
    super(`HTTP error! status: ${response.status}`);
  }
}