import React, { ReactElement } from 'react';

interface DraggableEvent {
  offsetX: number;
  offsetY: number;
  pageX: number;
  pageY: number;
  clientX: number;
  clientY: number;
  isStart: boolean;
  isDragging: boolean;
  isCompleted: boolean;
  movingType: string;
}

interface IProps {
  children: ReactElement;
  onDragging?: (data: DraggableEvent) => void;
  onDragEnd?: (data: DraggableEvent) => void;
}

export default class Draggable extends React.Component<IProps> {
  previous: { x: number; y: number } | null = null;

  isDragging = false;

  isTicking = false;

  componentWillUnmount() {
    this.clear();
  }

  onMouseDown = evt => {
    // 非左键按下，不执行
    if (evt.button !== 0) return;

    const { onDragging } = this.props;
    const { pageX, pageY, clientX, clientY } = evt;
    const data: DraggableEvent = {
      offsetX: 0,
      offsetY: 0,
      pageX,
      pageY,
      clientX,
      clientY,
      isStart: true,
      isDragging: false,
      isCompleted: false,
      movingType: 'mouseDown',
    };
    evt.stopPropagation();

    this.previous = { x: pageX, y: pageY };

    const opts: AddEventListenerOptions = { passive: false, capture: false };
    window.addEventListener('mousemove', this.onMouseMove, opts);
    window.addEventListener('mouseup', this.onMouseUp, opts);
    window.addEventListener('mouseleave', this.onMouseUp, opts);

    onDragging && onDragging(data);
  };

  onMouseMove = evt => {
    if (this.isTicking) return;

    window.requestAnimationFrame(() => {
      this.isTicking = false;
      if (!this.previous) return;
      const { onDragging } = this.props;
      const { pageX, pageY, clientX, clientY } = evt;
      const offsetX = pageX - this.previous.x;
      const offsetY = pageY - this.previous.y;

      this.previous = { x: evt.pageX, y: evt.pageY };
      this.isDragging = true;

      if (offsetX === 0 && offsetY === 0) return;

      const data: DraggableEvent = {
        offsetX,
        offsetY,
        pageX,
        pageY,
        clientX,
        clientY,
        isStart: false,
        isDragging: true,
        isCompleted: false,
        movingType: 'mouseMove',
      };
      onDragging && onDragging(data);
    });
    this.isTicking = true;
  };

  onMouseUp = evt => {
    window.requestAnimationFrame(() => {
      const { onDragging, onDragEnd } = this.props;
      const { pageX, pageY, clientX, clientY } = evt;
      const offsetX = this.previous ? pageX - this.previous.x : 0;
      const offsetY = this.previous ? pageY - this.previous.y : 0;
      const data: DraggableEvent = {
        offsetX,
        offsetY,
        pageX,
        pageY,
        clientX,
        clientY,
        isStart: false,
        isDragging: this.isDragging,
        isCompleted: true,
        movingType: 'mouseUp',
      };

      onDragging && onDragging(data);
      onDragEnd && onDragEnd(data);
      this.clear();
    });
  };

  clear() {
    this.previous = null;
    this.isDragging = false;
    this.isTicking = false;
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp);
    window.removeEventListener('mouseleave', this.onMouseUp);
  }

  render() {
    // 复制子组件，添加onMouseDown事件
    const { children } = this.props;
    const bindMousDownEvent = (children: any): any => {
      if (!children) return children;
      // 仅当是DOM子节点，才绑定mousedown事件
      if (children.type && typeof children.type === 'string') {
        return React.cloneElement(children as any, {
          onMouseDown: this.onMouseDown,
        });
      }
      // 非DOM子节点，往下递归，直到第一个DOM子节点为止
      const newChildren = bindMousDownEvent(children.props.children);
      return React.cloneElement(children, children.props, newChildren);
    };
    return bindMousDownEvent(children);
  }
}
