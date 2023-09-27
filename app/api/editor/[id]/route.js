import {NextResponse} from 'next/server'

export async function POST(req,{params}) {

    const url = `http://127.0.0.1:8000/update/${params.id}`;
    const res = await fetch(url, {
        method: 'POST',
        headers: req.headers,
        body: req.body, duplex: "half",
    })
    const data = await res.json()
    return NextResponse.json(data)

}