import styled from "@emotion/styled";
import { FormEvent, useState } from "react";
import Match from "../../domains/Match";
import useLoadingProcess from "../../hooks/useLoadingProcess";
import useStore, {
  addHistory,
  setQuery,
  setResults,
} from "../../hooks/useStore";
import useTableControls from "../../hooks/useTableControls";
import { download, fetchQueryResults } from "../../services/api";
import Button from "../atoms/Button";
import TextArea from "../atoms/Editor";
import Text from "../atoms/Text";
import LoadingWrapper from "../molecules/LoadingWrapper";
import MainViewActions from "./MainViewActions";
import VirtualScrollTable from "./VirtualScrollTable";

const StyledWrapper = styled.div`
  flex: 1;
  padding: 1rem;
  border-radius: 0.7rem;
  background-color: var(--light);
  z-index: 2;
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
  const loader = useLoadingProcess();
  const controls = useTableControls((result?.data as Match[]) || []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    loader.show();
    const queryResults = await fetchQueryResults(query);
    setResults(queryResults);
    addHistory(queryResults);
    setIsLoading(false);
    loader.hide();
  };

  const save = async (type: string) => {
    result?.query &&
      download(result.query, type, (result?.data as Match[]) || []);
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
      <StyledFlex as="div">
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
        <MainViewActions
          matches={(result?.data as Match[]) || []}
          disabled={!result || result?.data.length === 0}
          onDownload={save}
        />
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
            <VirtualScrollTable matches={controls.groupedMatches} />
          </LoadingWrapper>
        </StyledMain>
      )}
    </StyledWrapper>
  );
};

export default MainView;
