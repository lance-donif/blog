'use client'
import style from "@/app/page.module.css";
import Link from "next/link";
import React from "react";

export default function TokenInsert({token}) {
    console.log(token)
    return <> {token ?
            <Link href={'/editor'}>
                <div className={style.insert}>

                    <div className={style.insertIcon}></div>

                </div>
            </Link>: null}</>
}