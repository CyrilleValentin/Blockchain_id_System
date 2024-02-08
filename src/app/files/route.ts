import { NextRequest, NextResponse } from "next/server";
import fs from 'fs';
import PinataClient, { PinataPinOptions, PinataConfig } from "@pinata/sdk";
function extractFileName(path: string): string {
  const regex = /[^\\\/]*$/;
  const matches = path.match(regex);
  return matches ? matches[0] : '';
}
export async function POST(request: Request) {
  try {
    const requestData = await request.json();
    const prefix= `C:\\Users\\Cyrille\\Downloads\\`
   const fileName=extractFileName(requestData.image)
   const imageUrl=prefix+fileName;
   const stream = fs.createReadStream(imageUrl);
   console.log(imageUrl);
    const options: PinataPinOptions = {
      pinataMetadata: {
        name: requestData.firstname
      },
    };
   // const { PINATA_API_KEY, PINATA_API_SECRET, PINATA_JWT } = process.env;
    const pinataConfig: PinataConfig = {
      pinataApiKey: "d1dc5e9b2d22e7553167",
    pinataSecretApiKey: "4bca757fda5c82ab549dbd6253a0629deff097f0dca963fc351d56705e1f3b7b",
     pinataJWTKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI3Y2ZjZGMxOS0xMWQ5LTRlZDktOTI5YS04MzVhYTczNDczMTAiLCJlbWFpbCI6ImN5cmlsbGVreXJpbGxvczZAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImQxZGM1ZTliMmQyMmU3NTUzMTY3Iiwic2NvcGVkS2V5U2VjcmV0IjoiNGJjYTc1N2ZkYTVjODJhYjU0OWRiZDYyNTNhMDYyOWRlZmYwOTdmMGRjYTk2M2ZjMzUxZDU2NzA1ZTFmM2I3YiIsImlhdCI6MTcwNjcwNDIxNH0.ee8MNjnRBnSAFkyxQlyvgzfSI24Mt4tO78jRk50ivP8"
    };
    const pinata = new PinataClient(pinataConfig);
    const result = await pinata.pinFileToIPFS(stream, options);
    const updatedRequestValue = {
      ...requestData,
      image: result.IpfsHash
    };
    const jsonpin= pinata.pinJSONToIPFS(updatedRequestValue)
    return NextResponse.json(updatedRequestValue);
  } catch (error) {
    return NextResponse.error();
  }
}
