import {NextResponse} from "next/server";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
export const revalidate = true
export const fetchCache = 'default-no-store'
export async function GET() {
    const url = process.env.NEXT_PUBLIC_url
    const time = process.env.NEXT_PUBLIC_timeNumber

    const res = await fetch(url, {next: {revalidate: time}})
    const result = await res.json()
    return NextResponse.json(result)
}
