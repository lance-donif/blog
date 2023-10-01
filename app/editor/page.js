'use client'
import React, {useMemo, useState} from 'react';
import {useEditor, EditorContent} from '@tiptap/react'
import css from './page.module.css'
import {tiptapConfig} from "ui/tiptapEditor/tiptap.config";
import {ToolBar} from "ui/tiptapEditor/ToolBar";
import ImageMoveable from "ui/tiptapEditor/ImageMoveable";
import EditorInput from "/lib/EditorInput";
import {handleFile} from "/lib/handleFile";



export default function TiptapEditor() {
    const [fileName, setFileName] = useState(""); // 添加文件名称的状态变量
    const editor = useEditor({...tiptapConfig, editable: true,});
    const [updateContent, setUpdateContent] = useState({
        title: '',
        introduce: '',
        banner: '',
        editorHtml: ''
    })
    const {handleFileChange, handleButtonClick} = handleFile(setUpdateContent, updateContent, setFileName);

    return (
        <>
            <div className="wrapper">
                <div className={css.body_editor}>
                    <EditorInput updateContent={updateContent} isTitle={true} setValue={setUpdateContent}
                                 title={"标题"}/>
                    <EditorInput updateContent={updateContent} isTitle={false} setValue={setUpdateContent}
                                 title={"介绍语"}/>
                    <div>
                        <div>宣传图</div>

                        <input id="fileInput" type="file" onChange={handleFileChange}
                               style={{display: "none"}}/> {/* 隐藏文件输入框 */}
                        <button onClick={handleButtonClick} className={css.uploadButton}>上传图片</button>
                        {/* 使用按钮触发文件选择操作 */}
                        {fileName && <p>{fileName}</p>} {/* 显示文件名 */}
                    </div>

                    {editor ?
                        <><ImageMoveable editor={editor}/>
                            <ToolBar defaultContent={updateContent} editor={editor}/> </> : null}
                    <EditorContent editor={editor}/>
                </div>
            </div>
        </>
    )
}

