import {createContext, useContext, useEffect, useState} from "react";

import {ethers} from "ethers";
import {ConstantAbi, ConstantAddress} from "@/utils/Constant";
import {Resume} from "@/types/base";

// @ts-ignore
export const TransactionContext = createContext();

let ethereum;
// 获取以太坊合约
function getEthereumConstant() {
    if (window) {
        const {ethereum} = window as any;

    }

    const provider = new ethers.providers.Web3Provider((window as any).ethereum);
    const signer = provider.getSigner();
    const transaction = new ethers.Contract(ConstantAddress, ConstantAbi, signer);
    console.log(transaction)
    console.log({
        provider,
        signer,
        transaction
    })
    return transaction;
}

// 检查是否存在小狐狸钱包
function doYouHaveWallet(): boolean {
    if (!(window as any).ethereum) {
        console.log('请安装metamask')
        return false;
    }
    return true
}

export function ThemeProvider({children}: { children: any }) {
    // const {ethereum} = window as any;
    const [Loading, setLoading] = useState(false);
    const [currentAccount, setCurrentAccount] = useState<string | null>('');
    const [formData, serFormData] = useState({
        addressTo: '',
        amount: '',
        keyword: '',
        message: ''
    })

    // 检查钱包是否连接 以及是否有交易 以及获取所有交易
    const checkIfWalletIsConnected = async () => {
        try {
            if (!doYouHaveWallet()) return;
            // 检查缓存中是否链接钱包
            if (localStorage.getItem('currentAccount')) {
                setCurrentAccount(localStorage.getItem('currentAccount'));
            } else {
                const accounts = await (window as any).ethereum.request({method: 'eth_accounts'});
                if (accounts.length) {
                    setCurrentAccount(accounts[0]);
                    localStorage.setItem('currentAccount', accounts[0]);
                } else {
                    console.log('no account found');
                }
            }
        } catch (e) {
            console.log(e);
            throw new Error('no ethereum object');
        }

    };


    // 连接钱包 以及设置当前钱包地址
    const connectWallet = async () => { // 连接钱包
        try {
            if (!doYouHaveWallet()) return;
            const accounts = await (window as any).ethereum.request({method: 'eth_requestAccounts'});
            setCurrentAccount(accounts[0]);
            localStorage.setItem('currentAccount', accounts[0]);
        } catch (e) {
            console.log(e);
            // throw new Error('no ethereum object');
        }
    };

    // 获取以太坊合约
    function getEthereumConstant() {
        if (window) {
            const {ethereum} = window as any;

        }
        const provider = new ethers.providers.Web3Provider((window as any).ethereum);
        const signer = provider.getSigner();
        const transaction = new ethers.Contract(ConstantAddress, ConstantAbi, signer);
        console.log({
            provider,
            signer,
            transaction
        })
        return transaction;
    }

    // 获取所有用户
    const getUser = async () => {
        try {
            const transaction = getEthereumConstant();
            const userList = await transaction.getUserList();
            return userList;
        } catch (e) {
            console.log(e);
        }
    }


    // 上传简历信息
    const setData = async (data: Resume) => {
        try {
            if (!doYouHaveWallet()) return;
            const {ethereum} = window as any;
            const transaction = getEthereumConstant();
            const transactionHash = await transaction.setResumeInfo(data.name, Number(data.age), data.sex, data.phone, data.Email, data.location, data.file, data.doc);
            await transactionHash.wait()
            return true
            // const parsedAmount = ethers.utils.parseEther('0.001');
            // await ethereum.request({
            //     method: 'eth_sendTransaction',
            //     params: [{
            //         from: currentAccount,
            //         to: '0x369007Efd2cD2b482D316A19B4aeed37D7c6aB26',
            //         gas: '0x5208',
            //         value: parsedAmount._hex,
            //     }]
            // });
            // const transactionHash = await transaction.addToBlockchain(addressTo, parsedAmount, message, keyword);
            // setLoading(true);
            // console.log(`loading ${transactionHash.hash}`);
            // await transactionHash.wait();
            // setLoading(false);
            // console.log(`success ${transactionHash.hash}`);
            // const transactionCount = await transaction.getAllTransactionCount();
            // setTransactionCount(transactionCount.toNumber());
            // getAllTransactions();
        } catch (e) {
            console.log(e);
            // throw new Error('no ethereum object');
        }
    }

    // 获取用户信息
    const getActiveUser = async (address: string = '') => {
        try {
            if (!doYouHaveWallet()) return;
            const transaction = getEthereumConstant();
            const info = await transaction.getActiveUser(address);
            const obj = {
                name: info.name,
                age: info.age,
                sex: info.sex,
                location: info.location,
                phone: info.phone,
                Email: info.Email,
                file: info.file,
                doc: info.doc,
                sender: info.sender
            }
            return obj;
        } catch (e) {
            console.log(e);
            // throw new Error('no ethereum object');
        }
    }

    // // 交易 以及设置交易数量 以及获取所有交易
    // const sendTransaction = async () => {
    //     try {
    //         console.log(currentAccount)
    //         const {ethereum} = window as any;
    //         if (!doYouHaveWallet()) return;
    //         const { addressTo, amount, keyword, message } = formData;
    //         console.log(addressTo);
    //         const transaction = getEthereumConstant();
    //         const parsedAmount = ethers.utils.parseEther(amount);
    //         console.log(parsedAmount);
    //         await ethereum.request({
    //             method: 'eth_sendTransaction',
    //             params: [{
    //                 from: currentAccount,
    //                 to: addressTo,
    //                 gas: '0x5208',
    //                 value: parsedAmount._hex,
    //             }]
    //         });
    //         const transactionHash = await transaction.addToBlockchain(addressTo, parsedAmount, message, keyword);
    //         setLoading(true);
    //         console.log(`loading ${transactionHash.hash}`);
    //         await transactionHash.wait();
    //         setLoading(false);
    //         console.log(`success ${transactionHash.hash}`);
    //         const transactionCount = await transaction.getAllTransactionCount();
    //         setTransactionCount(transactionCount.toNumber());
    //     } catch (e) {
    //         console.log(e);
    //         throw new Error('no ethereum object');
    //     }
    // }

    useEffect(() => {
        ethereum = (window as any).ethereum;
        checkIfWalletIsConnected();
    }, [])

    return (
        <TransactionContext.Provider value={{
            connectWallet,
            currentAccount,
            formData,
            setFormData: serFormData,
            Loading,
            getUser,
            setData,
            getActiveUser
        }}>{children}</TransactionContext.Provider>
    );
}

export function useThemeContext() {
    return useContext(TransactionContext);
}
