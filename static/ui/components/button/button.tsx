import React from 'react';
import * as component from '../../component';

import './button.less';

type ButtonType =
  | 'default'
  | 'primary'
  | 'success'
  | 'danger'
  | 'text'
  | 'link';
type ButtonShape = '' | 'circle' | 'round';
type ButtonSize = 'normal' | 'small' | 'large';

interface BaseButtonProps {
  type?: ButtonType;
  shape?: ButtonShape;
  size?: ButtonSize;
  loading?: boolean;
  icon?: string;
  children?: React.ReactNode;
}

interface NativeButtonProps extends BaseButtonProps {
  htmlType?: 'submit' | 'reset' | 'button';
  onClick: () => void;
}

interface LinkButtonProps extends BaseButtonProps {
  href?: string;
  target?: string;
  rel?: string;
  download?: string;
}

type ButtonProps = NativeButtonProps | LinkButtonProps;

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
  shape: '',
  size: 'normal',
  target: '_blank',
  loading: false,
  icon: '',
  htmlType: 'button',
};

Button.defaultProps = defaultProps;
