import style from "/app/page.module.css";
import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function Card({data, token}) {
    return (<div className={style.card}>

        {token ? <UpdateEditor id={data.id}/> : null}
        <Link href={`/blog/${data.id}`}>
            {data.banner ? <Image
                alt={data.title}
                src={data.banner}
                width={0}
                height={0}
                sizes="100vw"
                className={style.card_img}
            /> : <div className={style.card_img}></div>}
            <div className={style.card_text}>
                <div>
                    <div className={style.card_text_title}>{data.title}</div>
                    <div className={style.card_text_introduce}>{data.introduce}</div>
                </div>
                <div className={style.card_text_createDate}>{data.createDate}</div>
            </div>
        </Link>
    </div>);
}

function UpdateEditor({id}) {
    return (<>
        <div key={id} className={style.updateEditor}>

            <Link href={`/editor/${id}`}>
                <div
                    className={style.updateEditorSvg}
                    title={"编辑博客"}
                >

                </div>
            </Link></div>
    </>)
}
