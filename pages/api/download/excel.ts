// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import exceljs from "exceljs";
import Match from "../../../core/domains/Match";
import data from "../../../data/Full_Kaggle_Dataset.json";
import queries from "../../../data/queries";
import { excelExportColumns } from "../../../core/services/utils";

const matches: Match[] = data as Match[];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const query = (req.query.query as string) || "select * from matches";
  const matchingQuery = queries[query];

  if (!matchingQuery) {
    res.status(404).json([]);
    return;
  }

  const workbook = new exceljs.Workbook();
  const worksheet = workbook.addWorksheet("Query Results");

  worksheet.columns = excelExportColumns;

  var fileName = "DataExport.xlsx";
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader("Content-Disposition", "attachment; filename=" + fileName);

  matches.forEach((match) => {
    if (matchingQuery.filter(match)) {
      worksheet.addRow(match);
    }
  });

  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
  });

  workbook.xlsx.write(res).then(() => res.end());
}
