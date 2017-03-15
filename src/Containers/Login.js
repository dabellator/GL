import { connect } from 'react-redux';
import Login from '../Components/Login';
import { loginUser } from '../Actions/Auth';

function mapStateToProps (state) {
  return {
    isLoading: state.auth.loading
  };
}

function mapDispatchToProps (dispatch) {
  return {
    loginUser: (email, pass) => dispatch(loginUser(email, pass))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
