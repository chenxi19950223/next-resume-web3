import Head from 'next/head';
import {Layout, Header, Welcome, Article, Footer} from "@/components/index";

function Home() {
    return (
        <>
            <Head>
                <title>next web3.0 resume</title>
            </Head>
            <Layout>
                <Header />
                <Welcome />
                <Article />
                <Footer />
            </Layout>
        </>

    )
}


export default Home;
