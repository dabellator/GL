import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import App from '../Components/App';
import { checkUser } from '../Actions/Auth';

/**
 * Cherry pick values out of the given state model and choose which
 * ones to pass to the contextual component.
 *
 * @param  {Object} state
 * @return {Object}
 */
function mapStateToProps (state) {
  return {};
}

/**
 * Bind the store's dispatch() to action creators ahead of time to simplify
 * action dispatching and decouple state manipulation from the component.
 *
 * @param  {Function} dispatch
 * @return {Object}
 */
function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    checkUser
  }, dispatch);
}

/**
 * Create the smart component.
 */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
