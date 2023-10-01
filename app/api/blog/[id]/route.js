import {NextResponse} from 'next/server'
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
export const revalidate = true
export const fetchCache = 'default-no-store'
export async function GET(req,{params}) {
    const url1 = process.env.NEXT_PUBLIC_url
    const time = process.env.NEXT_PUBLIC_timeNumber


    const url = `${url1}/blog/${params.id}`;
    const res = await fetch(url,{ next: { revalidate: time} } )
    const data = await res.json()
    return NextResponse.json(data)

}