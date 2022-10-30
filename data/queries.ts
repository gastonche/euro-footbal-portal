import QueryTemplate from "../core/domains/QueryTemplate";

export const queryTemplates: QueryTemplate[] = [
  // This won't run on the edge function
  // {
  //   query: "select * from matches",
  //   label: "Test Query",
  //   filter: (data: any) => !!data,
  // },
  {
    label: "German Matches",
    query: "select * from matches where Country='germany'",
    filter: ({Country}) => Country == 'germany'
  },
  {
    label: "Italian Matches",
    query: "select * from matches where Country='italy'",
    filter: ({Country}) => Country == 'italy'
  },
  {
    label: "Spanish Matches",
    query: "select * from matches where Country='spain'",
    filter: ({Country}) => Country == 'spain'
  },
  {
    label: "English Matches",
    query: "select * from matches where Country='england'",
    filter: ({Country}) => Country == 'england'
  },
  {
    label: "French Matches",
    query: "select * from matches where Country='france'",
    filter: ({Country}) => Country == 'france'
  },
  {
    label: "Round 1 Matches",
    query: "select * matches where round='ROUND 1'",
    filter: ({ Round }) => Round === "ROUND 1",
  },
  {
    label: "AC Milan home games",
    query: "select * from matches where Home_Team='AC MILAN'",
    filter: ({Home_Team}) => Home_Team == 'AC MILAN'
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
