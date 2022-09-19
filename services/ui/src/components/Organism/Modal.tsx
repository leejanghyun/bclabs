import styled from '@emotion/styled';
import { PropsWithChildren, MouseEvent, KeyboardEvent, memo } from 'react';
import { css } from '@emotion/react';
// Image
import ico_delete from '../../assets/images/ico/ico_delete.png';

// constansts
import { MonoColor } from '../../constants/';

// Components
import Portal from './Portal';

/** 컴포넌트 Property */
export interface ModalProps {
  visible?: boolean;
  maskClosable?: boolean;
  closable?: boolean;
  onClose: (event: MouseEvent | KeyboardEvent) => void;
}

/**
 * Modal 컴포넌트
 * @param props 컴포넌트 property
 * @returns Modal 컴포넌트
 */
export const Modal = ({
  visible = false, // Modal 숨김,보이기
  maskClosable = false, // mask 클릭 시 닫힘 유무
  closable = true, // close button 유무
  children,
  onClose,
}: PropsWithChildren<ModalProps>) => {
  /**
   * Mask 영역 클릭 시
   * @param event 이벤트 객체
   */
  const onMaskClick = (event: MouseEvent): void => {
    if (event.target !== event.currentTarget) {
      return;
    }
    onClose(event);
  };

  /**
   * Close 버튼 클릭 시
   * @param event 이벤트 객체
   */
  const close = (event: KeyboardEvent | MouseEvent) => {
    const keyEvent = (event as KeyboardEvent).key;

    if (keyEvent && keyEvent !== 'Enter') {
      return;
    }

    onClose(event);
  };

  return (
    <Portal elementId='modal'>
      <ModalOverlay visible={visible} />
      <ModalWrapper
        visible={visible}
        tabIndex={-1}
        onClick={maskClosable ? onMaskClick : undefined}
      >
        <ModalInner>
          {closable && (
            <ClearIcon src={ico_delete} onClick={close} onKeyDown={close} tabIndex={0} />
          )}
          {children}
        </ModalInner>
      </ModalWrapper>
    </Portal>
  );
};

type visibleTypeStyle = {
  visible: boolean;
};

const ClearIcon = styled.img`
  width: 35px;
  height: 35px;
  margin: 1px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;

  &:hover {
    transform: scale(1.15);
  }
`;

const FixedStyles = css`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const ModalWrapper = styled.div<visibleTypeStyle>`
  display: ${(props) => (props.visible ? 'block' : 'none')};
  z-index: 50;
  overflow: auto;
  outline: 0;
  ${FixedStyles}
`;

const ModalOverlay = styled.div<visibleTypeStyle>`
  display: ${(props) => (props.visible ? 'block' : 'none')};
  background-color: ${MonoColor.MONO_BLACK};
  opacity: 0.6;
  z-index: 49;
  ${FixedStyles}
`;

const ModalInner = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: ${MonoColor.MONO_WHITE};
  width: 400px;
  max-width: 500px;
  min-height: 250px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 50px;
`;

export default memo(Modal);
