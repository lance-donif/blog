import {NextResponse} from "next/server";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

export async function GET(request) {
    const url = "http://gz.lancevps.top:9999"
    const res = await fetch(`${url}`, {next: {revalidate: 30}})
    const result = await res.json()
    return NextResponse.json(result)
}
