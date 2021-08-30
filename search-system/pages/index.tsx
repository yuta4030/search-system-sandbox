import type { NextPage } from "next";

import Head from "next/head";
import styles from "../styles/Home.module.css";
import SearchForm from "../components/SearchForm";
import SearchResult from "../components/SearchResult";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Search system sandbox</title>
        <meta name="description" content="Search system sandbox" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <SearchForm />
        <SearchResult />
      </main>
    </div>
  );
};

export default Home;
