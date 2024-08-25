import OpenAI from "openai";

const myOpenAI = new OpenAI({
    organization: process.env.ORGANIZATION_ID,
    project: process.env.PROJECT_ID,
    apiKey: process.env.OPENAI_API,
  });
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";

const answerSchema = z.object({
    question: z.string(),
    answer1: z.string(),
    answer2: z.string(),
    answer3: z.string(),
    answer4: z.string(),
    correctAnswer: z.string(),
    explanation: z.string(),
})

const questionAnswerSchema = z.object({
    numberOfquestion: z.number(),
    answer:z.array(answerSchema),
})

export type questionAnswerSchemaType = z.infer<typeof questionAnswerSchema>;

export async function generateQuestionAnswer(text: string) {
  console.log('starting the generate question answer');
  try{

      const result = await myOpenAI.chat.completions.create({
        model: "gpt-4-0613",
        messages: [
          {
            role: "system",
            content: "You are an expert in creating educational content and multiple-choice questions. Your task is to generate high-quality, topic-specific questions based on the given text. Output your response in JSON format."
          },
          {
            role: "user",
            content: `Document: ${text}`
          },
          {
            role: "system",
            content: `Generate 5 multiple-choice questions based strictly on the provided text. Output the result as a JSON array of question objects. Each question object should have the following structure:
            {
              "question": "Question text",
              "a": "Option A",
              "b": "Option B",
              "c": "Option C",
              "d": "Option D",
              "correctAnswer": "Letter of correct option",
              "explanation": "Brief explanation with reference to the text"
            }
    
            Ensure each question:
            1. Is directly answerable from the given text.
            2. Has one correct answer among the four options.
            3. Has a correct answer explicitly stated or strongly implied in the text.
            4. Has plausible but clearly incorrect distractors based on the text.
            5. Includes a brief explanation citing the relevant part of the text.
    
            Provide the output as a valid JSON array of these question objects.`
          }
        ],
        temperature: 0.3,
        max_tokens: 2000,
        // response_format: { type: "json_object" },
      });
      
      return result.choices[0].message.content;
  }catch(error){
    console.error('error', error);
    return error;
}

  // Parse the JSON string in the content
  
  
  // Assuming the model returns an object with a "questions" key containing the array
}

export async function generateSummary(text:string){
    console.log('starting the generate summary' );
    const result = await myOpenAI.chat.completions.create({
        model: "gpt-4-0613",
        messages: [
          {
            role: "system",
            content: "You are an AI assistant tasked with creating a comprehensive summary of the given text. Focus on extracting key information that could be used to generate questions and answers later."
          },
          {
            role: "user",
            content:
              `Text:${text}`,
          },
          {
            role: "system",
            content: `Provide a detailed summary of the text, structured as follows:

            1. Main Topics: List the primary subjects or themes discussed.
            2. Key Facts: Enumerate important facts, figures, or statistics.
            3. Concepts Explained: Briefly explain any complex concepts or ideas.
            4. Cause-Effect Relationships: Identify any cause and effect relationships mentioned.
            5. Chronology: If applicable, provide a timeline of events or processes described.
            6. Important Quotes: Include any significant quotes or statements.
            7. Conclusions or Implications: Summarize the main takeaways or implications of the text.

            Ensure your summary is detailed enough to serve as a basis for generating multiple-choice questions later.`
          }
        ],
        temperature: 0.4,
        // max_tokens: 1000
      });
    
      return result.choices[0].message.content;
}

export async function generateQuestionAnswerWithZod(text:string):Promise<questionAnswerSchemaType | null> {
    try{
        const completion = await myOpenAI.beta.chat.completions.parse({
            model: "gpt-4o-2024-08-06",
            messages: [
                {
                  role: "system",
                  content: "You are an expert in creating educational content and multiple-choice questions. Your task is to generate high-quality, topic-specific questions based on the given text. Output your response in JSON format."
                },
                {
                  role: "user",
                  content: `Document: ${text}`
                },
                {
                  role: "system",
                  content: `Generate 5 multiple-choice questions based strictly on the provided text. Output the result as a JSON array of question objects. Each question object should have the following structure:
                  {
                    "question": "Question text",
                    "a": "Option A",
                    "b": "Option B",
                    "c": "Option C",
                    "d": "Option D",
                    "correctAnswer": "Letter of correct option",
                    "explanation": "Brief explanation with reference to the text"
                  }
          
                  Ensure each question:
                  1. Is directly answerable from the given text.
                  2. Has one correct answer among the four options.
                  3. Has a correct answer explicitly stated or strongly implied in the text.
                  4. Has plausible but clearly incorrect distractors based on the text.
                  5. Includes a brief explanation citing the relevant part of the text.
          
                  Provide the output as a valid JSON array of these question objects.`
                }
              ],
              temperature: 0.3,
              max_tokens: 2000,
            response_format: zodResponseFormat(questionAnswerSchema, "questionAnswer"),
          });
          const event = completion.choices[0].message.parsed;
          return event ?? null;
        }catch(error){
        console.error('error', error);
        return null;
    }
}