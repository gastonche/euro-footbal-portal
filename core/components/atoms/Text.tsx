import { css } from "@emotion/react";
import styled from "@emotion/styled";

type textTagType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "p";

export interface TextProps {
  readonly as?: textTagType;
  readonly children: any;
  size?: string;
  weight?: string;
  color?: string;
}

function sizeAndWeight({ size = "regular", weight = "regular" }: TextProps) {
  const sizes: any = {
    medium: "1.188rem",
    regular: "0.875rem",
    small: "0.75rem",
    large: "2rem",
  };

  const weights: any = {
    bold: "700",
    regular: "400",
    medium: "500",
    light: "300",
  };

  return css`
    font-size: ${sizes[size]};
    font-weight: ${weights[weight]};
    line-height: 1.5;
  `;
}

function textColor({ color = "dark" }) {
  return css`
    color: var(--${color});
  `;
}

const StyledText = styled.p<TextProps>`
  ${textColor}
  ${sizeAndWeight}
`;

const Text = ({ children, as = "p", ...props }: TextProps | any): JSX.Element => {
  return (
    <StyledText as={as} {...props}>
      {children}
    </StyledText>
  );
};

export default Text;
