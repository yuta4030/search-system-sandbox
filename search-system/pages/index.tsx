import type { NextPage } from "next";
import { TextField, Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid"

import { useFormik } from "formik";
import Head from "next/head";
import styles from "../styles/Home.module.css";


const SearchForm = () => {
  const formik = useFormik({
    initialValues: {
      word: "init"
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null));
    }
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          id="word"
          name="word"
          onChange={formik.handleChange}
          value={formik.values.word}
        />
        <Button variant="contained" type="submit" color="primary">
          Submit
        </Button>
      </form>
    </div>
  )
}

const columns = [
  {field: "id", width: 90},
  {field: "test1", width: 120},
  {field: "test2", width: 120},
  {field: "test3", width: 120},
]

const rows = [
  {id: 1, test1: "hoge", test2: "fuga", test3: "piyo"},
  {id: 2, test1: "hoge!", test2: "fuga!", test3: "piyo!"},
]

const SearchResult = () => {
  return (
    <div style={{height: "100%" , width: 520}}>
      <DataGrid
        rows={rows}
        columns={columns}
      />
    </div>
  )
}

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Search system sandbox</title>
        <meta name="description" content="Search system sandbox" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
          <SearchForm/>
          <SearchResult/>
      </main>
    </div>
  );
};

export default Home;
