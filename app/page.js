'use client'
import React, {useEffect, useState} from 'react';
import style from './page.module.css'
import Image from 'next/image'
import Link from "next/link";
import {getTokenFromLocalStorage} from "/lib/getTokenFromLocalStorage";

export default function Home() {
    const token = getTokenFromLocalStorage()
    const [homeData, setHomeData] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('http://localhost:3000/api');
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const result = await response.json();
                // console.log(result)
                setHomeData(result.data);
            } catch (error) {
                console.error("There was a problem with the fetch operation:", error.message);
            }
        }

        async function fetchLogin(token) {
            const url = `http://localhost:3000/api/login/${token}`
            console.log(url)
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const result = await response.json();
                if (!result.data.token) localStorage.setItem('token', '');
                console.log(result.data.token)
            } catch (error) {
                console.error("There was a problem with the fetch operation:", error.message);
            }
        }

        if (token) {
            fetchLogin(token)
        }
        fetchData();
    }, []);
    return (<div className="wrapper">
        <div className={style.body}>
            <h2 className={style.body_title}>最新消息</h2>
            <div className={style.body_layout}>
                <div className={style.insert}>
                    <Link href={'/editor'}>
                        <div className={style.insertIcon}></div>
                    </Link>
                </div>
                {homeData ? homeData.map((item) => (<Card token={token} key={item.id} data={item}/>)) : null}
            </div>

        </div>
    </div>);
}

function Card({data, token}) {
    console.log(token)
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
