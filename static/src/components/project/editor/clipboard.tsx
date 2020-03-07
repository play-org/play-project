import React from 'react';

interface IProps {}

export default function Clipboard(props: IProps) {
  console.log(props);
  const handleCopy = () => {
    const input = document.createElement('input');
    document.body.appendChild(input);
    input.setAttribute('value', '听说你想复制我');
    input.select();
    if (document.execCommand('copy')) {
      document.execCommand('copy');
      console.log('复制成功');
    }
    document.body.removeChild(input);
  };
  return (
    <div>
      <p>1</p>

      <button type="button" onClick={handleCopy}>
        复制
      </button>
    </div>
  );
}
