import Head from 'next/head';
import {Layout, Header} from "@/components/index";

function Home() {
    return (
        <>
            <Head>
                <title>next web3.0 resume</title>
            </Head>
            <Layout>
                <Header />
            </Layout>
        </>

    )
}


export default Home;
