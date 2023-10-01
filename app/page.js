'use client'
import React, {useEffect, useState} from 'react';
import style from './page.module.css'
import {getTokenFromLocalStorage} from "/lib/getTokenFromLocalStorage";
import Card from "/ui/Card";
import TokenInsert from "/app/@tokenInsert/page";
let token = null

export default function Home() {
    const [homeData, setHomeData] = useState([]);

    useEffect(() => {
        token = getTokenFromLocalStorage()

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
    }, []);
    return (<div className="wrapper">
        <div className={style.body}>
            <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                <h2 className={style.body_title}>最新消息</h2>
                <TokenInsert token={token}/>
            </div>
            <div className={style.body_layout}>
                {homeData.map((item, index) => (<Card token={token} key={item.id} data={item}/>))}
            </div>
        </div>
    </div>)

}