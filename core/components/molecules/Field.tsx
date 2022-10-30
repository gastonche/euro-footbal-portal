import styled from "@emotion/styled";
import Text from "../atoms/Text";

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

export default function Field(props: any): JSX.Element {
  return (
    <FieldWrapper {...props}>
      <Text size="regular" color="dark-05">
        {props.label}
      </Text>
      {props.children}
    </FieldWrapper>
  );
}
