// import ReactDOM from 'react-dom';

// export default function useModal(child, container = document.body) {
//   const overlap = document.createElement('div');
//   const show = () => {
//     ReactDOM.createPortal(child, container);
//     ReactDOM.render(child as any, overlap);
//   };
//   const hide = () => {
//     ReactDOM.unmountComponentAtNode(overlap);
//   };
//   return [show, hide];
// }
