import styled from '@emotion/styled';
import { SerializedStyles } from '@emotion/react';
import {
  useRef,
  useState,
  Ref,
  ChangeEvent,
  useImperativeHandle,
  forwardRef,
  PropsWithChildren,
} from 'react';

// Constants
import { InputType } from '../../constants/';

// Components
import { Box } from '../Atom/';

/** 컴포넌트 Property */
interface Props {
  placeholder?: string;
  styles?: SerializedStyles;
  type?: InputType;
  value?: string;
  max?: number;
  disabled?: boolean;
  onChange?: (value: string) => void;
}

/** 컴포넌트 핸들러 */
export type TextInputHandler = {
  getValue: () => string;
  hasValue: () => boolean;
  resetValue: () => void;
};

/**
 * TextInput 컴포넌트
 * @param props 컴포넌트 프로퍼티
 * @returns TextInput 컴포넌트
 */
export const TextInput = forwardRef<TextInputHandler | undefined, PropsWithChildren<Props>>(
  (
    { type = InputType.Text, value = '', styles, max = 100, onChange, ...props }: Props,
    ref: Ref<TextInputHandler | undefined>
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [inputType] = useState(type);

    /** 상위 부모에서 호출할 함수 정의 */
    useImperativeHandle(ref as Ref<TextInputHandler>, () => ({
      /** 값이 있는지 유무 */
      hasValue: () => {
        const { current } = inputRef;
        const { value } = current as HTMLInputElement;

        return Boolean(value.length);
      },

      /** 텍스트 값 반환 */
      getValue: () => {
        const { current } = inputRef;
        const { value } = current as HTMLInputElement;

        return value;
      },

      /** 텍스트 삭제 반환 */
      resetValue: () => {
        const { current } = inputRef;

        (current as HTMLInputElement).value = '';
      },
    }));

    /**
     * Change 콜백 함수
     * @param event 이벤트 객체
     */
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      const { target } = event;
      const { value } = target as HTMLInputElement;
      const { length } = value;

      if (type === InputType.Number && length > max) {
        target.value = value.slice(0, max);
      }

      onChange?.(value);
    };

    return (
      <Box>
        <InputStyled
          type={inputType}
          ref={inputRef}
          maxLength={max}
          defaultValue={value}
          styles={styles}
          onChange={handleInputChange}
          {...props}
        />
      </Box>
    );
  }
);

/** Input Style Property */
interface TextInputStyleProps {
  styles?: SerializedStyles;
}

/** Input Styled */
const InputStyled = styled.input<TextInputStyleProps>`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 12px 8px;
  height: 48px;
  min-height: 48px;
  border-radius: 4px;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
  font-family: 'Balsamiq Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  flex: none;
  order: 0;
  flex-grow: 1;

  ${(props) => props.styles}
`;
