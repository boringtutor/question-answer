import { getSummaryFromOpenAi } from "@/app/helpers/helper";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    // Get the request body
    const body = await req.json();

    // Extract the text from the body
    const { text } = body;

    if (!text) {
        return new Response(JSON.stringify({ error: "No text provided in the request body" }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }
    try{
        const summary = await getSummaryFromOpenAi(text);

        return new Response(JSON.stringify({ text : summary}), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
        

    }
    catch(error){
        return new Response(JSON.stringify({ error: "Error generating summary" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    // Return the extracted text
}