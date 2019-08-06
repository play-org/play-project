import React from "react";
import ReactDOM from "react-dom";
import "./app.less";
import Header from "components/header/header";
import Main from "components/main/main";
import Footer from "components/footer/footer";
function App() {
  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
