export const generateQuestionAnswerPrompt = (document:string)=>{
    return `You are an AI assistant tasked with generating question-answer pairs from a given document. The document is provided below. Please read the document carefully and generate insightful questions along with their corresponding answers based on the content.

Document:
<Document>
${document}
</Document>

Generate question-answer pairs:
Question: [Your question here]
A: [Option A]
B: [Option B]
C: [Option C]
D: [Option D]
Correct Answer: [Correct option]
Question: [Your question here]
A: [Option A]
B: [Option B]
C: [Option C]
D: [Option D]
Correct Answer: [Correct option]`
}

export const generateSummaryPrompt = (document:string)=>{
   return `You are an AI assistant tasked with summarizing the following text. Focus on extracting key insights and presenting them in a concise manner. Ensure that the summary captures the main points and essence of the text.
Document:
<Document>
${document}
</Document>

Summary: [Your summary here]`
}


