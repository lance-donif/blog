import {NextResponse} from "next/server";

export async function GET(request, {params}) {
    const blogToken = params.id // '1'
    const url = `http://127.0.0.1:8000/login?token=${blogToken}`;
    const res = await fetch(url)
    const data = await res.json()
    return NextResponse.json(data)
}