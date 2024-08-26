import { getSummary } from "@/const/api";

export async function fetchSummary(text:string){
    try{

      console.log('starting the fetch summary' );
        const response = await fetch(getSummary, {
            method: "POST",
            body: JSON.stringify({ text }),
            // signal:AbortSignal.timeout(3000),
        });
        if(!response.ok){
          console.error('error in fetch summary' );
            throw new HttpError(response);
          }
        const data = await response.json();
        return data.text;
    }
    catch(error){
        if(error instanceof HttpError){
          
          if(error.response.status === 404){
            console.error('PDF not found');
          } 
          else if(error.response.status === 408){
            console.error('Request timed out');
          }
          else if(error.response.status === 500){
            console.error('Internal server error');
          }
          else  {
            throw error;
          }
        } else {
          console.error('An unexpected error occurred:', error);
        }
      }

}


export class HttpError extends Error {
    constructor(public response:Response) {
      super(`HTTP error! status: ${response.status}`);
    }
  }



export const MOCK_SUMMARY = `got the summary 1. Main Topics:
The main topics discussed in the text are the concept of data structures, their interfaces, and the two main interfaces that will be covered in the class, namely Sequence and Set.

2. Key Facts:
- The text is from the second lecture of the course "Introduction to Algorithms: 6.006" at the Massachusetts Institute of Technology.
- The instructors of this course are Erik Demaine, Jason Ku, and Justin Solomon.
- The lecture focuses on data structures and their interfaces.
- Data structures are ways to store data, and they come with algorithms to support operations on this data.
- The collection of supported operations in a data structure is called an interface, also known as an API or ADT.
- An interface is a specification of what operations are supported, while a data structure is a representation of how these operations are supported.

3. Concepts Explained:
- Data Structure: It's a way to organize and store data in a computer so that it can be used efficiently.
- Interface (API or ADT): It's a set of rules that define how a data structure or a software component should interact with the system or other components.
- Sequence and Set: These are two main types of interfaces that will be discussed in the class. The specifics of these interfaces are not explained in the provided text.

4. Cause-Effect Relationships:
The text does not explicitly mention any cause-effect relationships.

5. Chronology:
The text does not provide a timeline of events or processes.

6. Important Quotes:
"A data structure is a way to store data, with algorithms that support operations on the data."
"Interface is a specification: what operations are supported (the problem!)."
"Data structure is a representation: how operations are supported (the solution!)."

7. Conclusions or Implications:
The text introduces the concept of data structures and their interfaces, emphasizing the distinction between the two. It also mentions that the course will focus on two main interfaces, Sequence and Set. The understanding of these concepts is crucial for anyone studying algorithms or computer science in general.`


export const MOCK_QUESTIONS = {
  numberOfquestion: 5,
  answer:[
    {
    answer1: "Data structures and their interfaces",
    answer2: "Sorting algorithms",  
    answer3: "Machine learning techniques",
    answer4: "Database management",
    correctAnswer: "a",
    explanation: "The text states that the lecture focuses on data structures and their interfaces.",
    question: "What is the primary focus of the second lecture in the 'Introduction to Algorithms: 6.006' course?"
  },
  {
    answer1: "Erik Demaine, Jason Ku, and Justin Solomon",
    answer2: "John Doe, Jane Smith, and Alan Turing",
    answer3: "Ada Lovelace, Grace Hopper, and Tim Berners-Lee",
    answer4: "Linus Torvalds, Bill Gates, and Steve Jobs",
    correctAnswer: "a",
    explanation: "The text mentions that the instructors are Erik Demaine, Jason Ku, and Justin Solomon.",
    question: "Who are the instructors of the 'Introduction to Algorithms: 6.006' course?"
  },
  {
    answer1: "A physical component of a computer",
    answer2: "A specification of what operations are supported",
    answer3: "A type of programming language",
    answer4: "A hardware device",
    correctAnswer: "b",
    explanation: "The text defines an interface as a specification of what operations are supported.",
    question: "What is an interface in the context of data structures?"
  },
  {
    answer1: "Sequence and Set",
    answer2: "List and Map",
    answer3: "Tree and Graph",
    answer4: "Queue and Stack",
    correctAnswer: "a",
    explanation: "The text states that Sequence and Set are the two main interfaces to be covered in the class.",
    question: "Which two main interfaces will be covered in the course?"
  },
  {
    answer1: "A way to store data, with algorithms that support operations on the data",
    answer2: "A type of computer hardware",
    answer3: "A programming language",
    answer4: "A network protocol",
    correctAnswer: "a",
    explanation: "The text describes a data structure as a way to store data, with algorithms that support operations on the data.",
    question: "How does the text describe a data structure?"
  }
  ]
}