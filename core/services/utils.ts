export function timestampToDateTimeString(timestamp: number): string {
  return new Intl.DateTimeFormat('en-GB', { dateStyle: 'long', timeStyle: 'short' }).format(new Date(timestamp));
}

export const excelExportColumns = [
  {
    header: "Home Team",
    width: 20,
    key: "Home_Team"
  },
  {
    header: "Away Team",
    width: 20,
    key: "Away_Team"
  },
  {
    header: "Home Score",
    width: 10,
    key: "Home_Score"
  },
  {
    header: "Away Score",
    width: 10,
    key: "Away_Score"
  },
  {
    header: "Home Penalties",
    width: 10,
    key: "Home_Penalties"
  },
  {
    header: "Away Penalties",
    width: 10,
    key: "Away_Penalties"
  },
  {
    header: "Date",
    width: 10,
    key: "Date"
  },
  {
    header: "Time",
    width: 10,
    key: "Time"
  },
  {
    header: "Home Points",
    width: 10,
    key: "Home_Points"
  },
  {
    header: "Away Points",
    width: 10,
    key: "Away_Points"
  },
  {
    header: "Country",
    width: 20,
    key: "Country"
  },
  {
    header: "Season",
    width: 10,
    key: "season"
  },
  {
    header: "Competition",
    width: 20,
    key: "Competition"
  },
  {
    header: "Home AET Score",
    width: 10,
    key: "Home_Score_AET"
  },
  {
    header: "Away AET Score",
    width: 10,
    key: "Away_Score_AET"
  },
];