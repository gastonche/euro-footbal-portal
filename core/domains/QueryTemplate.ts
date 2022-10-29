import Match from "./Match";

interface QueryTemplate {
  query: string;
  label: string;
  filter: (data: Match) => boolean;
}

export default QueryTemplate;