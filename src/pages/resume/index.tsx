import dynamic from 'next/dynamic'
import {ChangeEventHandler, FormEventHandler, useContext, useEffect, useState} from "react";
import {useRouter} from "next/router";
import { Spin, message } from 'antd';
import Link from 'next/link'
import {TransactionContext} from "@/Context/TransactionContext";
import {Resume} from '@/types/base';
import pinataSDK from '@pinata/sdk';
import { Input, InputNumber, Select } from 'antd';
const Editor = dynamic(() => import('@/components/editor/editor'), {
    ssr: false
})

const CInput = ({title, name, input, value, disabled }: {title: string, input: any, name: string, value: any, disabled: boolean}) => {
    return (
        <label className='flex gap-[20px] items-center justify-start' htmlFor="">
            <span className='inline-block text-blue-400 w-[80px]'>{title}：</span>
            <Input value={value} readOnly={disabled} onInput={(e: any) => input({value: e.target?.value, name})} className='rounded-[6px] border-blue-400 flex-1' type="text"/>
        </label>
    )
}

const NumberInput = ({title, name, input, value, disabled }: {title: string, input: any, name: string, value: any, disabled: boolean}) => {
    return (
        <label className='flex gap-[20px] items-center justify-start' htmlFor="">
            <span className='inline-block text-blue-400 w-[80px]'>{title}：</span>
            <InputNumber min={0} max={9999} value={value} readOnly={disabled} controls={false} onInput={(e: any) => input({value: e, name})} className='rounded-[6px] border-blue-400 flex-1' />
        </label>
    )
}

const CSelect = ({title, name, input, value, disabled }: {title: string, input: any, name: string, value: any, disabled: boolean}) => {
    return (
        <label className='flex gap-[20px] items-center justify-start' htmlFor="">
            <span className='inline-block text-blue-400 w-[80px]'>{title}：</span>
            {/*<input onInput={(e: any) => input({value: e.target?.value, name})} className='rounded-[6px] border-blue-400 flex-1' type="number"/>*/}
            <Select value={value} disabled={disabled} options={[{value: 0, label: '男'}, {value: 1, label: '女'}]} onChange={e => input({value: e, name})} className='rounded-[6px] border-blue-400 flex-1'>
            </Select>
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
                console.log(res);
                if (Number(res.sender) === 0) res.sender = route.query.address as string;
                setUserInfo(s => ({
                    ...s,
                    ...res
                }));
                setLoading(false);
            })
        }
    }, [route.query.address])

    const saveHtml = () => {
        setLoading(true);
        setData(userInfo).then((res: boolean) => {
            if (res) {
                setLoading(false);
            } else {
                setLoading(false);
                message.warning('保存失败');
            }
        })
        console.log(userInfo);

    }


    const input = (e: any) => {
        setUserInfo({
            ...userInfo,
            [e.name]: e.value as string,
        });
    }

    const getFile = async (e: any) => {
        setLoading(true);
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
    }

    const isAddress = (form: string, to: string) => {
        if (form === undefined || form === '') return false;
        if (to === undefined || to === '') return false;
        return form.toLocaleUpperCase() !== to.toLocaleUpperCase();
    }



    return (
        <Spin spinning={loading} wrapperClassName='h-full'>
            <div className='h-full flex flex-col'>
                <div className='flex justify-between p-3'>
                    <Input type="text"
                           disabled={isAddress(userInfo.sender as string, currentAccount)}
                           value={userInfo.name} onInput={e => ({value: e, name})} className='w-[200px] border-none rounded-[4px] cursor-pointer bg-zinc-500 text-white focus:outline-0'/>
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
                        <CSelect title={'性别'} disabled={isAddress(userInfo.sender as string, currentAccount)} value={userInfo.sex} name={'sex'} input={input}/>
                        <CInput title={'手机号'} disabled={isAddress(userInfo.sender as string, currentAccount)} value={userInfo.phone} name={'phone'} input={input}/>
                        <CInput title={'邮箱'} disabled={isAddress(userInfo.sender as string, currentAccount)} value={userInfo.Email} name={'Email'} input={input}/>
                        <CInput title={'所在地'} disabled={isAddress(userInfo.sender as string, currentAccount)} value={userInfo.location} name={'location'} input={input}/>
                    </div>
                    <label className='w-[100%] flex items-center mt-[20px] gap-[20px]' htmlFor="">
                        <span className='text-blue-400 w-[80px] text-center'>简历：</span>
                        {
                            userInfo.file ?
                                (
                                    <div className='flex bg-blue-100 px-[20px] w-full justify-between'>
                                        <a className='text-blue-400' target='_blank' href={'https://gateway.pinata.cloud/ipfs/' + userInfo.file.split('?')[1]}>{userInfo.file.split('?')[0]}</a>
                                        <span className='text-blue-400 cursor-pointer' onClick={() => input({value: undefined, name: 'file'})}>x</span>
                                    </div>
                                )
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
