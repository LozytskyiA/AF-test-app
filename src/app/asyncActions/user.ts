import {AnyAction} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {createAsyncAction} from 'typesafe-actions';

import {fetchUser, TUser} from '../API';
import {RootState} from '../store';

export const fetchUserAsync = createAsyncAction('FETCH_USER_REQUEST', 'FETCH_USER_SUCCESS', 'FETCH_USER_FAILURE')<
    undefined,
    {user: TUser}
>();

export const fetchUserThunk =
    (userId: number): ThunkAction<void, RootState, unknown, AnyAction> =>
    async dispatch => {
        dispatch(fetchUserAsync.request());
        const response = await fetchUser(userId);
        dispatch(fetchUserAsync.success({user: response.data}));
    };
