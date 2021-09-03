import { useEffect, useState } from "react";
import axios from "axios";

import { DataGrid } from "@material-ui/data-grid";

type Props = {
  text: string;
};

interface ResultItem {
  id: string;
  name: string;
  address: string;
  geo: string;
}

function SearchResult(props: Props) {
  const [rows, setRows] = useState<Array<ResultItem>>([]);

  const columns = [
    { field: "id", width: 100 },
    { field: "name", width: 150 },
    { field: "address", width: 150 },
    { field: "geo", width: 100 },
  ];

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/public_facility?size=500")
      .then((res) => {
        const items: Array<ResultItem> = [];
        for (const item of res.data.items) {
          const routeItem: ResultItem = {
            id: item.code,
            name: item.name,
            address: item.address,
            geo: item.geo.lon + "," + item.geo.lat,
          };
          items.push(routeItem);
        }
        setRows([...items]);
      });
  }, []);

  return (
    <div style={{ height: 500, width: 500, margin: 8 }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}

export default SearchResult;
