import { TextField, Button, Grid } from "@material-ui/core";
import { useFormik } from "formik";

export default function SearchForm() {
  const formik = useFormik({
    initialValues: {
      word: "init",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null));
    },
  });
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
        </Grid>
      </form>
    </div>
  );
}
