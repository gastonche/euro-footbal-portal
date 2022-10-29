import styled from "@emotion/styled";
import { FormEvent, useState } from "react";
import Match from "../../domains/Match";
import useStore, {
  addHistory,
  setQuery,
  setResults,
} from "../../hooks/useStore";
import { fetchQueryResults } from "../../services/api";
import Button from "../atoms/Button";
import TextArea from "../atoms/Editor";
import Text from "../atoms/Text";
import LoadingWrapper from "../molecules/LoadingWrapper";
import VirtualScrollTable from "./VirtualScrollTable";

const StyledWrapper = styled.div`
  flex: 1;
  padding: 1rem;
  border-radius: 0.7rem;
  background-color: var(--light);
`;

const StyledHeader = styled.header`
  margin-bottom: 10px;
  width: 100%;
`;

const StyledFlex = styled.form`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 10px;
`;

const StyledMain = styled.div`
  height: calc(100% - 170px);
`;

const StyledEmptyResults = styled(StyledMain)`
  display: flex;
  align-items: center;
  justify-content: center;

  & > p {
    max-width: 500px;
    text-align: center;
  }
`;

const ShowingFor = styled(Text)`
  padding: 3px 5px;
  background-color: #ffa4a457;
  margin-left: 1rem;
  border-radius: 3px;
`;

const MainView = () => {
  const { query, result } = useStore();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    const queryResults = await fetchQueryResults(query);
    setResults(queryResults);
    addHistory(queryResults);
    setIsLoading(false);
  };

  return (
    <StyledWrapper>
      <StyledHeader>
        <Text size="medium" as="h1" weight="bold">
          Query our Match Dataset
        </Text>
        <StyledFlex onSubmit={onSubmit}>
          <TextArea
            required={true}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button
            color="accent"
            size="regular"
            disabled={isLoading || result?.query === query}
          >
            <span className="material-icons">send</span>
            Run Query
          </Button>
        </StyledFlex>
      </StyledHeader>
      <StyledFlex>
        <div>
          <Text size="medium" as="h1" weight="bold">
            Query results
          </Text>
          {result?.query && (
            <Text>
              Showing query results for
              <ShowingFor as="span" size="small" color="highlight">
                {result?.query}
              </ShowingFor>
            </Text>
          )}
        </div>
        <div>filters</div>
      </StyledFlex>
      {!result?.query && (
        <StyledEmptyResults>
          <Text size="medium">Run a query to get results from our dataset</Text>
        </StyledEmptyResults>
      )}
      {result?.query && result.data.length === 0 && (
        <StyledEmptyResults>
          <Text size="medium">
            No results were returned for this query Please verify your query and
            try again
          </Text>
        </StyledEmptyResults>
      )}
      {((result?.query && result?.data.length) || isLoading) && (
        <StyledMain>
          <LoadingWrapper isLoading={isLoading}>
            <VirtualScrollTable matches={(result?.data as Match[]) || []}  />
          </LoadingWrapper>
        </StyledMain>
      )}
    </StyledWrapper>
  );
};

export default MainView;
