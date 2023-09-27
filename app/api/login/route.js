import {NextResponse} from "next/server";

export async function POST(req) {
    // console.log(await  req.body)
    const res = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: req.headers,
        body: req.body, duplex: "half", next: {revalidate: 0}
    })
    const result = await res.json()
    return NextResponse.json(result)
}
