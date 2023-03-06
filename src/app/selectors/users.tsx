import {RootState} from '../store';

export const getUsers = (state: RootState) => state.users.items;
export const getLikedUsers = (state: RootState) => state.users.likedUsers;
