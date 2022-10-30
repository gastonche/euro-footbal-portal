import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { useMemo, useState } from "react";
import Button from "../atoms/Button";
import CheckBox from "../atoms/CheckBox";
import Text from "../atoms/Text";

export interface SelectOptionObject {
  label: string;
  value: string;
}

export type SelectOption = string | SelectOptionObject;

interface SelectProps {
  options: SelectOption[];
  value: string | string[];
  isMultiple?: boolean;
  placeholder?: string;
  onChange: (k: string | string[]) => void;
}

const DropdownWrapper = styled.div`
  position: relative;

  & > button {
    float: right;
  }

  .bg {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background: rgba(0, 0, 0, 0.05);
    z-index: 9;
  }
`;

const animate = keyframes`
  0% { opacity: 0; top: 0; }
  100% { opacity: 1; top: 100%; }
`;

const Dropdown = styled.div`
  width: 100%;
  position: absolute;
  top: 100%;
  background: var(--light);
  max-height: 300px;
  margin-top: 0.2rem;
  border-radius: 0.2rem;
  overflow: auto;
  border: 1px solid #dfe0eb;
  animation-duration: 0.3s;
  animation-name: ${animate};
  animation-fill-mode: backwards;
  z-index: 10;
`;

const DropdownOption = styled(Text)`
  padding: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;

  &:hover,
  &.active {
    background-color: #dfe0eb;
  }
`;

const Toggler = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
  position: relative;
  cursor: pointer;

  & > span:first-of-type {
    flex: 1;
  }
`;

const SimpleSelectToggler = styled(Text)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 130px;
`;

const SingleSelectOptions = ({
  value,
  options,
  onChange,
}: {
  value: string;
  options: SelectOptionObject[];
  onChange: (k: string) => void;
}) => {
  return (
    <>
      {options.map((option) => (
        <DropdownOption
          className={value === option.value ? "active" : ""}
          key={option.value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </DropdownOption>
      ))}
    </>
  );
};

const MultiSelectOptions = ({
  value,
  options,
  onChange,
}: {
  value: string[];
  options: SelectOptionObject[];
  onChange: (k: string[], autoClose: boolean) => void;
}) => {
  const change = (v: string) => {
    let newValue = value;
    if (value.includes(v)) {
      newValue = value.filter((i) => i != v);
    } else {
      newValue = [...value, v];
    }
    onChange(newValue, false);
  };

  return (
    <>
      {options.map((option) => (
        <DropdownOption key={option.value} onClick={() => change(option.value)}>
          <CheckBox checked={value.includes(option.value)} />
          {option.label}
        </DropdownOption>
      ))}
    </>
  );
};

const useOptions = (options: SelectOption[]): SelectOptionObject[] => {
  const selectOptions = useMemo(
    () =>
      options.map((option) => {
        if (typeof option === "string") {
          option = {
            label: option,
            value: option,
          };
        }

        return option;
      }),
    [options]
  );

  return selectOptions;
};

const getLabelForValue = (
  value: string | string[],
  options: SelectOptionObject[]
) => {
  let values = typeof value == "string" ? [value] : value;
  return values
    .map((v) => options.find((option) => option.value === v)?.label)
    .filter(Boolean)
    .join(", ");
};

const DropdownSelect = ({
  children,
  options,
  value,
  isMultiple,
  onChange,
}: SelectProps & { children: any; options: SelectOptionObject[] }) => {
  const [open, setOpen] = useState(false);
  const change = (value: string | string[], autoClose = true) => {
    onChange(value);
    autoClose && setOpen(false);
  };

  return (
    <DropdownWrapper>
      <Toggler onClick={() => setOpen(!open)}>
        <span>{children}</span>
        <span className="material-icons">
          {open ? "expand_less" : "expand_more"}
        </span>
      </Toggler>
      {open && <div className="bg" onClick={() => setOpen(false)}></div>}
      {open ? (
        <Dropdown>
          {isMultiple ? (
            <MultiSelectOptions
              value={value as string[]}
              onChange={change}
              options={options}
            />
          ) : (
            <SingleSelectOptions
              value={value as string}
              onChange={change}
              options={options}
            />
          )}
        </Dropdown>
      ) : (
        <></>
      )}
    </DropdownWrapper>
  );
};

export const SimpleDropdownSelect = (props: SelectProps) => {
  const options = useOptions(props.options);
  const value = useMemo(
    () => getLabelForValue(props.value, options),
    [options, props.value]
  );

  return (
    <DropdownSelect {...props} options={options}>
      <SimpleSelectToggler color={value ? "dark" : "dark-05"}>
        {value || props.placeholder}
      </SimpleSelectToggler>
    </DropdownSelect>
  );
};

export const DropdownActionButton = ({
  label,
  value,
  onChange,
  ...props
}: SelectProps & any) => {
  const [open, setOpen] = useState(false);
  const options = useOptions(props.options);

  const change = (e: string) => {
    onChange(e);
    setOpen(false);
  };

  return (
    <DropdownWrapper>
      <Button {...props} onClick={() => setOpen(!open)}>{label}</Button>
      {open && (
        <>
          <div className="bg" onClick={() => setOpen(false)}></div>
          <Dropdown>
            <SingleSelectOptions
              value={value as string}
              onChange={change}
              options={options}
            />
          </Dropdown>
        </>
      )}
    </DropdownWrapper>
  );
};
