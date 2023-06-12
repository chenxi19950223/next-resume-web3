import dynamic from 'next/dynamic'
import {ChangeEventHandler, FormEventHandler, useContext, useEffect, useState} from "react";
import {useRouter} from "next/router";
import {TransactionContext} from "@/Context/TransactionContext";
import {Resume} from '@/types/base';
const Editor = dynamic(() => import('@/components/editor/editor'), {
    ssr: false
})

const Input = ({title, name, input, value }: {title: string, input: any, name: string, value: any}) => {
    return (
        <label className='flex gap-[20px] items-center justify-start' htmlFor="">
            <span className='inline-block text-blue-400 w-[80px]'>{title}：</span><input defaultValue={value} onInput={(e: any) => input({value: e.target?.value, name})} className='rounded-[6px] border-blue-400 flex-1' type="text"/>
        </label>
    )
}

const NumberInput = ({title, name, input, value }: {title: string, input: any, name: string, value: any}) => {
    return (
        <label className='flex gap-[20px] items-center justify-start' htmlFor="">
            <span className='inline-block text-blue-400 w-[80px]'>{title}：</span><input defaultValue={value} onInput={(e: any) => input({value: e.target?.value, name})} className='rounded-[6px] border-blue-400 flex-1' type="number"/>
        </label>
    )
}

const Select = ({title, name, input, value }: {title: string, input: any, name: string, value: any}) => {
    return (
        <label className='flex gap-[20px] items-center justify-start' htmlFor="">
            <span className='inline-block text-blue-400 w-[80px]'>{title}：</span>
            {/*<input onInput={(e: any) => input({value: e.target?.value, name})} className='rounded-[6px] border-blue-400 flex-1' type="number"/>*/}
            <select defaultValue={value} name="" id="" className='rounded-[6px] border-blue-400 flex-1'>
                <option value={0}>男</option>
                <option value={1}>女</option>
            </select>
        </label>
    )
}

function Resume () {
    const {setData, getActiveUser, currentAccount} = useContext(TransactionContext) as any;
    const route = useRouter();
    const [html, setHtml] = useState<string>('');
    const [userInfo, setUserInfo] = useState<Resume>({
        name: '',
        // 用户年龄
        age: 0,
        // 性别
        sex: 0,
        // 手机号
        phone: '',
        // 邮箱
        Email: '',
        // 所在地
        location: '',
        // 简历文件 bsae64格式
        file: '',
        // 简历文档
        doc: ''
    });

    useEffect(() => {
        if (currentAccount) {
            getActiveUser(route.query.address).then((res: Resume) => {
                console.log(res);
                setUserInfo(res);
            })
        }
    }, [currentAccount])

    const saveHtml = () => {
        console.log(userInfo);
        setData(userInfo);

    }

    const handleChange = (e: any) => {
        setUserInfo({
            ...userInfo,
            name: e.target.value as string,
        });
        e.preventDefault()
    }

    const input = (e: any) => {
        setUserInfo({
            ...userInfo,
            [e.name]: e.value as string,
        });
    }

    const getFile = async (e: any) => {
        const file = e.target.files[0];
        if (file.type !== 'application/pdf') {
            console.log('只支持pdf格式');
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e: ProgressEvent<FileReader>) {
            setUserInfo({
                ...userInfo,
                file: e.target?.result as string,
            });
        }
    }



    return (
        <>
            <div className='h-full flex flex-col'>
                <div className='flex justify-between p-3'>
                    <input type="text" defaultValue={userInfo.name} onChange={handleChange} className='border-none rounded-[4px] cursor-pointer bg-zinc-500 text-white focus:outline-0'/>
                    <button onClick={saveHtml} className='h-[30px] w-[80px] rounded-[6px] bg-blue-700 text-white'>保存</button>
                </div>
                <form className='p-[20px]  flex-wrap border-t-8'>
                    <div className='user-info'>
                        <NumberInput title={'年龄'} value={userInfo.age} name={'age'} input={input}/>
                        <Select title={'性别'} value={userInfo.sex} name={'sex'} input={input}/>
                        <Input title={'手机号'} value={userInfo.phone} name={'phone'} input={input}/>
                        <Input title={'邮箱'} value={userInfo.Email} name={'Email'} input={input}/>
                        <Input title={'所在地'} value={userInfo.location} name={'location'} input={input}/>
                    </div>
                    <label className='w-[100%] flex items-center mt-[20px] gap-[20px]' htmlFor="">
                        <span className='text-blue-400 w-[80px] text-center'>简历：</span><input onChange={getFile} className='flex-1' type="file"/>
                    </label>
                </form>
                <div className='flex-1'>
                    <Editor html={userInfo.doc} getHtml={(htmlStr: string) => input({value: htmlStr, name: 'doc'})}/>
                </div>
            </div>
        </>
    )
}

export default Resume;
