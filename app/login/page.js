'use client'
import style from './page.module.css'
import {useForm} from "react-hook-form";
import { useRouter} from 'next/navigation'
import React from "react";
// import {log} from "next/dist/server/typescript/utils";
export default function Login() {
    const router = useRouter()
    const {
        register, handleSubmit
    } = useForm()
    const onSubmit = async (data, e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/login', {
                method: 'POST', headers: {
                    'Content-Type': 'application/json',
                }, body: JSON.stringify(data),
            });
            const parsedResult = await response.json();
            console.log(parsedResult);
            // 如果请求成功并返回了token，将token存储到LocalStorage中
            if (parsedResult.code === 200 && parsedResult.data.token) {
                localStorage.setItem('token', parsedResult.data.token);
                router.push('/')
            } else {
                alert("登陆失败")
                localStorage.setItem('token', "");
            }
        } catch {
            alert("登陆失败")
            localStorage.setItem('token', "");
        }
    }
    return (<>
        <div className={style.login}>
            <div className={style.login_container}>
                <div className={style.login_img}></div>
                <div className={style.login_content}>
                    <form onSubmit={handleSubmit(onSubmit)} className={style.login_form}>
                        <div>账号</div>

                        <div>
                            <input
                                {...register("account", {required: true, maxLength: 30})}
                                className={style.login_input} placeholder="请输入你的账号" type="text"/>
                        </div>
                        <div>密码</div>

                        <div><input
                            {...register("password", {required: true, maxLength: 30})}
                            className={style.login_input} placeholder="请输入你的密码" type="password"/></div>
                        <button type="submit">登陆</button>
                    </form>
                </div>

            </div>
        </div>
    </>)
}
