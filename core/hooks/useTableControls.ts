import { useMemo } from "react";
import { proxy, useSnapshot } from "valtio";
import { RowData } from "../components/organisms/MatchRow";
import Match from "../domains/Match";
import orderBy from "lodash.orderby";

const state = proxy<{
  groupBy?: keyof Match;
  filterBy: string[];
  sort: { key: string; dir: number };
}>({
  groupBy: undefined,
  filterBy: [],
  sort: {
    key: "teams",
    dir: 1,
  },
});

interface ControlGroup {
  label: string;
  value: keyof Match;
}

const groups: ControlGroup[] = [
  {
    label: "None",
    value: "" as keyof Match,
  },
  {
    label: "Date",
    value: "Date",
  },
  {
    label: "Home Team",
    value: "Home_Team",
  },
  {
    label: "Away Team",
    value: "Away_Team",
  },
  {
    label: "Season",
    value: "season",
  },
  {
    label: "Competition",
    value: "Competition",
  },
  {
    label: "Country",
    value: "Country",
  },
];

const sortOptions: { [k: string]: (match: Match) => string } = {
  teams: (match: Match) => `${match.Home_Team}-${match.Away_Team}`,
  date: (match: Match) => `${match.Date}-${match.Time}`,
  penalties: (match: Match) =>
    `${match.Home_Penalties}-${match.Away_Penalties}`,
  score: (match: Match) => `${match.Home_Score}-${match.Away_Score}`,
  country: (match: Match) => match.Country,
  points: (match: Match) => `${match.Home_Points}-${match.Away_Points}`,
  competition: (match: Match) => `${match.season}-${match.Competition}`,
  aet: (match: Match) => `${match.Home_Score_AET}-${match.Away_Score_AET}`,
};

const useTableControls = (matches: Match[]) => {
  const { groupBy, filterBy, sort } = useSnapshot(state);
  const group = useMemo(
    () => groups.find(({ value }) => value === groupBy),
    [groupBy]
  );

  matches = orderBy(
    matches,
    [sortOptions[sort.key]],
    [sort.dir == 1 ? "asc" : "desc"]
  );

  const grouped = useMemo(() => {
    if (!groupBy) {
      return {0: matches};
    }

    return matches.reduce((acc: { [k: string]: Match[] }, match: Match) => {
      const key = (groupBy && match[groupBy]) || "";
      if (!acc[key]) {
        acc[key] = [];
      }

      if (!filterBy.length || filterBy.includes(`${key}`)) {
        acc[key].push(match);
      }

      return acc;
    }, {});
  }, [matches, groupBy, filterBy]);

  const groupedMatches: RowData[] = useMemo(
    () =>
      !groupBy
        ? grouped[0]
        : Object.keys(grouped).reduce((acc, key) => {
            if (grouped[key].length) {
              const data: RowData[] = [
                { type: "group", data: key },
                ...grouped[key],
              ];
              acc = acc.concat(data);
            }
            return acc;
          }, [] as RowData[]),
    [grouped, groupBy]
  );

  const filters = useMemo(() => Object.keys(grouped), [grouped]);

  function applySort(key: string) {
    if (sort.key == key) {
      state.sort.dir = -sort.dir;
    } else {
      state.sort = {
        key,
        dir: 1,
      };
    }
  }

  return {
    group,
    groups,
    groupedMatches,
    filters,
    filterBy,
    showFilters: !!groupBy,
    sort,
    applySort,
    setGroupBy: (value: string) => {
      state.groupBy = value as keyof Match;
      state.filterBy = [];
    },
    setFilterBy: (value: string[]) => (state.filterBy = value),
  };
};

export default useTableControls;
