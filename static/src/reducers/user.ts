import ACTIONS from 'constants/actions';

const initState = {
  username: '',
  birth: '',
};

export default function user(state = initState, action) {
  switch (action.type) {
    case ACTIONS.SET_USER_INFO:
      return;
  }
}
