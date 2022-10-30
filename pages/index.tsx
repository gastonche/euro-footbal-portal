import styled from "@emotion/styled";
import Sidebar from "../core/components/molecules/Sidebar";
import MainView from "../core/components/organisms/MainView";
import SidebarQueryHistory from "../core/components/organisms/SidebarQueryHistory";
import SidebarQueryTemplates from "../core/components/organisms/SidebarQueryTemplates";

const StyledWrapper = styled.div`
  background: url("/images/background.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  padding: 1rem;
  display: flex;
  height: 100vh;
  overflow: auto;
  gap: 1rem;
`;

export default function Home() {
  return (
    <StyledWrapper>
      <Sidebar
        History={() => <SidebarQueryHistory />}
        Templates={() => <SidebarQueryTemplates />}
      />
      <MainView />
    </StyledWrapper>
  );
}

export function getServerSideProps() {
  return { props: {} };
}
