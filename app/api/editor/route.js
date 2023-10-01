import {NextResponse} from 'next/server'
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
export const revalidate = true
export const fetchCache = 'default-no-store'
export async function POST(req) {
    const url1 = process.env.NEXT_PUBLIC_url

    const url = `${url1}/insert`;
    const res = await fetch(url, {
        method: 'POST',
        headers: req.headers,
        body: req.body, duplex: "half",
    })
    const data = await res.json()
    return NextResponse.json({data})

}