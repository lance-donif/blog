import {NextResponse} from 'next/server'

export async function GET(req,{params}) {


    const url = `http://127.0.0.1:8000/blog/${params.id}`;
    const res = await fetch(url,{ next: { revalidate: 0 } } )
    const data = await res.json()
    return NextResponse.json(data)

}