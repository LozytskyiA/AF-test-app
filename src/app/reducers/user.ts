import {ActionType, createReducer} from 'typesafe-actions';
import {TUser} from '../API';
import {fetchUserAsync} from '../asyncActions/user';

type TUserState = {
    item: TUser;
    status: string;
};

const initialState: TUserState = {
    item: {
        age: 0,
        avatar: '',
        id: 0,
        name: '',
    },
    status: 'loading',
};

export type TUserActions = ActionType<typeof fetchUserAsync.request | typeof fetchUserAsync.success>;

export const userReducer = createReducer<TUserState, TUserActions>(initialState)
    .handleAction(fetchUserAsync.request, state => ({...state, status: 'loading'}))
    .handleAction(fetchUserAsync.success, (state, action) => ({
        ...state,
        status: 'idle',
        item: action.payload.user,
    }));
