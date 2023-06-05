import dynamic from 'next/dynamic'

const Editor = dynamic(() => import('@/components/editor/editor'), {
    ssr: false
})
function Resume () {


    return (
        <>
            <div className='h-full flex flex-col'>
                <div className='flex justify-between p-3'>
                    <button></button>
                    <button className='h-[30px] w-[80px] rounded-[6px] bg-blue-400 text-white'>保存</button>
                </div>
                <div className='flex-1'>
                    <Editor />
                </div>
            </div>
        </>
    )
}

export default Resume;
