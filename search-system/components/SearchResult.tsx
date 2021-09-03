import { Typography } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";

type Props = {
  text: string;
};

function SearchResult(props: Props) {
  const columns = [
    { field: "id", width: 90 },
    { field: "test1", width: 120 },
    { field: "test2", width: 120 },
    { field: "test3", width: 120 },
  ];

  const rows = [
    { id: 1, test1: "hoge", test2: "fuga", test3: "piyo" },
    { id: 2, test1: "hoge!", test2: "fuga!", test3: "piyo!" },
  ];

  return (
    <div style={{ height: 600, width: 600, margin: 8 }}>
      <DataGrid rows={rows} columns={columns} />
      <Typography>{props.text}</Typography>
    </div>
  );
}

export default SearchResult;
