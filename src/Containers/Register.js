import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Register from '../Components/Register';

import { createUser } from '../Actions/Auth';

/**
 * Cherry pick values out of the given state model and choose which
 * ones to pass to the contextual component.
 *
 * @param  {Object} state
 * @return {Object}
 */
function mapStateToProps (state) {
  return {
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    createUser
  }, dispatch);
}

/**
 * Create the smart component.
 */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
