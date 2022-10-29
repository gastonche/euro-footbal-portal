// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Match from '../../core/domains/Match';
import data from "../../data/Full_Kaggle_Dataset.json";
import queries from '../../data/queries';

const matches: Match[] = data as Match[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = (req.query.query as string) || 'select * from matches';
  const matchingQuery = queries[query];
  console.log(matchingQuery, query, req.body);

  if(!matchingQuery) {
    res.status(404).json([]);
    return;
  }

  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Transfer-Encoding': 'chunked'
  });
  
  res.write("[");
  matches.forEach((match) => {
    if(matchingQuery.filter(match)) {
      res.write(`${JSON.stringify(match)},`);
    }
  });

  res.write("null]")
  res.end();

  res.status(200);
}
