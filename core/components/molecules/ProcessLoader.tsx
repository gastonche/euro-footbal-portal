import styled from "@emotion/styled";
import LoadingWrapper from "./LoadingWrapper";

interface LoaderProps {
  isLoading: boolean;
}

const StyledProccessLoader = styled(LoadingWrapper)<any>`
  background: var(--secondary);
  padding: 20px 0 10px;
  border-radius: 0.5rem;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  height: 60px;
  bottom: -70px;
  transition: bottom 0.3s ease-in-out;
  z-index: 9;

  &.loading {
    bottom: 20px;
  }
`;

const ProccessLoader = ({ isLoading }: LoaderProps) => (
  <StyledProccessLoader
    isLoading={isLoading}
    className={isLoading ? "loading" : ""}
  />
);

export default ProccessLoader;
