import React from 'react';
import ReactDOM from 'react-dom';
import Header from 'components/layout/header/header';
import Main from 'components/layout/main/main';
import Footer from 'components/layout/footer/footer';
import './app.less';

function App() {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
