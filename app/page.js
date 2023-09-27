'use client'
import React, {useMemo, useState} from 'react';
import style from './page.module.css'
import Link from "next/link";
import {getTokenFromLocalStorage} from "/lib/getTokenFromLocalStorage";
import Card from "/ui/Card";

export default function Home() {
    const token = getTokenFromLocalStorage()
    const [homeData, setHomeData] = useState([]);
    useMemo(() => {
        async function fetchData() {
            try {
                const response = await fetch(`/api`);
                const result = await response.json();

                setHomeData(result.data);
            } catch (error) {
                console.error("There was a problem with the fetch operation:", error.message);
            }
        }

        async function fetchLogin(token) {
            const url = `/api/login/${token}`
            try {
                const response = await fetch(url);

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
            <div style={{display: 'flex', alignItems: 'center',flexWrap: 'wrap'}}>
                <h2 className={style.body_title}>最新消息</h2>
                {token?  <div className={style.insert}>
                    <Link href={'/editor'}>
                        <div className={style.insertIcon}></div>
                    </Link>
                </div>:null}
            </div>
            <div className={style.body_layout}>


                {homeData?.map((item) => (<Card token={token} key={item.id} data={item}/>))}
            </div>

        </div>
    </div>);
}

