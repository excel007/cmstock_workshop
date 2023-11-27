import { ACCESS_TOKEN_KEY } from "@/utils/constant";
import httpClient from "@/utils/httpClient";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// GET 
export async function GET(
    request: NextRequest,
    context: {
        params: {
            route: string;
        }
    }): Promise<any> {
    const route = context.params.route;
    console.log("GET test =>>>> " + route);
    return NextResponse.json({ route })
}

// POST 
export async function POST(
    request: NextRequest,
    context: {
        params: {
            route: string;
        }
    }): Promise<any> {
    try {
        const route = context.params.route;
        const body = await request.json()
        console.log("POST test =>>>> " + route);
        if (route === "signin") {
            // return NextResponse.json(body)
            return signin(body);
        }
    }catch(error:any)
    {NextResponse.json({error:"Internal Server Error"})}
}

async function signin(body:
    {
        username: string;
        password: string;
    }): Promise<any> {
    try {
        const response = await httpClient.post('/authen/login', body);
        const { token } = response.data;
        cookies().set(ACCESS_TOKEN_KEY, token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            path: "/",
        });
        return NextResponse.json(response.data)
    } catch (error: any) {
        return NextResponse.json({ result: "nok" })
    }
}