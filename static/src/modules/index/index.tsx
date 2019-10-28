import React from 'react';
import ReactDOM from 'react-dom';
import Header from 'components/layout/header/header';
import Main from 'components/layout/main/main';
import Footer from 'components/layout/footer/footer';
import store from 'store/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.less';

function Index() {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Index />
    </Router>
  </Provider>,
  document.getElementById('root')
);
