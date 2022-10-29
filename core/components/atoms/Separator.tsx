import styled from "@emotion/styled";

const Separator = styled.hr`
  margin: 2rem 0;
  width: 100%;
`;

export const Spacer = styled(Separator)<{size?: number}>`
  margin: ${({size = 1}) => `${size*2}rem`};
  width: unset;
`;
Spacer.defaultProps = { as: "div" };

export default Separator;
