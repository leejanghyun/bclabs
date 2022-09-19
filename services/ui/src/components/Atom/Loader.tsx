import styled from '@emotion/styled';

// constants
import { MonoColor, Opacity } from '../../constants/';

/**
 * Loader Component 정의
 */
export const Loader = () => {
  return (
    <Wrapper>
      <Progress></Progress>
    </Wrapper>
  );
};

/** Wrapper Styled */
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  background-color: ${MonoColor.MONO_BLACK};
  opacity: ${Opacity.OPACITY_05};
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
`;

/** Progress Styled */
const Progress = styled.div`
  border: 5px solid ${MonoColor.MONO_WHITE};
  border-top: 5px solid ${MonoColor.MONO_BLACK};
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
