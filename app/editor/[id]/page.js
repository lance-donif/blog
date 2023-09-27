'use client'
import React, {useEffect, useState} from 'react';
import {useEditor, EditorContent} from '@tiptap/react'
import css from './page.module.css'
import {tiptapConfig} from "ui/tiptapEditor/tiptap.config";
import {ToolBar} from "ui/tiptapEditor/ToolBar";
import ImageMoveable from "ui/tiptapEditor/ImageMoveable";
import EditorInput from "/lib/EditorInput";

export default function TiptapEditor({params}) {
    const editor = useEditor({
        ...tiptapConfig, content: '', editable: true,
    });
    const [updateContent, setUpdateContent] = useState({

    })
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/blog/${params.id}`);
                const result = await response.json();
                const content = result.data;
                setUpdateContent(content.at(0))
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
            <div className={css.body_editor}>
                <EditorInput updateContent ={updateContent } isTitle={true} setValue={setUpdateContent} title={"标题"}/>
                <EditorInput updateContent ={updateContent }  isTitle={false} setValue={setUpdateContent} title={"介绍语"}/>
                {editor ? <><ImageMoveable editor={editor}/>
                    {/*如果传了updateId，那么等于去更新*/}
                    <ToolBar defaultContent={updateContent} updateId={params.id} editor={editor}/> </> : null}
                <EditorContent editor={editor}/>
            </div>
        </div>
    </>)
}

