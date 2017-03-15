import React from 'react';
import { browserHistory } from 'react-router';

class Login extends React.Component {

  constructor (props, context) {
    super(props, context);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      email: '',
      password: ''
    };
  }

  handleLogin () {
    if (this.props.loginUser) {
      this.props.loginUser(
        this.state.email,
        this.state.password
      );
    }
  }

  handleChange(e) {
    this.setState({[e.target.type]: e.target.value});
  }

  redirect() {
    browserHistory.push('/register');
  }

  render () {
    return (
      <div>
        <div className='Login'>
          { this.props.isLoading ? 'Logging in...' : null }
          <input type='email' value={this.state.email} onChange={this.handleChange} placeholder='E-Mail Address' />
          <input type='password' value={this.state.password} onChange={this.handleChange} placeholder='Password' />
          <button
            onClick={this.handleLogin}
            disabled={this.props.isLoading}>
              Login
          </button>
        </div>
        <div className='redirect'>
          No Account?
          <button onClick={this.redirect}>Register</button>
        </div>
      </div>
    );
  }
}

export default Login;
