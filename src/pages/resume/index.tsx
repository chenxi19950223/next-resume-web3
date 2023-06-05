import dynamic from 'next/dynamic'
import { useState } from "react";

const Editor = dynamic(() => import('@/components/editor/editor'), {
    ssr: false
})
function Resume (props: any) {
    const [html, setHtml] = useState<string>('');

    const saveHtml = () => {
        console.log(html);
    }


    return (
        <>
            <div className='h-full flex flex-col'>
                <div className='flex justify-between p-3'>
                    <button></button>
                    <button onClick={saveHtml} className='h-[30px] w-[80px] rounded-[6px] bg-blue-400 text-white'>保存</button>
                </div>
                <div className='flex-1'>
                    <Editor getHtml={(htmlStr: string) => setHtml(htmlStr)}/>
                </div>
            </div>
        </>
    )
}

export default Resume;
