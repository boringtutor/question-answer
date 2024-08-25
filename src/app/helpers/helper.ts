import { PdfReader } from "pdfreader";

export default function parsePdf(dataBuffer: Buffer): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const reader = new PdfReader();
    const data: string[] = [];

    reader.parseBuffer(dataBuffer, (err, item) => {
      if (err) {
        console.error('Error parsing PDF:', err);
        reject(err);
        return;
      }
      
      if (!item) {
        // End of file reached
        if (data.length === 0) {
          reject(new Error('PDF is empty or unreadable'));
        } else {
          resolve(data);
        }
        return;
      }

      if (item.text) {
        data.push(item.text);
      }
    });
  });
}