import React from 'react';

class Register extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCreateProfile = this.handleCreateProfile.bind(this);
  }

  handleCreateProfile() {
    this.props.createUser(this.state.email, this.state.password);
  }

  handleChange(e) {
    this.setState({[e.target.type]: e.target.value});
  }

  render () {
    return (
      <div className='Login'>
        { this.props.isLoading ? 'Logging in...' : null }
        <input type='email' value={this.state.email} onChange={this.handleChange} placeholder='E-Mail Address' />
        <input type='password' value={this.state.password} onChange={this.handleChange} placeholder='Password' />
        <button
          onClick={this.handleCreateProfile}
          disabled={this.props.isLoading}>
            Register
        </button>
      </div>
    );
  }

}

export default Register;
