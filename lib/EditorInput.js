import React from "react";
import css from './editorInput.module.css'

export default function EditorInput({setValue, title, isTitle,updateContent }) {
    const postValue = (e) => {
        isTitle ? setValue({...updateContent,title: e.target.value}) : setValue({...updateContent,introduce: e.target.value})

    }
    return <div className={css.editorInput}>
        <h2>{title}</h2>
        <div><input defaultValue={isTitle?updateContent.title:updateContent.introduce} onChange={postValue} className={css.input} type="text"/></div>
    </div>
}