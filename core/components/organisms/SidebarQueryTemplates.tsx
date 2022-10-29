import styled from "@emotion/styled";
import { queryTemplates } from "../../../data/queries";
import QueryTemplate from "../../domains/QueryTemplate";
import useStore, { setQuery, setResults } from "../../hooks/useStore";
import Text from "../atoms/Text";

const StyledQueryTemplateItem = styled.div<{ active: boolean }>`
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

const StyledQuery = styled(Text)`
  background-color: #ffa4a457;
  padding: 3px 5px;
  border-radius: 3px;
  color: var(--highlight);
`;

const SidebarQueryTemplates = () => {
  const { query } = useStore();

  function selectTemplate(template: QueryTemplate) {
    setQuery(template.query);
    setResults(undefined);
  }
  return (
    <>
      {queryTemplates.map((queryTemplate) => (
        <StyledQueryTemplateItem
          active={query === queryTemplate.query}
          key={queryTemplate.query}
          onClick={() => selectTemplate(queryTemplate)}
        >
          <Text size="small" weight="bold">
            {queryTemplate.label}
          </Text>
          <StyledQuery size="small">{queryTemplate.query}</StyledQuery>
        </StyledQueryTemplateItem>
      ))}
    </>
  );
};

export default SidebarQueryTemplates;
