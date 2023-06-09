import dynamic from 'next/dynamic'
import {useEffect, useState} from "react";
import {useRouter} from "next/router";

const Editor = dynamic(() => import('@/components/editor/editor'), {
    ssr: false
})
function Resume () {
    const route = useRouter();
    const [html, setHtml] = useState<string>('');
    const [name, setName] = useState<string>('');

    useEffect(() => {
        setName(route.query.name as string);
    }, [route.query.name])

    const saveHtml = () => {
        console.log(name);
        console.log(html);
    }

    const handleChange = (e: any) => {
        setName(e.target.value)
        e.preventDefault()
    }


    return (
        <>
            <div className='h-full flex flex-col'>
                <div className='flex justify-between p-3'>
                    <input type="text" defaultValue={route.query.name} onChange={handleChange} className='border-none rounded-[4px] cursor-pointer bg-zinc-500 text-white focus:outline-0'/>
                    <button onClick={saveHtml} className='h-[30px] w-[80px] rounded-[6px] bg-blue-700 text-white'>保存</button>
                </div>
                <div className='flex-1'>
                    <Editor getHtml={(htmlStr: string) => setHtml(htmlStr)}/>
                </div>
            </div>
        </>
    )
}

export default Resume;
