import Match from "./Match";

interface QueryResult{
  query: string;
  data: Match[];
  timestamp: number;
}

export default  QueryResult;