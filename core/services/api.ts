import QueryResult from "../domains/QueryResult";

export async function fetchQueryResults(query: string): Promise<QueryResult> {
  const timestamp = Date.now();
  const data = await fetch(`/api?query=${query}`).then(res => res.json()).catch(() => []);
  return {
    timestamp,
    query,
    data
  }
}