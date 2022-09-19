import { HTMLAttributes, memo, PropsWithChildren, ReactElement } from 'react';
import styled from '@emotion/styled';
import { SerializedStyles } from '@emotion/react';

/** 컴포넌트 Property */
interface TypographyProps extends HTMLAttributes<HTMLElement> {
  elementType?: keyof JSX.IntrinsicElements;
  className?: string;
  styles?: SerializedStyles;
  htmlFor?: string;
}

/** Style 컴포넌트 Property */
interface StyleProps {
  styles?: SerializedStyles;
}

/**
 * Typography 컴포넌트
 * @param props 컴포넌트 property
 * @returns Typography 컴포넌트
 */
export const Typography = memo(
  ({
    elementType = 'span',
    children,
    ...props
  }: PropsWithChildren<TypographyProps>): ReactElement => {
    const Element = styled(elementType)<StyleProps>`
      ${(props) => props.styles}
    `;

    return <Element {...props}>{children}</Element>;
  }
);
