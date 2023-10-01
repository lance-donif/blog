import Moveable from "react-moveable";
import React from "react";

export default function ImageMoveable({editor}) {




    return <Moveable
        target={document.querySelector('.ProseMirror-selectednode div img')}
        throttleDrag={0}
        keepRatio={true}
        resizable={true}
        throttleResize={0}
        container={null}
        origin={false}
        edge={false}
        onResize={({target, width, height, delta}) => {
            delta[0] && (target.style.width = `${width}px`);
            delta[1] && (target.style.height = `${height}px`);
        }}
        onResizeEnd={({target}) => {
            const node = document.querySelector('.ProseMirror-selectednode div img')
            editor.commands.tiptapImageReSize({
                src: node.src,alt:node.alt,
                width: target.style.width,
                height: target.style.height,
            })
        }}
        scalable={true}
        throttleScale={0}
        renderDirections={["w", "e"]}
    />
}