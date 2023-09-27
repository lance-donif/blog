import Image from '@tiptap/extension-image'
import {mergeAttributes} from "@tiptap/core";
import {ReactNodeViewRenderer} from "@tiptap/react";
import ImageResizeComponent from './ImageResizeComponent';

export default Image.extend({
    name: "tiptapImage", addCommands() {
        return {
            ...this.parent?.(), tiptapImageReSize: ({src, alt, width, height}) => ({commands}) => {
                if (src) {
                    commands.setImage({
                        alt: alt, src: src, width: parseInt(width), height: parseInt(height)
                    });
                }
            }
        };
    }, addOptions() {
        return {
            allowBase64: false, HTMLAttributes: {},
        }
    }, // 添加传参属性
    addAttributes() {
        return {
            ...this.parent?.(), width: {
                default: 0, renderHTML: (attributes) => {
                    return {
                        width: attributes.width
                    };
                }
            }, height: {
                default: 0, renderHTML: (attributes) => {
                    return {
                        height: attributes.height
                    };
                }
            },
        }
    }, parseHTML() {
        return [{
            tag: 'tiptap-image',
        },]
    }, renderHTML({HTMLAttributes}) {
        return ['tiptap-image', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)]
    }, addNodeView() {
        return ReactNodeViewRenderer(ImageResizeComponent)
    },
})