import dynamic from 'next/dynamic'
import {ChangeEventHandler, FormEventHandler, useContext, useEffect, useState} from "react";
import {useRouter} from "next/router";
import { Spin, message } from 'antd';
import Link from 'next/link'
import {TransactionContext} from "@/Context/TransactionContext";
import {Resume} from '@/types/base';
import pinataSDK from '@pinata/sdk';
const Editor = dynamic(() => import('@/components/editor/editor'), {
    ssr: false
})

const Input = ({title, name, input, value, disabled }: {title: string, input: any, name: string, value: any, disabled: boolean}) => {
    return (
        <label className='flex gap-[20px] items-center justify-start' htmlFor="">
            <span className='inline-block text-blue-400 w-[80px]'>{title}：</span>
            <input disabled={disabled} defaultValue={value} onInput={(e: any) => input({value: e.target?.value, name})} className='rounded-[6px] border-blue-400 flex-1' type="text"/>
        </label>
    )
}

const NumberInput = ({title, name, input, value, disabled }: {title: string, input: any, name: string, value: any, disabled: boolean}) => {
    return (
        <label className='flex gap-[20px] items-center justify-start' htmlFor="">
            <span className='inline-block text-blue-400 w-[80px]'>{title}：</span>
            <input defaultValue={value} disabled={disabled} onInput={(e: any) => input({value: e.target?.value, name})} className='rounded-[6px] border-blue-400 flex-1' type="number"/>
        </label>
    )
}

const Select = ({title, name, input, value, disabled }: {title: string, input: any, name: string, value: any, disabled: boolean}) => {
    return (
        <label className='flex gap-[20px] items-center justify-start' htmlFor="">
            <span className='inline-block text-blue-400 w-[80px]'>{title}：</span>
            {/*<input onInput={(e: any) => input({value: e.target?.value, name})} className='rounded-[6px] border-blue-400 flex-1' type="number"/>*/}
            <select defaultValue={value} disabled={disabled} name="" id="" className='rounded-[6px] border-blue-400 flex-1'>
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
    const [loading, setLoading] = useState<boolean>(true);
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
        if (route.query.address) {
            getActiveUser(route.query.address).then((res: Resume) => {
                setUserInfo(res);
                setLoading(false);
            })
        }
    }, [route.query.address])

    const saveHtml = () => {
        setLoading(true);
        setData(userInfo).then((res: boolean) => {
            if (res) {
                setLoading(false);
            }
        })

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
        setLoading(true);
        // const file = e.target.files[0];
        // if (file.length === 0) return;
        // if (file.type !== 'application/pdf') {
        //     message.warning('只支持pdf格式');
        //     return;
        // }
        // const fileName = file.name;
        // console.log(fileName)
        // const reader = new FileReader();
        // reader.readAsDataURL(file);
        // reader.onload = function (e: ProgressEvent<FileReader>) {
        //     setUserInfo({
        //         ...userInfo,
        //         file: fileName + '?' + e.target?.result as string,
        //     });
        // }
        const formData = new FormData();
        formData.append("file", e.target.files[0]);

        const resFile: any = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
            method: "post",
            body: formData,
            headers: {
                'pinata_api_key': `2dc9de284e2cc3e588bc`,
                'pinata_secret_api_key': `90d7778c1e9e3929bdd3547031110997a04f9f451e98e4b8989d0f051bddebfb`,
                // "Content-Type": "multipart/form-data"
            },
        }).then(res => res.json());
        setUserInfo({
            ...userInfo,
            file: `${e.target.files[0].name}?${resFile?.IpfsHash}`
        })
        setLoading(false);

        // const pinata = new pinataSDK({ pinataApiKey: '2dc9de284e2cc3e588bc', pinataSecretApiKey: '90d7778c1e9e3929bdd3547031110997a04f9f451e98e4b8989d0f051bddebfb' })
    }

    const isAddress = (form: string, to: string) => {
        if (form === undefined) return false;
        if (to === undefined) return false;
        return form.toLocaleUpperCase() !== to.toLocaleUpperCase();
    }



    return (
        <Spin spinning={loading}>
            <div className='h-full flex flex-col'>
                <div className='flex justify-between p-3'>
                    <input type="text"
                           disabled={isAddress(userInfo.sender as string, currentAccount)}
                           defaultValue={userInfo.name} onChange={handleChange} className='border-none rounded-[4px] cursor-pointer bg-zinc-500 text-white focus:outline-0'/>
                    <div className='flex gap-[20px]'>
                        {
                            !isAddress(userInfo.sender as string, currentAccount) ? (<button onClick={saveHtml} className='h-[30px] w-[80px] rounded-[6px] bg-blue-700 text-white'>保存</button>) : null
                        }
                        <Link href={'./'}>
                            <button className='h-[30px] w-[80px] rounded-[6px] bg-cyan-500 text-white'>取消</button>
                        </Link>
                    </div>
                </div>
                <form className='p-[20px]  flex-wrap border-t-8'>
                    <div className='user-info'>
                        <NumberInput title={'年龄'} disabled={isAddress(userInfo.sender as string, currentAccount)} value={userInfo.age} name={'age'} input={input}/>
                        <Select title={'性别'} disabled={isAddress(userInfo.sender as string, currentAccount)} value={userInfo.sex} name={'sex'} input={input}/>
                        <Input title={'手机号'} disabled={isAddress(userInfo.sender as string, currentAccount)} value={userInfo.phone} name={'phone'} input={input}/>
                        <Input title={'邮箱'} disabled={isAddress(userInfo.sender as string, currentAccount)} value={userInfo.Email} name={'Email'} input={input}/>
                        <Input title={'所在地'} disabled={isAddress(userInfo.sender as string, currentAccount)} value={userInfo.location} name={'location'} input={input}/>
                    </div>
                    <label className='w-[100%] flex items-center mt-[20px] gap-[20px]' htmlFor="">
                        <span className='text-blue-400 w-[80px] text-center'>简历：</span>
                        {
                            userInfo.file ? <div>
                                    <a className='text-blue-400' target='_blank' href={'https://gateway.pinata.cloud/ipfs/' + userInfo.file.split('?')[1]}>{userInfo.file.split('?')[0]}</a>
                            </div>
                                :
                                <input disabled={isAddress(userInfo.sender as string, currentAccount)} onChange={getFile} className='flex-1' type="file"/>

                        }


                    </label>
                </form>
                <div className='flex-1'>
                    {
                        !isAddress(userInfo.sender as string, currentAccount) ?
                            (<Editor html={userInfo.doc} disabled={isAddress(userInfo.sender as string, currentAccount)} getHtml={(htmlStr: string) => input({value: htmlStr, name: 'doc'})}/>):
                            (<div className='p-[20px] border-t-[1px]' dangerouslySetInnerHTML={{__html: userInfo.doc}}>
                            </div>)
                    }
                </div>
            </div>
        </Spin>
    )
}

export default Resume;
