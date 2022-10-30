import styled from "@emotion/styled";
import Match from "../../domains/Match";
import useTableControls from "../../hooks/useTableControls";
import {
  DropdownActionButton,
  SimpleDropdownSelect,
} from "../molecules/Dropdowns";
import Field from "../molecules/Field";

const MainViewWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 1rem;
`;

const MainViewActions = ({
  matches,
  disabled,
  onDownload,
}: {
  matches: Match[];
  disabled: boolean;
  onDownload: (k: string) => void;
}) => {
  const controls = useTableControls(matches);

  return (
    <MainViewWrapper>
      <Field label="Group Results By:">
        <SimpleDropdownSelect
          options={controls.groups}
          value={controls.group?.value || ""}
          onChange={controls.setGroupBy as any}
        />
      </Field>
      {controls.showFilters && (
        <Field label="Filter Grouped Results By:">
          <SimpleDropdownSelect
            isMultiple
            options={controls.filters}
            value={controls.filterBy as string[]}
            onChange={controls.setFilterBy as any}
          />
        </Field>
      )}
      <DropdownActionButton
        label="Download results"
        color="secondary"
        options={["Excel", "CSV", "JSON"]}
        value={""}
        disabled={disabled}
        onChange={onDownload}
      />
    </MainViewWrapper>
  );
};

export default MainViewActions;
