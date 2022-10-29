import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const bounce = keyframes`
  to {
    opacity: 0.1;
    transform: translateY(-16px);
  }
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;

  & > div {
    width: 16px;
    height: 16px;
    margin: 3px 6px;
    border-radius: 50%;
    background-color: #a3a1a1;
    opacity: 1;
    animation: ${bounce} 0.6s infinite alternate;

    &:nth-child(2) {
      animation-delay: 0.2s;
    }

    &:nth-child(3) {
      animation-delay: 0.4s;
    }
  }
`;

export default function LoadingIndicator() {
  return <Loader>
    <div></div>
    <div></div>
    <div></div>
  </Loader>
}
