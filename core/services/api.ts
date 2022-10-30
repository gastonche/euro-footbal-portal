import QueryResult from "../domains/QueryResult";

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

const extensions: { [k: string]: string } = {
  Excel: "xlsx",
  Json: "json",
  CSV: "csv",
};

export function download(query: string, type: string) {
  let url = `/api/download/${type.toLocaleLowerCase()}?query=${query}`;
  let a = document.createElement("a");
  a.href = url;
  a.download = `Export.${extensions[type]}`;
  document.body.appendChild(a);
  a.click();
  a.remove();
}
