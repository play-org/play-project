import React from 'react';
import ReactDOM from 'react-dom';
import Header from 'components/header/header';
import Main from 'components/main/main';
import Footer from 'components/footer/footer';
import './app.less';

function App() {
  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
