import {
  CSSProperties,
  ReactNode,
  MouseEvent,
  KeyboardEvent,
  ChangeEvent,
  FormEvent,
  FocusEvent,
} from 'react';
import cx from 'classnames';

export type ComponentSize = 'normal' | 'small' | 'large';

export type IconPosition = 'left' | 'right' | 'none';

export interface BaseComponent {
  /**
   * 自定义组件样式类，可用于实现自定义样式
   */
  className?: string;
  /**
   * 高优先级的内联自定义样式，可用于覆盖某些默认样式
   */
  style?: CSSProperties;
}

export interface NestedComponent<T = ReactNode> {
  /**
   * 子组件
   */
  children?: T;
}

export interface SizedComponent {
  /**
   * 设置组件尺寸大小:
   * - `normal` - 常规尺寸（中尺寸），默认
   * - `small` - 小尺寸
   * - `large` - 大尺寸
   * @default 'normal'
   */
  size?: ComponentSize;
}

export interface DisabledComponent {
  /**
   * 是否是禁用状态，当禁用后，组件不可交互
   * @default false
   */
  disabled?: boolean;
}
export interface MouseEventComponent<T extends HTMLElement = HTMLElement> {
  onClick?: (e: MouseEvent<T>) => void;
  onDoubleClick?: (e: MouseEvent<T>) => void;
  onContextMenu?: (e: MouseEvent<T>) => void;
  onMouseDown?: (e: MouseEvent<T>) => void;
  onMouseUp?: (e: MouseEvent<T>) => void;
  onMouseEnter?: (e: MouseEvent<T>) => void;
  onMouseLeave?: (e: MouseEvent<T>) => void;
  onMouseMove?: (e: MouseEvent<T>) => void;
  onMouseOver?: (e: MouseEvent<T>) => void;
  onMouseOut?: (e: MouseEvent<T>) => void;
}

export interface KeyboardEventComponent<T extends HTMLElement = HTMLElement> {
  onKeyPress?: (e: KeyboardEvent<T>) => void;
  onKeyDown?: (e: KeyboardEvent<T>) => void;
  onKeyUp?: (e: KeyboardEvent<T>) => void;
}

export interface FormEventComponent<T extends HTMLElement = HTMLElement> {
  onChange?: (e: ChangeEvent<T>) => void;
  onInput?: (e: FormEvent<T>) => void;
  onReset?: (e: FormEvent<T>) => void;
  onSubmit?: (e: FormEvent<T>) => void;
  onInvalid?: (e: FormEvent<T>) => void;
}

export interface FocusEventComponent<T extends HTMLElement = HTMLElement> {
  onFocus?: (e: FocusEvent<T>) => void;
  onBlur?: (e: FocusEvent<T>) => void;
}

export interface FormComponent<T extends HTMLElement = HTMLElement>
  extends BaseComponent,
    FormEventComponent,
    FocusEventComponent,
    DisabledComponent {
  /**
   * 表单ID属性
   */
  id?: string;

  /**
   * 表单name属性
   */
  name?: string;

  /**
   * 表单value，用于受控表单组件
   * @see https://reactjs.org/docs/forms.html?#controlled-components
   */
  value?: string;

  /**
   * 表单默认value，用于非受控表单组件
   * @see https://reactjs.org/docs/uncontrolled-components.html
   */
  defaultValue?: string;
}

export interface InputFormComponent<T extends HTMLElement = HTMLElement>
  extends FormComponent<T>,
    KeyboardEventComponent<T>,
    SizedComponent {
  /**
   * 输入框占位符，默认空白
   */
  placeholder?: string;

  /**
   * 是否是只读输入框
   * @default false
   */
  readOnly?: boolean;

  /**
   * 可清除的输入框，即在输入框右侧显示清除图标
   * @default falseT
   */
  clearable?: boolean;

  /**
   * 清除输入框内容后的回调函数
   */
  onClear?: () => void;

  /**
   * 按下回车键时的回调函数，通常用在按下回车时执行某个动作的场景
   */
  onPressEnter?: (e: React.KeyboardEvent<T>) => void;
}

export interface IconableComponent {
  /**
   * 图标，图标名与`Icon`组件中的完全一致
   */
  icon?: string;

  /**
   * 图标位置：
   * - `left` - 居左，默认
   * - `right` - 居右
   * @default 'left'
   */
  iconPosition?: IconPosition;

  /**
   * 大小，即`Icon`组件的`fontSize`属性
   */
  iconSize?: number;

  /**
   * 是否旋转图标
   */
  iconSpin?: boolean;

  /**
   * 自定义图标样式类
   */
  iconClassName?: string;

  /**
   * 自定义图标内联样式
   */
  iconStyle?: React.CSSProperties;

  /**
   * 图标点击后的回调函数
   */
  onIconClick?: (e: React.MouseEvent<HTMLElement>) => void;
}
export const prefix = 'yic';

export function getComponentPrefix(type: string) {
  return `${prefix}-${type}`;
}

/**
 * 获取组件class
 *
 * @export
 * @param {string} type 组件类型
 * @param {P} props 组件Props
 * @param {...ClassValue[]} classes 额外样式
 * @returns {string}
 */
export function getComponentClasses<
  p extends BaseComponent & SizedComponent & DisabledComponent
>(type: string, props: Partial<p>, ...classes) {
  const main = getComponentPrefix(type);
  return cx(
    main,
    {
      [`${main}-sm`]: props.size === 'small',
      [`${main}-lg`]: props.size === 'large',
      [`${main}-disabled`]: !!props.disabled,
    },
    ...classes,
    props.className
  );
}

/**
 * 获取默认size
 *
 * @export
 * @returns {SizedComponent}
 */
export function getDefaultSizedProps(): SizedComponent {
  return { size: 'normal' };
}

/**
 * 获取默认禁用标记
 *
 * @export
 * @returns {DisableComponent}
 */
export function getDefaultDisabledProps(): DisabledComponent {
  return { disabled: false };
}
