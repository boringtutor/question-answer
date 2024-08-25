
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { PdfReader } from "pdfreader";
import parsePdf from '@/app/helpers/helper';

export async function GET() {
  try {
    const pdfPath = path.join(process.cwd(), 'src', 'assets', 'mit_lec.pdf');
    console.log('PDF Path:', pdfPath);
    
    if (!fs.existsSync(pdfPath)) {
      return NextResponse.json({ error: "PDF file not found" }, { status: 404 });
    }

    const dataBuffer = fs.readFileSync(pdfPath);
    console.log('Data buffer length:', dataBuffer.length);

    try {
      const data: string[] = [];
  
      const result:Array<string> =await parsePdf(dataBuffer);
      if(result.length>0){
        return NextResponse.json({ content: result });
      }
      else{
        return NextResponse.json({ error: "Error parsing PDF" }, { status: 500 });
      }
      
    } catch (pdfError) {
      console.error('Error parsing PDF:', pdfError);
      return NextResponse.json({ error: "Error parsing PDF" }, { status: 500 });
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Error processing file' }, { status: 500 });
  }
}


