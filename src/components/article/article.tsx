import { BsFillPersonFill } from "react-icons/bs";
import Link from 'next/link'
import {useContext, useEffect, useState} from "react";
import { Spin } from 'antd';

import {TransactionContext} from "@/Context/TransactionContext";
import {Resume} from "@/types/base";
const ArticleList = (data: any) => {
    return(
        <Link href={'/resume?address='+data.sender}>
            <li className='w-full p-[30px] bg-white shadow shadow-[#ddd] hover:shadow-blue-200 rounded-xl flex gap-[30px] cursor-pointer'>
                <div className='min-w-[60px] h-[60px] rounded-full bg-gray-500 flex items-center justify-center'>
                    <BsFillPersonFill className='text-[50px] text-white'/>
                </div>
                <div className='gap-2 text-2xl flex flex-col' style={{width: 'calc( 100% - 90px )'}}>
                    <p className='text-blue-400'>
                        <span>姓名：</span>
                        {data.name}
                    </p>
                    <p className='truncate flex-1'>
                        <span>地址：</span>
                        {data.location}
                    </p>
                </div>
            </li>
        </Link>

    )
}

const Article = () => {

    const {getUser, getActiveUser} = useContext(TransactionContext) as any;

    const [user, setUser] = useState<Resume[]>([]);

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        getUser().then((res: string[]) => {
            console.log(res);
            if (res.length === 0) {
                return;
            }
            const list: Promise<any>[] = [];
            res.forEach((item: any) => {
                list.push(getActiveUser(item));
            });
            Promise.all(list).then((res: any) => {
                setUser(res);
                setLoading(false);
            });
        })
    }, [])

    return(
        <Spin spinning={loading}>
            <div className='flex flex-col items-center justify-center py-[40px] px-[10px]'>
                <div className='lg:w-[1024px] w-full'>
                    { user.length > 0 ?
                        (<ul className='list-none w-full h-auto flex flex-col gap-[20px]'>
                            {
                                user.map((item, i) => (<ArticleList {...item} key={i}/>))
                            }
                        </ul>) :
                        (
                            <div className='text-center py-[150px] text-[30px]'>暂无数据</div>
                        )
                    }
                </div>
            </div>
        </Spin>

    );
}

export default Article;
