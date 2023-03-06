import React from 'react';
import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';

import Home from '../screens/Home';
import User from '../screens/User';
import {store} from './store';

export const HOME = 'Home';
export const USERS_LIST = 'UsersList';
export const USER = 'User';

Navigation.registerComponent(HOME, () => Home);
Navigation.registerComponent(USER, () => User);

Home.options = {
    topBar: {
        visible: false,
    },
};

Navigation.registerComponent(
    USER,
    () => props =>
        (
            <Provider store={store}>
                <User {...props} />
            </Provider>
        ),
    () => User,
);
