import { connect } from 'react-redux';
import GLPage from '../Components/GLPage';
import {addToCount, getCount} from '../Actions/Count';

/**
 * Cherry pick values out of the given state model and choose which
 * ones to pass to the contextual component.
 *
 * @param  {Object} state
 * @return {Object}
 */
function mapStateToProps (state) {
  return {
    itemCounts: state.count
  };
}

/**
 * Bind the store's dispatch() to action creators ahead of time to simplify
 * action dispatching and decouple state manipulation from the component.
 *
 * @param  {Function} dispatch
 * @return {Object}
 */
function mapDispatchToProps (dispatch) {
  return {
    addToCount: (vote, opponent) => {addToCount(vote, opponent)},
    getCount: (first, second) => {getCount(first, second)(dispatch)}
  };
}

/**
 * Create the smart component.
 */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GLPage);
