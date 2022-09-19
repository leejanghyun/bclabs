type ObjectValue<T extends object, K extends keyof T = keyof T> = T[K];

type None<T> = { [K in keyof T]?: never };

/** Thunk 공통 응답 값 */
interface CommonResponseResult<T extends object | null, K extends keyof T = keyof T> {
  isError: boolean;
  K?: T[K];
}

type CallbackFunction = (...args: unknown[]) => void;
