import { HTMLAttributes, memo, PropsWithChildren, ReactElement } from 'react';
import styled from '@emotion/styled';
import { SerializedStyles } from '@emotion/react';

// Constants
import { ElementType } from '../../constants/';

/** 컴포넌트 Property */
interface BoxProps extends HTMLAttributes<HTMLElement> {
  elementType?: keyof JSX.IntrinsicElements;
  styles?: SerializedStyles;
}

/**
 * Box 컴포넌트
 * @param props 컴포넌트 property
 * @returns Box 컴포넌트
 */
export const Box = memo(
  ({
    elementType = ElementType.Div,
    children,
    ...props
  }: PropsWithChildren<BoxProps>): ReactElement => {
    const Element = blockElement[elementType];

    return <Element {...props}>{children}</Element>;
  }
);

/** Style 컴포넌트 Property */
interface StyleProps {
  styles?: SerializedStyles;
}

/** Block Element Style */
const blockElement = {
  [ElementType.Div]: styled.div<StyleProps>`
    ${(props) => props.styles}
  `,
  [ElementType.Paragraph]: styled.p<StyleProps>`
    ${(props) => props.styles}
  `,
  [ElementType.Li]: styled.li<StyleProps>`
    ${(props) => props.styles}
  `,
  [ElementType.Ul]: styled.ul<StyleProps>`
    ${(props) => props.styles}
  `,
  [ElementType.Dl]: styled.ul<StyleProps>`
    ${(props) => props.styles}
  `,
  [ElementType.Dd]: styled.ul<StyleProps>`
    ${(props) => props.styles}
  `,
};
