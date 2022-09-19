import { memo, ReactElement } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

// constants
import { MonoColor, PrimaryColor } from '../../constants';

// Components
import { Box } from '../Atom';

/** 컴포넌트 Property */
export interface GnbProps {
  title: string;
  subTitle?: string;
  onTitleClick?: () => void;
}

/**
 * Gnb 컴포넌트
 * @param props 컴포넌트 property
 * @returns Gnb 컴포넌트
 */
export const Gnb = memo(({ title, subTitle, onTitleClick }: GnbProps): ReactElement => {
  return (
    <GnbStyled>
      <Box styles={TitleWrapperCss} onClick={onTitleClick}>
        <Box styles={TitleCss}>{title}</Box>
        <Box styles={SubTitleCss}>{subTitle}</Box>
      </Box>
    </GnbStyled>
  );
});

// Gnb Styled
const GnbStyled = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 5vh;
  z-index: 5;
  padding: 10px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  background-color: ${PrimaryColor.PRIMARY_700};
  color: ${MonoColor.MONO_WHITE};
`;

// Title Wrapper Css
const TitleWrapperCss = css`
  display: flex;
  align-items: baseline;
  padding: 5px 0px 3px 0px;
`;

// Title Css
const TitleCss = css`
  font-size: 1.3rem;
  cursor: pointer;
  font-weight: 500;
`;

// Sub Title Css
const SubTitleCss = css`
  width: fit-content;
  height: 17px;
  margin: 0px 0px 0px 8px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 400;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
`;
