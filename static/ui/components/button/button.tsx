import React from 'react';
import * as component from '../../component';

import './Button.less';

export type ButtonType =
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'text'
  | 'link';
export type ButtonShape = 'square' | 'circle' | 'round';

interface BaseButtonProps
  extends component.BaseComponent,
    component.DisabledComponent,
    component.SizedComponent,
    component.NestedComponent,
    Omit<component.IconableComponent, 'iconSpin' | 'onIconClick'> {
  /**
   * 按钮形状
   * @default square
   */
  shape?: ButtonShape;
  /**
   * 是否是加载中状态
   * @default false
   */
  loading?: boolean;

  /**
   * 按钮类型：
   * - `primary` - 主按钮，在同一个操作区域中，应当只有一个主按钮
   * - `success` - 成功按钮
   * - `warning` - 警告按钮
   * - `danger` - 危险按钮
   * - `text` - 文本式按钮
   * - `link` - 链接式按钮
   */
  type?: ButtonType;
}

export interface NativeButtonProps
  extends BaseButtonProps,
    component.MouseEventComponent<HTMLButtonElement> {
  /**
   * 设置`button`原生的`type`值:
   * - `button` - 普通按钮，默认
   * - `submit` - 提交按钮
   * - `reset` - 重置按钮
   * @default 'button'
   */
  htmlType?: 'button' | 'submit' | 'reset';
}

export interface LinkButtonProps
  extends BaseButtonProps,
    component.MouseEventComponent<HTMLAnchorElement> {
  /**
   * 点击按钮跳转的链接，指定此属性后的行为将和`<a>`链接一致
   */
  href?: string;

  /**
   * 相当于`<a>`链接的`target`属性，仅在指定`href`属性后生效
   */
  target?: string;

  /**
   * 下载链接，相当于`<a>`链接的`download`属性，仅在指定`href`属性后生效
   */
  download?: string;

  /**
   * 链接关系，相当于`<a>`链接的`rel`属性，仅在指定`href`属性后生效
   */
  rel?: string;
}

export type ButtonProps = NativeButtonProps | LinkButtonProps;

function getClasses(props: BaseButtonProps) {
  const type = 'btn';
  const prefix = component.getComponentPrefix(type);
  const btnCls = component.getComponentClasses(type, props, {
    [`${prefix}-${props.type}`]: !!props.type,
    [`${prefix}-${props.shape}`]: !!props.shape,
  });

  return btnCls;
}

export default function Button(props: ButtonProps) {
  if ('href' in props) {
    return <LinkButton {...props}>{props.children}</LinkButton>;
  }
  const nativeProps = props as NativeButtonProps;
  return <NativeButton {...nativeProps}>{props.children}</NativeButton>;
}

function NativeButton(props: NativeButtonProps) {
  const { onClick, htmlType } = props;
  const btnCls = getClasses(props);

  return (
    // eslint-disable-next-line react/button-has-type
    <button className={btnCls} type={htmlType} onClick={onClick}>
      {props.children}
    </button>
  );
}

function LinkButton(props: LinkButtonProps) {
  const { href, target } = props;
  const btnCls = getClasses(props);

  return (
    <a href={href} target={target} className={btnCls}>
      {props.children}
    </a>
  );
}

const defaultProps: Partial<ButtonProps> = {
  shape: 'square',
  size: 'normal',
  target: '_blank',
  loading: false,
  icon: '',
  htmlType: 'button',
};

Button.defaultProps = defaultProps;
