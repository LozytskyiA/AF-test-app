import {ActionType, createReducer} from 'typesafe-actions';
import {likeUser, removeUser, unLikeUser} from '../actions/users';
import {TUser} from '../API';
import {fetchUsersAsync} from '../asyncActions/users';

type TUsersState = {
    items: TUser[];
    likedUsers: number[];
    itemsLength: number;
    status: string;
};

const initialState: TUsersState = {
    items: [],
    likedUsers: [],
    itemsLength: 0,
    status: 'loading',
};

export type TUsersActions = ActionType<
    | typeof removeUser
    | typeof likeUser
    | typeof unLikeUser
    | typeof fetchUsersAsync.request
    | typeof fetchUsersAsync.success
>;

export const usersReducer = createReducer<TUsersState, TUsersActions>(initialState)
    .handleAction(removeUser, (state, action) => {
        const newItems = state.items.filter(item => item.id !== action.payload);
        return {...state, items: newItems, itemsLength: newItems.length};
    })
    .handleAction(likeUser, (state, action) => {
        const newLikedUsers = [...state.likedUsers, action.payload];
        return {...state, likedUsers: newLikedUsers};
    })
    .handleAction(unLikeUser, (state, action) => {
        const newLikedUsers = state.likedUsers.filter(id => id !== action.payload);
        return {...state, likedUsers: newLikedUsers};
    })
    .handleAction(fetchUsersAsync.request, state => ({...state, status: 'loading'}))
    .handleAction(fetchUsersAsync.success, (state, action) => ({
        ...state,
        status: 'idle',
        items: action.payload.users,
        itemsLength: action.payload.length,
    }));
