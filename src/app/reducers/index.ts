import {combineReducers} from 'redux';
import {userReducer} from './user';
import {usersReducer} from './users';

export const reducers = combineReducers({
    users: usersReducer,
    user: userReducer,
});
