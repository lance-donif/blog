import css from "./tiptap.module.css";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import TiptapImage from "./tiptapImage";

export const tiptapConfig={
    editable: false,
    // onUpdate({ editor }) {
    //     const json = editor.getHTML();
    //     // 下边请求接口
    // },
    autofocus: true,

    editorProps: {
        attributes: {
            class: css.editor,
        },
    },
    extensions: [
        StarterKit, TextAlign.configure({
            types: ['heading', 'paragraph'],
        }), TiptapImage.configure({
            allowBase64:true,
            HTMLAttributes:{class:'tiptapImage'}
        })
    ],
    content: '<p>Hello World! 🌎️</p>'
}