'use client'
import React, {useEffect, useState} from 'react';
import {EditorContent, useEditor} from '@tiptap/react'
import css from './page.module.css'
import {tiptapConfig} from "ui/tiptapEditor/tiptap.config";
import {ToolBar} from "ui/tiptapEditor/ToolBar";
import ImageMoveable from "ui/tiptapEditor/ImageMoveable";
import EditorInput from "/lib/EditorInput";

export default function TiptapEditor({params}) {
    const [fileName, setFileName] = useState(""); // 添加文件名称的状态变量
    const editor = useEditor({
        ...tiptapConfig, content: '', editable: true,
    });
    const [updateContent, setUpdateContent] = useState({})
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/blog/${params.id}`);
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
    const handleFileChange = (e) => {
        const fileInput = e.target;
        const file = fileInput.files[0];
        fileInput.value = '';

        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;

            img.onload = () => {
                // 使用 canvas 进行图片压缩
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                // 设定 canvas 的宽和高
                const MAX_WIDTH = 800;  // 你可以设置为其他值
                const MAX_HEIGHT = 800; // 你可以设置为其他值
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);

                // 将压缩后的图片转换为 data URL
                const base64 = canvas.toDataURL('image/jpeg', 0.8); // 0.8 是 JPEG 的质量设置
                setUpdateContent({ ...updateContent, banner: base64 });
                setFileName(file.name); // 更新文件名称
            };
        };
        reader.readAsDataURL(file);
    };

    const handleButtonClick = () => {
        document.getElementById("fileInput").click(); // 触发文件选择操作
    };
    return (<>
        <div className="wrapper">
            <div className={css.body_editor}>
                <EditorInput updateContent={updateContent} isTitle={true} setValue={setUpdateContent} title={"标题"}/>
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
                {editor ? <><ImageMoveable editor={editor}/>
                    {/*如果传了updateId，那么等于去更新*/}
                    <ToolBar defaultContent={updateContent} updateId={params.id} editor={editor}/> </> : null}
                <EditorContent editor={editor}/>
            </div>
        </div>
    </>)
}

