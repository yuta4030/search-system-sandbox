import type { NextPage } from "next";
import { Container, Box, TextField, Button } from "@material-ui/core";
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

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Search system sandbox</title>
        <meta name="description" content="Search system sandbox" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Container>
          <SearchForm/>
        </Container>
      </main>
    </div>
  );
};

export default Home;
