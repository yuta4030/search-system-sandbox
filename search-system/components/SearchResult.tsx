import { DataGrid } from "@material-ui/data-grid";

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

export default function SearchResult() {
  return (
    <div style={{ height: "100%", width: 520 }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}
