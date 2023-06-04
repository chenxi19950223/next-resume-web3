import { AiFillGithub } from 'react-icons/Ai';

const ArticleList = () => {
    return(
        <li className='w-full p-[30px] bg-white shadow shadow-[#ddd] hover:shadow-blue-200 rounded-xl flex gap-[30px] cursor-pointer'>
            <div className='min-w-[60px] h-[60px] rounded-full bg-gray-500 flex items-center justify-center'>
                <AiFillGithub className='text-[50px] text-white'/>
            </div>
            <div className='gap-2 text-2xl flex flex-col' style={{width: 'calc( 100% - 90px )'}}>
                <p className='text-blue-400'>
                    <span>姓名：</span>
                    张三
                </p>
                <p className='truncate flex-1'>
                    <span>简介：</span>
                    一个前端工程师abjsgjlsbkgbksdbgfbksdbfgkbskdfbgksbdkfbgljksdbfkjg可是大家放过v表示看生机勃发是看见对方阿克苏今年奉公守法快乐吧大概
                </p>
            </div>
        </li>
    )
}

const Article = () => {
    return(
        <div className='flex flex-col items-center justify-center py-[40px] px-[10px]'>
            <div className='lg:w-[1024px] w-full'>
                <ul className='list-none w-full h-auto flex flex-col gap-[20px]'>
                    {
                        [1,2,3,4,5,6,7,8,9,0].map((item, i) => (<ArticleList key={i}/>))
                    }
                </ul>
            </div>
        </div>
    );
}

export default Article;
