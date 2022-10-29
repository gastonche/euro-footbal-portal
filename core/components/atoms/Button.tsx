import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Text from "./Text";

interface ButtonProps {
  size: "small" | "regular" | "large";
  color: "primary" | "secondary" | "accent" | "dark" | "white";
}

function applySize({ size = "regular" }: ButtonProps) {
  const paddings = {
    small: "0.5rem",
    regular: "0.75rem",
    large: "1rem",
  };

  const fontSizes = {
    large: "1.25rem",
    regular: "1rem",
    small: "0.8rem",
  };
  return css`
    padding: ${paddings[size]};
    font-size: ${fontSizes[size]};
  `;
}

function applyColor({ color = "accent" }: ButtonProps) {
  const colors = {
    primary: "var(--white)",
    secondary: "var(--white)",
    accent: "var(--white)",
    dark: "var(--white)",
    white: "var(--dark)",
    highlight: "var(--white)",
  };

  return css`
    background-color: var(--${color});
    color: ${colors[color]};
  `;
}

const Button = styled(Text)<ButtonProps>`
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: transform 0.3s linear;
  display: inline-flex;
  align-items: center;

  &:hover:not(:disabled) {
    transform: scale(1.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${applySize}
  ${applyColor}

  & > .material-icons {
    margin-right: 0.5rem;
  }
`;

Button.defaultProps = {
  as: "button",
  weight: "medium",
  size: "small"
}

export default Button;
