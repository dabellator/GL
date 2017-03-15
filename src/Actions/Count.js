import { firebase } from '../Services/Firebase';

export function getCount (firstItem, secondItem) {
  return (dispatch) => {
    var snapshots = [firebase.database().ref(`/Counts/${firstItem}/${secondItem}`),
      firebase.database().ref(`/Counts/${secondItem}/${firstItem}`)];

    snapshots.forEach(snapshot => {
      snapshot.on('value', (snap) => {
        !snap.val() ? snapshot.set(0) : dispatch({type: 'GET_COUNT', item: snap.ref.parent.key, value: snap.val()});
      });
    })
  }
}

export function addToCount (vote, opponent) {
  let voteSnapshot = firebase.database().ref(`Counts/${vote}/${opponent}`);
  voteSnapshot.transaction((count) => {
    return ++count;
  });
};
