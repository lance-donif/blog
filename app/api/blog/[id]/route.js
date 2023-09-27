import {NextResponse} from 'next/server'
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

export async function GET(req,{params}) {
    const url1 = process.env.NEXT_PUBLIC_url


    const url = `${url1}/blog/${params.id}`;
    const res = await fetch(url,{ next: { revalidate: 0 } } )
    const data = await res.json()
    return NextResponse.json(data)

}