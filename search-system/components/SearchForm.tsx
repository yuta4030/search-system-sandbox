import { useState, useEffect } from "react";
import axios from "axios";

import { TextField, Button, Grid, Typography } from "@material-ui/core";
import { useFormik } from "formik";

import SearchResult from "../components/SearchResult";

export default function SearchForm(props: Props) {
  const initText = props.text;
  const [text, setText] = useState(initText);

  const formik = useFormik({
    initialValues: {
      word: initText,
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null));
      setText(values.word);
    },
  });

  useEffect(() => {
    axios.get("http://localhost:3000/api/hello").then((res) => {
      setText(res.data.name);
    });
  }, []);

  return (
    <div style={{ margin: 8 }}>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item>
            <TextField
              id="word"
              name="word"
              onChange={formik.handleChange}
              value={formik.values.word}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" type="submit" color="primary">
              Submit
            </Button>
          </Grid>
          <Grid item>
            <Typography>{text}</Typography>
          </Grid>
        </Grid>
      </form>
      <SearchResult text={text} />
    </div>
  );
}
