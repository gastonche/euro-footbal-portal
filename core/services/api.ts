import Match from "../domains/Match";
import QueryResult from "../domains/QueryResult";
import { excelExportColumns } from "./utils";

export async function fetchQueryResults(query: string): Promise<QueryResult> {
  const timestamp = Date.now();
  const data = await fetch(`/api?query=${query}`)
    .then((res) => res.json())
    .catch(() => []);
  data.pop();
  return {
    timestamp,
    query,
    data,
  };
}

function saveFile(content: string, fileName: string, contentType: string) {
  const a = document.createElement("a");
  const file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}

function downloadJson(matches: Match[]) {
  saveFile(JSON.stringify(matches), "DataExport.json", "text/plain");
}

function downloadCsv(matches: Match[]) {
  const rows = [
    excelExportColumns.map(({ header }) => header),
    ...matches.map((match) =>
      excelExportColumns.map(({ key }) => match[key as keyof Match])
    ),
  ];

  saveFile(
    rows.map((e) => e.join(",")).join("\n"),
    "DataExport.csv",
    "data:text/csv;charset=utf-8,"
  );
}

function downloadExcel(query: string) {
  let url = `/api/download/excel?query=${query}`;
  let a = document.createElement("a");
  a.href = url;
  a.download = `DataExport.xlsx}`;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export function download(query: string, type: string, matches: Match[]) {
  console.log(type);
  if (type == "Excel") {
    return downloadExcel(query);
  } else if (type == "JSON") {
    return downloadJson(matches);
  } else if (type === "CSV") {
    return downloadCsv(matches);
  }
}
