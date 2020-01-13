import React from 'react';
import ReactDOM from 'react-dom';
import * as component from '../../component';
import Button from '../Button/Button';
import './Modal.less';

export type ModalPlacement = 'center' | 'top' | 'none';

export interface ModalBodyProps
  extends component.BaseComponent,
    component.NestedComponent {}

export interface ModalFooterProps
  extends component.BaseComponent,
    component.NestedComponent {}

type ModalBodyElement = React.FunctionComponentElement<ModalBodyProps>;
type ModalFooterElement = React.FunctionComponentElement<ModalFooterProps>;

export interface ModalProps
  extends component.BaseComponent,
    component.NestedComponent {
  /**
   * 是否显示
   * @default false
   */
  visible?: boolean;
  /**
   * 模态窗标题
   */
  title?: string;
  /**
   * 模态框宽度
   * @default 480
   */
  width?: number;
  /**
   * 是否显示关闭按钮
   * @default true
   */
  closable?: boolean;
  /**
   * 是否显示模态遮罩
   * @default true
   */
  mask?: boolean;
  /**
   * 点击模态遮罩是否关闭模态框
   * @default true
   */
  maskClosable?: boolean;
  /**
   * 遮罩的高优先级自定义样式
   */
  maskStyle?: React.CSSProperties;
  /**
   * 按下ESC键是否关闭模态框
   * @default true
   */
  escapeClosable?: boolean;
  /**
   * 模态框位置
   * - `center` - 居中，默认
   * - `top` - 偏上，距离屏幕上边缘`15%`
   * - `none` - 不指定位置，紧挨上边缘，可以由调用方通过`contentStyle.top`来设置任意位置
   * @default 'center'
   */
  placement?: ModalPlacement;
  /**
   * 模态框层级
   */
  zIndex?: number;
  /**
   * 当模态框关闭后，是否销毁
   * @default false
   */
  removeWhenClosed?: boolean;
  /**
   * 内容区的高优先级自定义样式
   */
  contentStyle?: React.CSSProperties;
  /**
   * 打开模态框时的回调函数
   */
  onOpen?: () => void;
  /**
   * 关闭模态框时的回调函数
   */
  onClose?: () => void;
}

export default function Modal(props: ModalProps) {
  const { visible, mask, title } = props;
  console.log(visible, mask, title);
  const type = 'modal';
  const prefix = component.getComponentPrefix(type);

  const cls = component.getComponentClasses(type, props, {
    [`${prefix}-${props.placement}`]:
      !!props.placement && props.placement !== 'none',
  });

  const modal = (
    <div className={cls} style={{ ...props.style, zIndex: props.zIndex }}>
      {props.mask && (
        <div
          className={`${prefix}-mask`}
          style={props.maskStyle}
          onClick={undefined}
        />
      )}
      <section
        className={`${prefix}-content`}
        style={{ ...props.contentStyle, width: props.width }}
      >
        {props.closable && (
          <Button
            icon="icon icon-guanbi"
            className={`${prefix}-close`}
            onClick={undefined}
          />
        )}
        {props.title && (
          <header className={`${prefix}-header`}>
            <h5 className={`${prefix}-title`}>{props.title}</h5>
          </header>
        )}
        {props.children}
      </section>
      {props.children}
    </div>
  );

  return ReactDOM.createPortal(modal, document.body);
}

function ModalBody(props: ModalBodyProps) {
  const cls = component.getComponentClasses('modal-body', props);
  return (
    <footer className={cls} style={props.style}>
      {props.children}
    </footer>
  );
}

function ModalFooter(props: ModalFooterProps) {
  const cls = component.getComponentClasses('modal-footer', props);
  return (
    <footer className={cls} style={props.style}>
      {props.children}
    </footer>
  );
}

const defaultProps: Partial<ModalProps> = {
  width: 480,
  closable: true,
  visible: false,
  mask: true,
  maskClosable: true,
  escapeClosable: true,
  placement: 'top',
  removeWhenClosed: false,
};

Modal.defaultProps = defaultProps;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
