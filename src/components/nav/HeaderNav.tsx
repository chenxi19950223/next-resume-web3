import {AiOutlineUser, AiOutlineMenu} from "react-icons/Ai";
import {useState} from "react";

const MenuItem = ({title}: {title: string}) => {
    return (
        <li className='hover:text-[#fff] hover:bg-cyan-400 text-[20px] cursor-pointer h-[60px] flex items-center px-[20px]'>{title}</li>
    )
}
function HeaderNav() {

    const [menuOpen, setMenuOpen] = useState(false)

    return(
        <div className='w-full h-[90px] rounded-b-lg shadow-md shadow-[#ddd] flex justify-center'>
            <nav className='h-full container px-[20px] flex justify-between items-center'>
                {/* 左侧logo */}
                <div className='w-[60px]'>
                    <svg viewBox="0 0 60 31" className="text-slate-900 dark:text-white w-auto h-[40px]">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M25.517 0C18.712 0 14.46 3.382 12.758 10.146c2.552-3.382 5.529-4.65 8.931-3.805 1.941.482 3.329 1.882 4.864 3.432 2.502 2.524 5.398 5.445 11.722 5.445 6.804 0 11.057-3.382 12.758-10.145-2.551 3.382-5.528 4.65-8.93 3.804-1.942-.482-3.33-1.882-4.865-3.431C34.736 2.92 31.841 0 25.517 0zM12.758 15.218C5.954 15.218 1.701 18.6 0 25.364c2.552-3.382 5.529-4.65 8.93-3.805 1.942.482 3.33 1.882 4.865 3.432 2.502 2.524 5.397 5.445 11.722 5.445 6.804 0 11.057-3.381 12.758-10.145-2.552 3.382-5.529 4.65-8.931 3.805-1.941-.483-3.329-1.883-4.864-3.432-2.502-2.524-5.398-5.446-11.722-5.446z"
                              fill="#38bdf8"></path>
                    </svg>
                </div>
                {/* 导航 */}
                <div className='flex-1 ml-[200px] md:block hidden'>
                    <ul className='list-none flex w-[auto] text-[20px] gap-[30px]'>
                        <li className='hover:text-cyan-400 cursor-pointer'>首页</li>
                        <li className='hover:text-cyan-400 cursor-pointer'>简历列表</li>
                        <li className='hover:text-cyan-400 cursor-pointer'>经历</li>
                    </ul>
                </div>
                {/* 用户图标 */}
                <div className='hidden md:block'>
                    <button className='w-[180px] h-[50px] bg-cyan-400 rounded-full text-white text-[20px]'>Connect Wallet</button>
                </div>

                <div className='md:hidden block'>
                    <AiOutlineMenu className='text-[30px] text-[#000] cursor-pointer' onClick={() => {
                        setMenuOpen(!menuOpen);
                    }}/>

                </div>

                <div className='fixed md:hidden block top-[90px] right-0 h-screen bg-white shadow-md shadow-[#ddd] z-[2]' style={{transition: 'all .5s', width: menuOpen ? '300px' : '0'}}>
                    <ul className='list-none w-[auto] text-[20px] gap-[30px]'>
                        <li className='h-[60px] shadow-md shadow-[#ddd] flex items-center pl-[20px] cursor-pointer'>
                            Connect Wallet
                        </li>
                        {
                            ['首页', '简历列表', '经历'].map((item, i) => {
                                return <MenuItem title={item} key={i}/>
                            })
                        }
                    </ul>
                </div>

            </nav>
        </div>
    )
}

export default HeaderNav;
