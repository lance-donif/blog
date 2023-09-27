import React, {useRef,} from "react";
import {useRouter} from 'next/navigation'

export function ToolBar({defaultContent, updateId, editor}) {
    const router = useRouter()
    const fileInputRef = useRef(null);
    const handleUpload = () => {
        fileInputRef.current.click();
    };
    const handleImageChange = (event) => {
        const fileInput = event.target;
        const file = fileInput.files[0];
        // 重置文件输入字段的值
        fileInput.value = '';
        const reader = new FileReader();
        reader.onload = () => {
            console.log(file.name)
            const base64 = reader.result;
            editor.commands.setImage({src: base64, alt: file.name});
        };
        reader.readAsDataURL(file);
    };

    async function SaveHtml() {
        const url = updateId ? `http://localhost:3000/api/editor/${updateId}` : `http://localhost:3000/api/editor`;
        const data = {
            ...defaultContent,
            editorHtml: editor.getHTML(),
        };
        await fetch(url, {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify(data),
        })
            .then(response => response.json())
            // eslint-disable-next-line no-unused-vars
            .then(result => {
                console.log(result);
                // 处理返回的结果
                router.push("/")
            })
            .catch(error => {
                console.error('Error:', error);
                // 处理错误
                alert(error)
            });
    }

    const toolbarConfig = [{
        name: '居中',
        src: '/editor/align-center.svg',
        button: () => editor.chain().focus().setTextAlign('center').run(),
    }, {
        name: '居左', src: '/editor/align-left.svg', button: () => editor.chain().focus().setTextAlign('left').run(),
    }, {
        name: '居右', src: '/editor/align-right.svg', button: () => editor.chain().focus().setTextAlign('right').run(),
    }, {
        name: '加粗', src: '/editor/bold.svg', button: () => editor.chain().focus().toggleBold().run(),
    }, {
        name: '上传图片', src: '/editor/image-add-fill.svg', button: handleUpload,
    },]
    return <div>
        <input
            type="file"
            ref={fileInputRef}
            style={{display: 'none'}}
            onChange={handleImageChange}
        />
        <ul style={{
            display: 'flex', padding: '10px', border: '2px solid black', borderRadius: '10px',
        }}>
            {toolbarConfig.map((svg, index) => {
                return <li key={index}
                           onClick={svg.button}
                           style={{
                               display: 'flex',
                               flexDirection: 'row-reverse',
                               justifyContent: 'center',
                               alignItems: 'center', // border: '2px solid black',
                               marginRight: '6px'
                           }}>
                    <div
                        style={{
                            width: '20px', height: "20px", backgroundImage: `url('${svg.src}`,
                        }}
                        title={svg.name}
                    >

                    </div>
                </li>
            })}


            <li key={999}
                onClick={SaveHtml}
                style={{
                    display: 'flex',
                    flexDirection: 'row-reverse',
                    justifyContent: 'center',
                    alignItems: 'center', // border: '2px solid black',
                    marginRight: '6px'
                }}>
                <div
                    style={{
                        fontSize: '12px'
                    }}
                >
                    保存
                </div>
            </li>
        </ul>
    </div>
}
