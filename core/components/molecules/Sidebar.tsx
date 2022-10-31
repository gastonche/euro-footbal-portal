import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { FC, useState } from "react";
import Text from "../atoms/Text";

const StyledBar = styled.aside`
  width: 300px;
  height: 100%;
  border-radius: 1rem;
  -webkit-backdrop-filter: blur(8px); /* Safari 9+ */
  backdrop-filter: blur(8px); /* Chrome and Opera */
  box-shadow: inset 0 0 0 200px rgba(255, 255, 255, 0.1);
  padding: 0.75rem;
`;

const Header = styled(Text)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  text-align: center;
`;

Header.defaultProps = {
  color: "light",
  weight: "medium",
  size: "large",
};

const Content = styled.section`
  background-color: var(--light);
  padding: 1rem;
  height: calc(100% - 100px);
  border-radius: 0.5rem;
  margin-top: 5px;
  position: relative;
  overflow: auto;
`;

const Tabs = styled.div<{showHistory: boolean}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  position: relative;
  margin-bottom: 1rem;
  background-color: var(--light);
  position: sticky;
  top: 0;
  z-index: 9;

  &::after {
    content: "";
    height: 3px;
    border-radius: 0 0 3px 3px;
    background: var(--secondary);
    width: 100px;
    position: absolute;
    top: 120%;
    left: 7px;
    transition: left 0.3s ease-out;

    ${({showHistory}) => showHistory && css`
      left: 150px;
    `}
  }

  span {
    cursor: pointer;
  }
`;

interface SidebarProps {
  History: FC,
  Templates: FC
}

const Sidebar = ({History, Templates}: SidebarProps) => {
  const [showHistory, setShowHistory] = useState(false);
  return (
    <StyledBar>
      <Header color="light">Euro football Records</Header>
      <Content>
        <Tabs showHistory={showHistory}>
          <Text
            as="span"
            weight={showHistory? "medium": "bold"}
            color={!showHistory ? "secondary" : "dark"}
            onClick={() => setShowHistory(false)}
          >
            Query Templates
          </Text>
          <Text
            as="span"
            weight={!showHistory? "medium": "bold"}
            color={showHistory ? "secondary" : "dark"}
            onClick={() => setShowHistory(true)}
          >
            Query History
          </Text>
        </Tabs>
        {showHistory? <History  />: <Templates />}
      </Content>
    </StyledBar>
  );
};

export default Sidebar;
