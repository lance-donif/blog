import {NextResponse} from "next/server";

export async function GET() {
    const res = await fetch("http://127.0.0.1:8000", {next: {revalidate: 0}})
    const result = await res.json()
    return NextResponse.json(result)
}

//
// const data= {
//     "reaquestDate": "1.2秒",
//     "data": [
//         {
//             "id":1,
//             "title": "hello word",
//             "introduce": "介绍这个世界",
//             "createDate": "2023/9/23",
//             "img":"/Apple_Apple-celebrates-30-years_Apple-established-Apple-Education-Hub-at-Zhejiang-University_big_slideshow-xlarge_2x.jpg"
//         },   {
//             "id":2,
//             "title": "hello word",
//             "introduce": "介绍这个世界",
//             "createDate": "2023/9/23",
//             "img":"/Apple_Apple-celebrates-30-years_Forrest-Liu-is-CEO-and-co-founder-of-Shanghai-base-developer-miHoYo_big_slideshow-xlarge_2x.jpg"
//         }, {
//             "id":3,
//             "title": "hello word",
//             "introduce": "介绍这个世界",
//             "createDate": "2023/9/23",
//             "img":"/Apple_Apple-celebrates-30-years_Genshin-Impact-is-the-flagship-game-of-miHoYo-and-one-of-the-Apple-Design-Awards-winners-in-2021_big_slideshow-xlarge_2x.jpg"
//         }, {
//             "id":4,
//             "title": "hello word",
//             "introduce": "介绍这个世界",
//             "createDate": "2023/9/23",
//             "img":"/Apple_Apple-celebrates-30-years_Landing-page_landing-gradient-xlarge_2x.jpg"
//         }, {
//             "id":5,
//             "title": "hello word",
//             "introduce": "介绍这个世界",
//             "createDate": "2023/9/23",
//             "img":"/Apple_Apple-celebrates-30-years_Student-coders-exchanged-ideas-at-App-Contest_big_slideshow-xlarge_2x.jpg"
//         },{
//             "id":6,
//             "title": "hello word",
//             "introduce": "介绍这个世界",
//             "createDate": "2023/9/23",
//             "img":"/Apple_Apple-celebrates-30-years_Wang-Jiachao-uses-accessibility-features-on-Apple-Watch-for-daily-training_inline_slideshow-xlarge_2x.jpg"
//         },{
//             "id":7,
//             "title": "hello word",
//             "introduce": "介绍这个世界",
//             "createDate": "2023/9/23",
//             "img":"/Apple_Apple-celebrates-30-years_Xi-Zhinong-organized-Wonders-at-Our-Fingertips-A-World-Seen-Through-iPhone-exhibition-in-Dali_big_slideshow-xlarge_2x.jpg"
//         },
//     ]
// }
