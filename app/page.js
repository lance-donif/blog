'use client'
import React, {useMemo, useState} from 'react';
import style from './page.module.css'
import Link from "next/link";
import {getTokenFromLocalStorage} from "/lib/getTokenFromLocalStorage";
import Card from "/ui/Card";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

export default function Home() {
    const token = getTokenFromLocalStorage()
    const [homeData, setHomeData] = useState([]);
    const urlC = process.env.NEXT_PUBLIC_urlC

    useMemo( () => {
        async function fetchData() {
            try {
                const response = await fetch(`${urlC}/api`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const result = await response.json();
                setHomeData(result.data);
            } catch (error) {
                console.error("There was a problem with the fetch operation:", error.message);
            }
        }

        async function fetchLogin(token) {
            const url = `${urlC}/api/login/${token}`
            console.log(url)
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const result = await response.json();
                if (!result.data.token) localStorage.setItem('token', '');
            } catch (error) {
                console.error("There was a problem with the fetch operation:", error.message);
            }
        }

        if (token) {
            fetchLogin(token)
        }
        fetchData();
    }, [token]);
    return (<div className="wrapper">
        <div className={style.body}>
            <h2 className={style.body_title}>最新消息</h2>
            <div className={style.body_layout}>
                <div className={style.insert}>
                    <Link href={'/editor'}>
                        <div className={style.insertIcon}></div>
                    </Link>
                </div>
                {homeData?.map((item) => (<Card token={token} key={item.id} data={item}/>)) }
            </div>

        </div>
    </div>);
}

