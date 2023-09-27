'use client'
import React, {useEffect, useState} from 'react';
import style from './page.module.css'
import {EditorContent, useEditor} from "@tiptap/react";
import {tiptapConfig} from "ui/tiptapEditor/tiptap.config";

export default function Blog({params}) {
    const [blogHtml, setBlogHtml] = useState({title:'',introduce:'',banner:'',editorHtml:''});
    const editor = useEditor({
        ...tiptapConfig, editable: false, content: "", editorProps: {
            attributes: {
                class: style.blog_editor,
            },
        },
    });
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/blog/${params.id}`);
                const result = await response.json();
                const content = result.data;
                setBlogHtml(content.at(0))
                editor.commands.setContent(content.at(0).editorHtml);
            } catch (error) {
                console.error(error);
            }
        };
        if (editor) {
            fetchData();
        }
    }, [editor, params.id]);
    return (<>
        <div className="wrapper">
            <h1>{blogHtml.title}</h1>
            <h3>{blogHtml.introduce}</h3>
            {blogHtml.banner? <div><img src={blogHtml.banner} className={style.banner} alt="宣传图"/></div>:null}
            <div className={style.blog}>
                <EditorContent editor={editor}/>
            </div>
        </div>

    </>)
}

