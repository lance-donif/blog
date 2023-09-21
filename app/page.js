'use client'
import React, {useEffect, useRef, useState} from 'react';
import {useEditor, EditorContent} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import css from './page.module.css'
import Image from 'next/image'
import TextAlign from '@tiptap/extension-text-align'
import TiptapImage from "./tiptapImage";

export default function Home() {
    const divRef = useRef(null);
    const [imageSize,setImageSize] = useState({width:100,height:100})
    useEffect(() => {

        if (divRef.current) {
            const parentDiv = divRef.current.parentNode;
            const parentWidth = parentDiv.offsetWidth;
            const parentHeight = parentDiv.offsetHeight;
            console.log("父元素的宽度：" + parentWidth);
            console.log("父元素的高度：" + parentHeight);
            // setImageSize({width:parentWidth,height:parentHeight})
        }
    }, [divRef]);
    // 定义编辑器一些属性
    const [tiptapEditor, setTiptapEditor] = useState();
    // tiptap配置
    const editor = useEditor({
        editorProps: {
            attributes: {
                class: css.editor,
            },
        },
        extensions: [
            StarterKit, TextAlign.configure({
                types: ['heading', 'paragraph'],
            }), TiptapImage
        ],
        content: '<p>Hello World! 🌎️</p>' +
            '<tiptap-image ref={divRef}  src="https://source.unsplash.com/8xznAGy4HcY/800x400"></tiptap-image>'
    })
    const svgMap = [
        {
            name: '居中',
            src: '/editor/align-center.svg',
            button: () => editor.chain().focus().setTextAlign('center').run(),
        },
        {
            name: '居左',
            src: '/editor/align-left.svg',
            button: () => editor.chain().focus().setTextAlign('left').run(),
        },
        {
            name: '居右',
            src: '/editor/align-right.svg',
            button: () => editor.chain().focus().setTextAlign('right').run(),
        },
        {
            name: '加粗',
            src: '/editor/bold.svg',
            button: () => editor.chain().focus().toggleBold().run(),
        },
    ]
    return (
        <>
            <div className={css.body}>
                <div style={{
                    width: '700px', height: '500px',
                    backgroundColor: 'pink',
                    borderRadius: '10px',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <div style={{
                        borderRadius: '10px 10px 0 0', backgroundColor: '#fff',
                    }}>
                        <ul style={{
                            display: 'flex',
                            width: '100%',
                            padding: '10px',
                        }}>
                            {svgMap.map((svg, index) => {
                                return <li key={index}
                                           onClick={svg.button}
                                           style={{
                                               display: 'flex',
                                               flexDirection: 'row-reverse',
                                               justifyContent: 'center',
                                               alignItems: 'center',
                                               border: '2px solid black',
                                               marginRight: '6px'
                                           }}>
                                    <div
                                        style={{
                                            width: '20px',
                                            height: "20px",
                                            backgroundImage: `url('${svg.src}`,
                                        }}
                                        title={svg.name}
                                    >

                                    </div>
                                </li>
                            })}
                        </ul>
                    </div>
                    <EditorContent
                        editor={editor}/>
                </div>
            </div>
        </>
    )
};

