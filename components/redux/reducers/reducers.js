import {combineReducers} from 'redux';
import {user} from './user';
import {users} from './users';

export default combineReducers({
  userState: user,
  usersState: users,
});
