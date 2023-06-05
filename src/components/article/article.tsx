import { BsFillPersonFill } from "react-icons/bs";
import Link from 'next/link'
import {useState} from "react";
const ArticleList = (data: any) => {
    return(
        <Link href={'/resume?name='+data.name+'&desc='+data.desc}>
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
                        <span>简介：</span>
                        {data.desc}
                    </p>
                </div>
            </li>
        </Link>

    )
}

const Article = () => {

    const [articleList, setArticleList] = useState([
        {name: '赵飞鱼', desc: '一个前端工程师'},
        {name: '鸡鸽', desc: '一个富二代'},
        {name: '和尚', desc: '一个酒蒙子'},
        {name: '猪猪', desc: '一个官二代'},
        {name: '孙少', desc: '一个京二代'},
        {name: '飞鸿哥', desc: '一个大佬'},
        {name: '小张', desc: '一个海王'},
        {name: '火哥', desc: '一个拆二代'},
        {name: '俊杰', desc: '一个耙耳朵的'},
    ]);

    return(
        <div className='flex flex-col items-center justify-center py-[40px] px-[10px]'>
            <div className='lg:w-[1024px] w-full'>
                <ul className='list-none w-full h-auto flex flex-col gap-[20px]'>
                    {
                        articleList.map((item, i) => (<ArticleList {...item} key={i}/>))
                    }
                </ul>
            </div>
        </div>
    );
}

export default Article;
