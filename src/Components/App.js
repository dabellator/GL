import React from 'react';

class App extends React.Component {

  componentWillMount() {
    this.props.checkUser();
  }

  render () {
    return (
      <div className='App'>
        <h1 className='App-Greeting'>
          Choose One
        </h1>
        { this.props.children }
      </div>
    );
  }

}

export default App;
