import React, { useEffect, ReactElement } from 'react';
import ReactDOM from 'react-dom';
import Button from '../button/button';
import './modal.less';

interface ModalProps {
  title?: string;
  visible: boolean;
  mask?: boolean;
  children: ReactElement;
  maskClosable?: boolean;
}

export default function Modal(props: ModalProps) {
  console.log(props.visible);
  const { visible, mask, title } = props;
  const modalRoot = document.createElement('div');
  modalRoot.id = 'modal_root';
  document.body.append(modalRoot);
  const modal = (
    <div className="yic-modal">
      {mask && <div className="mask" />}
      <section className="content">
        <header>
          {title && <div className="title">{title}</div>}
          <button type="button" className="close">
            <i className="iconfont icon-guanbi iclose" />
          </button>
        </header>
        <main>{props.children}</main>
        <footer>
          <Button>取消</Button>
          <Button type="primary">确定</Button>
        </footer>
      </section>
      {props.children}
    </div>
  );
  useEffect(() => {
    if (visible) {
      ReactDOM.createPortal(<div>123</div>, modalRoot);
    }
  }, [modal, modalRoot, visible]);

  return ReactDOM.createPortal(<div>123</div>, modalRoot);
}

const defaultProps: Partial<ModalProps> = {
  title: '弹窗',
  visible: false,
  mask: true,
  maskClosable: true,
};

Modal.defaultProps = defaultProps;
