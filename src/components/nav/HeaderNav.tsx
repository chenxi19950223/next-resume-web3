import {BsReverseListColumnsReverse} from "react-icons/bs";
import { SiTailwindcss } from "react-icons/si";
import {useContext, useEffect, useState} from "react";
import {TransactionContext} from "@/Context/TransactionContext";
import {shortenAddress} from '@/utils/shortenAddress'

const MenuItem = ({title}: {title: string}) => {
    return (
        <li className='hover:text-[#fff] hover:bg-cyan-400 text-[20px] cursor-pointer h-[60px] flex items-center px-[20px]'>{title}</li>
    )
}
function HeaderNav() {

    const [menuOpen, setMenuOpen] = useState(false);
    const { connectWallet, currentAccount } = useContext(TransactionContext) as any;

    useEffect(() => {
        console.log(currentAccount);
    }, [currentAccount])


    return(
        <div className='h-[90px]'>
            <div className='w-full h-[90px] fixed shadow-md shadow-[#ddd] flex justify-center bg-gradient'>
                <nav className='h-full container px-[20px] flex justify-between items-center'>
                    {/* 左侧logo */}
                    <div className='w-[60px]'>
                        <SiTailwindcss className='text-slate-900 text-[#38bdf8] w-auto h-[40px] text-cyan-400'/>
                    </div>
                    {/* 导航 */}
                    <div className='flex-1 ml-[200px] md:block hidden'>
                        <ul className='list-none flex w-[auto] text-[20px] gap-[30px]'>
                            <li className='hover:text-cyan-400 cursor-pointer'>首页</li>
                            <li className='hover:text-cyan-400 cursor-pointer'>简历列表</li>
                            <li className='hover:text-cyan-400 cursor-pointer'>经历</li>
                        </ul>
                    </div>
                    <div className='hidden md:block'>
                        {
                            (currentAccount !== '') ? (
                                <div>
                                    <button className='text-gray-400 cursor-pointer flex align-top'><span className='align-top leading-[14px]'>{shortenAddress(currentAccount)}</span></button>
                                </div>
                                ) : (
                                <button className='w-[180px] h-[50px] bg-cyan-400 rounded-full text-white text-[20px]' onClick={connectWallet}>Connect Wallet</button>

                            )
                        }
                    </div>

                    <div className='md:hidden block'>
                        <BsReverseListColumnsReverse className='text-[30px] text-[#000] cursor-pointer' onClick={() => {
                            setMenuOpen(!menuOpen);
                        }}/>

                    </div>

                    <div className='fixed md:hidden block top-[90px] right-0 h-screen bg-white shadow-md shadow-[#ddd] z-[2]' style={{transition: 'all .5s', width: menuOpen ? '300px' : '0'}}>
                        <ul className='list-none w-[auto] text-[20px] gap-[30px]'>
                            {
                                (currentAccount === '') ?
                                    (<li className='h-[60px] shadow-md shadow-[#ddd] flex items-center pl-[20px] cursor-pointer'>
                                        Connect Wallet
                                    </li>) : (
                                        <li className='h-[60px] shadow-md shadow-[#ddd] flex items-center pl-[20px] cursor-pointer hover:shadow-cyan-200'>
                                            {shortenAddress(currentAccount)}
                                        </li>
                                    )
                            }

                            {
                                ['首页', '简历列表', '经历'].map((item, i) => {
                                    return <MenuItem title={item} key={i}/>
                                })
                            }
                        </ul>
                    </div>

                </nav>
            </div>
        </div>
    )
}

export default HeaderNav;
