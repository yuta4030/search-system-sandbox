import { TextField, Button } from "@material-ui/core";
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
  );
}
