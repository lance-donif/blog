import css from "/lib/layout.module.css";
import Link from "next/link";

export default function HeadNav(){

     return <nav className={css.nav}>
        <div className={css.wrapper}>
            <div>
                <Link href={"/"}>
                    <div className={css.title}>Lance Blog
                    </div>
                </Link>
            </div>
            <div className={css.title}>
                <Link href={"/login"}>
                    <div className={css.login}></div>
                </Link></div>
        </div>
    </nav>;
}