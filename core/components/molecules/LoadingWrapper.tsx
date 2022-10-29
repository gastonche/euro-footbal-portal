import styled from "@emotion/styled";
import LoadingIndicator from "../atoms/LoadingIndicator";

const StyledLoadingWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function LoadingWrapper({
  isLoading,
  children,
  ...props
}: {
  isLoading: boolean;
  children?: any;
}) {
  return isLoading ? (
    <StyledLoadingWrapper {...props}>
      <LoadingIndicator />
    </StyledLoadingWrapper>
  ) : (
    children
  );
}
