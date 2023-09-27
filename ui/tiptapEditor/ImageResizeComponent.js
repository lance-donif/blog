/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useRef} from 'react'
import {NodeViewWrapper} from '@tiptap/react'
import Image from 'next/image'
import {PhotoProvider, PhotoView} from 'react-photo-view';

export default function ImageResizeComponent(props) {
    const imgRef = useRef(null);
    return (<>
        <NodeViewWrapper className="tiptapImage">
            <PhotoProvider>

                <div>
                    <PhotoView key={imgRef} src={props.node.attrs.src}>
                        {props.node.attrs.width > 0 ? <Image
                            ref={imgRef}
                            {...props.node.attrs}
                        /> : <Image
                            ref={imgRef}
                            sizes="100vw"
                            style={{width: '100%', height: '100%'}}
                            {...props.node.attrs}
                        />}
                    </PhotoView>

                </div>
            </PhotoProvider>

        </NodeViewWrapper>
    </>);
}