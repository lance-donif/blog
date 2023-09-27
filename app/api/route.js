import {NextResponse} from "next/server";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

export async function GET() {
    const url = process.env.NEXT_PUBLIC_url

    // const url = "http://gz.lancevps.top:9999"
    const res = await fetch(`${url}`, {next: {revalidate: 0}})
    const result = await res.json()
    return NextResponse.json(result)
}
