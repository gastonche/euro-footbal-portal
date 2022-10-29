import styled from "@emotion/styled";
import Match from "../../domains/Match";
import Text from "../atoms/Text";

const StyledRow = styled.div`
  display: grid;
  height: 50px;
  align-items: center;
  padding: 0 1rem;
  grid-template-columns: 4fr 1fr 1fr 2fr 1fr 3fr 1fr 1fr;
  border-bottom: 1px solid #b8c5de45;
`;

const StyledRowHeader = styled(StyledRow)`
  position: sticky;
  top: 0;
  background: var(--light);
`

const Column = styled(Text)``;

Column.defaultProps = {
  as: "div",
  size: "small",
  weight: "medium",
};

export const MatchRowHeader = () => (
  <StyledRowHeader>
    <Column weight="bold">Teams</Column>
    <Column weight="bold">Score</Column>
    <Column weight="bold">Penalties</Column>
    <Column weight="bold">Date</Column>
    <Column weight="bold">Country</Column>
    <Column weight="bold">Competition</Column>
    <Column weight="bold">Points</Column>
    <Column weight="bold">AET Scores</Column>
  </StyledRowHeader>
);

const MatchRow = ({ match }: { match: Match }) => {
  return (
    <StyledRow>
      <Column>
        {match.Home_Team} vs {match.Away_Team}
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

export default MatchRow;
