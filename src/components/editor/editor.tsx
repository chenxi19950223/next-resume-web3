import '@wangeditor/editor/dist/css/style.css' // 引入 css

import React, { useState, useEffect } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import {useRouter} from "next/router";

function MyEditor(props: any) {
    const route = useRouter();
    // editor 实例
    const [editor, setEditor] = useState<IDomEditor | null>(null)   // TS 语法
    // const [editor, setEditor] = useState(null)                   // JS 语法

    // 编辑器内容
    const [html, setHtml] = useState(`<p>${route.query.name}的简历<br/>${route.query.desc}</p>`)

    // 模拟 ajax 请求，异步设置 html
    useEffect(() => {
        // const name = route.query.name;
        // setTimeout(() => {
        //     setHtml(`<p>${name}</p>`)
        // }, 1500)
    }, [])

    // 工具栏配置
    const toolbarConfig: Partial<IToolbarConfig> = { }  // TS 语法
    // const toolbarConfig = { }                        // JS 语法

    // 编辑器配置
    const editorConfig: Partial<IEditorConfig> = {    // TS 语法
        // const editorConfig = {                         // JS 语法
        placeholder: '请输入内容...',
    }

    const outputHtml = (html: string) => {
        console.log(html);
        props.getHtml(html);
    }

    // 及时销毁 editor ，重要！
    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])

    function getHtml(editor: any) {
        outputHtml(editor.getHtml())
        setHtml(editor.getHtml())
    }

    return (
        <>
            <div style={{ border: '1px solid #ccc', zIndex: 100}} className='h-full flex flex-col'>
                <Toolbar
                    editor={editor}
                    defaultConfig={toolbarConfig}
                    mode="default"
                    style={{ borderBottom: '1px solid #ccc' }}
                />
                <Editor
                    defaultConfig={editorConfig}
                    value={html}
                    onCreated={setEditor}
                    onChange={(editor: any) => getHtml(editor)}
                    mode="default"
                    style={{ height: '500px', overflowY: 'hidden' }}
                    className='flex-1'
                />
            </div>
        </>
    )
}

export default MyEditor
