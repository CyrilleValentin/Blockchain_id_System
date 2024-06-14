import { DeleteUser, SaveUser } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {

  try {
    const requestData = await request.json();
    console.log(requestData);
    if(requestData.typeOp=="GrantRole"){
      SaveUser(requestData.address,"Verifier")
    }else{
      DeleteUser(requestData.address)
    }
return NextResponse.json(requestData)
  } catch (error) {
    return NextResponse.error();
  }
}