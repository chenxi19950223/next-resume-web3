import Head from 'next/head';
import {Layout, Header, Welcome, Article, Footer} from "@/components/index";
import {useContext} from "react";
import {TransactionContext} from "@/Context/TransactionContext";

function Home() {
    const {currentAccount} = useContext(TransactionContext) as any;

    return (
        <>
            <Head>
                <title>next web3.0 resume</title>
            </Head>
            <Layout>
                <Header />
                <Welcome />
                {currentAccount !== '' ? (
                    <Article />
                ) : (
                    <div className='text-center text-[30px] py-[150px]'>请点链接</div>
                )}
                <Footer />
            </Layout>
        </>

    )
}


export default Home;
