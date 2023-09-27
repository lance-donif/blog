import {NextResponse} from "next/server";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

export async function GET(request, {params}) {
    const url1 = process.env.NEXT_PUBLIC_url

    const blogToken = params.id // '1'
    const url = `${url1}/login?token=${blogToken}`;
    const res = await fetch(url)
    const data = await res.json()
    return NextResponse.json(data)
}