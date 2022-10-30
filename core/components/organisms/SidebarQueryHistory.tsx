import styled from "@emotion/styled";
import QueryResult from "../../domains/QueryResult";
import useStore, {
  setHistory,
  setQuery,
  setResults,
} from "../../hooks/useStore";
import useTableControls from "../../hooks/useTableControls";
import { kFormatter, timestampToDateTimeString } from "../../services/utils";
import Text from "../atoms/Text";

const StyledQueryItem = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem;
  position: relative;
  margin-bottom: 0.75rem;
  cursor: pointer;

  & > * {
    position: relative;
    z-index: 1;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--light-05);
    opacity: ${({ active }) => (active ? 0.3 : 0)};
    border-radius: 0.5rem;
    transition: opacity 0.3s linear;
  }

  &:hover::after {
    opacity: 0.3;
  }
`;

const StyledCount = styled(Text)`
  text-align: right;

  span {
    padding: 1px 5px;
    background: var(--dark);
    border-radius: 21px;
    color: var(--light);
  }
`;

const StyledQuery = styled(Text)`
  background-color: #ffa4a457;
  padding: 3px 5px;
  border-radius: 3px;
  color: var(--highlight);
`;

const SidebarQueryHistory = () => {
  const { history, result } = useStore();
  const { setGroupBy } = useTableControls([]);

  const set = (query: QueryResult) => {
    setResults(query);
    setQuery(query.query);
    setGroupBy("");
  };

  return (
    <>
      {history.map((historyItem) => (
        <StyledQueryItem
          active={result?.query == historyItem.query}
          key={historyItem.query}
          onClick={() => set(historyItem as QueryResult)}
        >
          <Text size="small" weight="bold">
            {timestampToDateTimeString(historyItem.timestamp)}
          </Text>
          <StyledQuery size="small">{historyItem.query}</StyledQuery>
          <StyledCount size="small" color="dark-05">
            <span>{kFormatter(historyItem.data.length)}</span> results
          </StyledCount>
        </StyledQueryItem>
      ))}
    </>
  );
};

export default SidebarQueryHistory;
