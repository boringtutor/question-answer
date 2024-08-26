import { generateQuestionAnswer, generateQuestionAnswerWithZod, questionAnswerSchemaType } from "@/utils/helpers";
import { MOCK_QUESTIONS } from "@/utils/misc";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    const body = await request.json();
    const {summary} = body;
    
    try{

        // const questionAnswer = await generateQuestionAnswerWithZod(summary);
        const questionAnswer = MOCK_QUESTIONS;
        if (!questionAnswer) {
            return NextResponse.json({ error: "Failed to generate question answer" }, { status: 500 });
        }
        return NextResponse.json({ content: questionAnswer });
    }catch(error){
        return NextResponse.json({error:"Error generating question answer"},{status:500});
    }
}