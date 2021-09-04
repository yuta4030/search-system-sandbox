import { useState, useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";

import { TextField, Button, Grid } from "@material-ui/core";

import PublicFacilityCard from "./PublicFacilityCard";

interface ResultItem {
  code: string;
  name: string;
  address: string;
  geo: string;
}

function SearchForm() {
  const initRows: Array<ResultItem> = [];
  const [rows, setRows] = useState<Array<ResultItem>>(initRows);

  const formik = useFormik({
    initialValues: {
      word: "",
    },
    onSubmit: (values) => {
      requestPublicFaclity(5, 0, values.word);
    },
  });

  async function requestPublicFaclity(
    size: number,
    start: number,
    word: string
  ) {
    const params = {
      size: size,
      start: start,
      q: word,
    };

    await axios
      .get("http://localhost:3000/api/public_facility", {
        params: params,
      })
      .then((res) => {
        const items: Array<ResultItem> = [];
        for (const item of res.data.items) {
          const routeItem: ResultItem = {
            code: item.code,
            name: item.name,
            address: item.address,
            geo: item.geo.lon + "," + item.geo.lat,
          };
          items.push(routeItem);
        }
        setRows([...items]);
      });
  }

  useEffect(() => {
    requestPublicFaclity(5, 0, "");
  }, []);

  const publicFacilityCards = [];
  for (const [index, row] of rows.entries()) {
    publicFacilityCards.push(
      <PublicFacilityCard
        key={index}
        code={row.code}
        name={row.name}
        address={row.address}
        geo={row.geo}
      />
    );
  }

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
              検索
            </Button>
          </Grid>
        </Grid>
      </form>
      <div>{publicFacilityCards}</div>
    </div>
  );
}

export default SearchForm;
