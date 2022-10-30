import styled from "@emotion/styled";
import Match from "../../domains/Match";
import useTableControls from "../../hooks/useTableControls";
import Text from "../atoms/Text";

const StyledRow = styled.div`
  display: grid;
  height: 50px;
  align-items: center;
  padding: 0 1rem;
  grid-template-columns: 4fr 1fr 1fr 2fr 1fr 3fr 1fr 1fr;
  gap: 5px;
  border-bottom: 1px solid #b8c5de45;

  &.group {
    position: sticky;
    top: 50px;
    background: #ecedff;
  }

  &.group span {
    width: fit-content;
    background: var(--secondary);
    color: var(--light);
    padding: 0px 10px;
    border-radius: 3px;
    margin: 5px 0 -15px;
  }
`;

const StyledRowHeader = styled(StyledRow)`
  position: sticky;
  top: 0;
  background: var(--light);
  z-index: 8;

  & > div {
    cursor: pointer;
    display: flex;
    align-items: center;

    span {
      font-size: 12px;
      margin-left: 5px;
      transition: transform 0.3s linear;

      &.down {
        transform: rotateX(-180deg);
      }
    }
  }
`;

const Column = styled(Text)`
  min-width: 100px;
`;

Column.defaultProps = {
  as: "div",
  size: "small",
};
export type RowData = { type: "group"; data: string } | Match;

const HeadColumn = ({
  sortKey,
  children,
}: {
  sortKey: string;
  children: any;
}) => {
  const {
    sort: { key, dir },
    applySort,
  } = useTableControls([]);
  return (
    <Column weight="bold" onClick={() => applySort(sortKey)}>
      {children}
      {key === sortKey && (
        <span className={dir === 1 ? "material-icons" : "material-icons down"}>
          sort
        </span>
      )}
    </Column>
  );
};

export const MatchRowHeader = () => {
  return (
    <StyledRowHeader>
      <HeadColumn sortKey="teams">Teams</HeadColumn>
      <HeadColumn sortKey="score">Score</HeadColumn>
      <HeadColumn sortKey="penalties">Penalties</HeadColumn>
      <HeadColumn sortKey="date">Date</HeadColumn>
      <HeadColumn sortKey="country">Country</HeadColumn>
      <HeadColumn sortKey="competition">Competition</HeadColumn>
      <HeadColumn sortKey="points">Points</HeadColumn>
      <HeadColumn sortKey="aet">AET Scores</HeadColumn>
    </StyledRowHeader>
  );
};

const MatchRow = ({ match }: { match: Match }) => {
  return (
    <StyledRow>
      <Column>
        {match.Home_Team} <b>vs</b> {match.Away_Team}
      </Column>
      <Column>
        {match.Home_Score} - {match.Away_Score}
      </Column>
      <Column>
        {match.Home_Penalties} - {match.Away_Penalties}
      </Column>
      <Column>
        {match.Date} {match.Time}
      </Column>
      <Column>{match.Country}</Column>
      <Column>
        {match.season} {match.Competition}
      </Column>
      <Column>
        {match.Home_Points} : {match.Away_Points}
      </Column>
      <Column>
        {match.Home_Score_AET} - {match.Away_Score_AET}
      </Column>
    </StyledRow>
  );
};

export const MatchGroupRow = ({ group }: { group: string }) => {
  return (
    <StyledRow className="group">
      <Text as="span">{group}</Text>
    </StyledRow>
  );
};

export default MatchRow;
