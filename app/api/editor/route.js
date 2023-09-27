import {NextResponse} from 'next/server'

export async function POST(req) {
    const url = 'http://127.0.01:8000/insert';
    const res = await fetch(url, {
        method: 'POST',
        headers: req.headers,
        body: req.body, duplex: "half",
    })
    const data = await res.json()
    return NextResponse.json({data})

}