import {NextResponse} from "next/server";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

export async function POST(req) {
    const url = process.env.NEXT_PUBLIC_url
    const res = await fetch(`${url}/login`, {
        method: "POST",
        headers: req.headers,
        body: req.body, duplex: "half", next: {revalidate: 100}
    })
    const result = await res.json()
    return NextResponse.json(result)
}
