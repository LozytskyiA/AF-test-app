import {createAction} from 'typesafe-actions';

export const removeUser = createAction('REMOVE_USER')<number>();
export const likeUser = createAction('LIKE_USER')<number>();
export const unLikeUser = createAction('UNLIKE_USER')<number>();
