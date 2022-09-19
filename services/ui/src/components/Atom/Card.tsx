import { HTMLAttributes, memo, PropsWithChildren, ReactElement } from 'react';
import styled from '@emotion/styled';
import { css, SerializedStyles } from '@emotion/react';

// Image
import ico_delete from '../../assets/images/ico/ico_delete.png';

// Constants
import { GrayColor, MonoColor } from '../../constants';

// Components
import { Box } from './Box';

/** 컴포넌트 Property */
export interface Props extends HTMLAttributes<HTMLElement> {
  styles?: SerializedStyles;
  isClearable?: boolean;
  onDelete?: () => void;
}

/**
 * Card 컴포넌트
 * @param props 컴포넌트 property
 * @returns Card 컴포넌트
 */
export const Card = memo(
  ({
    children,
    isClearable = false,
    onDelete,
    ...props
  }: PropsWithChildren<Props>): ReactElement => {
    return (
      <CardStyled {...props}>
        {/** 삭제 가능한 경우 삭제 아이콘 */}
        {isClearable && (
          <Box styles={HeaderCss}>
            <DeleteIcon
              src={ico_delete}
              onClick={(event) => {
                event.stopPropagation();
                onDelete?.();
              }}
            />
          </Box>
        )}
        {children}
      </CardStyled>
    );
  }
);

/** Style 컴포넌트 Property */
interface StyleProps {
  styles?: SerializedStyles;
}

/** Header Css */
const HeaderCss = css`
  display: flex;
  justify-content: flex-end;
`;

/** Delete Icon */
const DeleteIcon = styled.img`
  width: 30px;
  height: 30px;
  margin: 1px;

  &:hover {
    transform: scale(1.15);
  }
`;

/** Card Styled */
const CardStyled = styled.div<StyleProps>`
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-wrap: break-word;
  background-color: ${MonoColor.MONO_WHITE};
  background-clip: border-box;
  border-radius: 0.5rem;
  width: 300px;
  height: 165px;
  margin-right: 32px;
  margin-bottom: 32px;
  cursor: pointer;
  border: 1px solid ${GrayColor.GRAY_400};
  box-shadow: none;
  &:hover {
    background-color: ${MonoColor.MONO_100};
  }
  ${(props) => props.styles}
`;
