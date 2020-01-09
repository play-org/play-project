import React, { ReactElement, useRef } from 'react';
import cx from 'classnames';
import * as component from '../../component';
import useAnimation from '../../hooks/animation';

interface AnimationProps extends component.NestedComponent<ReactElement> {
  /**
   * 应用动画效果的组件名称
   */
  name: string;
  /**
   * 组件是否可见
   * @default false
   */
  visible?: boolean;
  /**
   * 入场动画结束后的回调函数
   */
  onEnter?: () => void;

  /**
   * 离场动画结束后的回调函数
   */
  onLeave?: () => void;
}

function Animation(props: AnimationProps, ref?: React.Ref<HTMLElement>) {
  const { name, visible } = props;
  const newChildRef = useRef(null);
  const element = props.children;
  const childRef = (ref || newChildRef) as React.RefObject<HTMLElement>;
  const animation = useAnimation(!!visible, childRef);
  const prefix = component.getComponentPrefix(name);
  const className = cx(element.props.className, {
    [`${prefix}-${animation}`]: !!animation,
  });
  return React.cloneElement(element, { ref: childRef, className });
}

export default React.forwardRef(Animation);
