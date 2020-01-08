import React from 'react';

interface TestProps {}
interface TestState {
  count: number;
}
export default class Test extends React.Component<TestProps, TestState> {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  render() {
    return (
      <div>
        <div>{this.state.count}</div>
        <button
          type="button"
          onClick={() => {
            this.setState({
              count: 1,
            });
            this.setState({
              count: 2,
            });
            this.setState({
              count: 3,
            });
            this.setState({
              count: 4,
            });
          }}
        >
          点击
        </button>
      </div>
    );
  }
}
