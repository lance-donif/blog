'use client'
import React, {useEffect} from 'react';
import style from './page.module.css'
import {EditorContent, useEditor} from "@tiptap/react";
import {tiptapConfig} from "ui/tiptapEditor/tiptap.config";

export default function Blog({params}) {
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
                console.log(content)
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
            <div className={style.blog}>
                <EditorContent editor={editor}/>
            </div>
        </div>

    </>)
}

