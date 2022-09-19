import { memo, PropsWithChildren, ReactElement, ButtonHTMLAttributes } from 'react';
import styled from '@emotion/styled';
import { css, SerializedStyles } from '@emotion/react';

// Constants
import { ElementType, GrayColor, MonoColor, PrimaryColor } from '../../constants/';

/** 컴포넌트 Property */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  styles?: SerializedStyles;
  convert?: boolean;
}

/**
 * Button 컴포넌트
 * @param props 컴포넌트 property
 * @returns Button 컴포넌트
 */
export const Button = memo(
  ({ children, ...props }: PropsWithChildren<ButtonProps>): ReactElement => {
    return <StyledButton {...props}>{children}</StyledButton>;
  }
);

/** Button Style Property */
interface ButtonStyleProps {
  styles?: SerializedStyles;
  convert?: boolean;
}

// Common Button Css
const CommonButtonCss = css`
  position: relative;
  box-sizing: border-box;
  outline: 0px;
  border: 0px;
  margin: 5px;
  cursor: pointer;
  vertical-align: middle;
  letter-spacing: 0.02857em;
  min-width: 64px;
  display: inline-flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  border-radius: 0.2rem;
  line-height: 1.4;
  text-align: center;
  font-size: 0.95rem;
  font-weight: 400;
  box-shadow: 2px 2px 3px ${GrayColor.GRAY_300};
  padding: 0.5rem 1rem;
  max-width: 200px;
  min-width: 120px;
  background-size: 150% !important;
  background-position-x: 25% !important;

  &:hover {
    transform: scale(1.05);
  }
`;

// Basic Button Css
const BasicCss = (props: ButtonStyleProps) => css`
  color: ${props.convert ? PrimaryColor.PRIMARY_700 : MonoColor.MONO_WHITE};
  background-color: ${props.convert ? MonoColor.MONO_WHITE : PrimaryColor.PRIMARY_700};
`;

// Disabled Button Css
const DisableCss = (props) => css`
  background-color: ${props.disabled ? GrayColor.GRAY_400 : ''};
  color: ${props.disabled ? GrayColor.GRAY_200 : ''};
`;

// Button Styled
const StyledButton = styled(ElementType.Button)<ButtonStyleProps>`
  ${CommonButtonCss}
  ${BasicCss}
  ${(props) => props.styles}
  ${DisableCss}
`;
