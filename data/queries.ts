import QueryTemplate from "../core/domains/QueryTemplate";

export const queryTemplates: QueryTemplate[] = [
  {
    query: "select * from matches",
    label: "Test Query",
    filter: (data: any) => !!data,
  },
  {
    label: "Round 1 Matches",
    query: "select * matches where round='ROUND 1'",
    filter: ({ Round }) => Round === "ROUND 1",
  },
];

const queryTemplatesMap: { [k: string]: QueryTemplate } = queryTemplates.reduce(
  (acc, queryTemplate) => {
    acc[queryTemplate.query] = queryTemplate;
    return acc;
  },
  {} as { [k: string]: QueryTemplate }
);

export default queryTemplatesMap;
