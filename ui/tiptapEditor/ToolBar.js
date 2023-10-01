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
                editor.commands.setImage({src: base64, alt: file.name});
            };
        };
        reader.readAsDataURL(file);
    };

    async function SaveHtml() {
        const url = updateId ? `/api/editor/${updateId}` : `/api/editor`;
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
        name: '居左', src: '/editor/align-left.svg', button: () => editor.chain().focus().setTextAlign('left').run(),
    }, {
        name: '居中',
        src: '/editor/align-center.svg',
        button: () => editor.chain().focus().setTextAlign('center').run(),
    }, {
        name: '居右', src: '/editor/align-right.svg', button: () => editor.chain().focus().setTextAlign('right').run(),
    }, {
        name: '加粗', src: '/editor/bold.svg', button: () => editor.chain().focus().toggleBold().run(),
    }, {
        name: '上传图片', src: '/editor/image-add-fill.svg', button: handleUpload,
    }, {
        name: '代码块', src: '/editor/code-view.svg', button: () => editor.chain().focus().toggleCodeBlock().run(),
    }, {
        name: 'H1', src: '/editor/h-1.svg', button: () => editor.chain().focus().toggleHeading({level: 1}).run(),
    }, {
        name: 'H2', src: '/editor/h-2.svg', button: () => editor.chain().focus().toggleHeading({level: 2}).run(),
    }, {
        name: 'H3', src: '/editor/h-3.svg', button: () => editor.chain().focus().toggleHeading({level: 3}).run(),
    }, {
        name: '有序列表',
        src: '/editor/list-ordered.svg',
        button: () => editor.chain().focus().toggleOrderedList().run(),
    }, {
        name: '无序列表', src: '/editor/list-check.svg', button: () => editor.chain().focus().toggleBulletList().run(),
    }]
    return <div>
        <input
            type="file"
            ref={fileInputRef}
            style={{display: 'none'}}
            onChange={handleImageChange}
        />
        <ul style={{
            display: 'flex', flexWrap: 'wrap', padding: '10px', border: '2px solid black', borderRadius: '10px',
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
