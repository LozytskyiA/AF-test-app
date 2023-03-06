import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {NavigationFunctionComponent} from 'react-native-navigation';
import {Props} from 'react-native-navigation/lib/dist/src/adapters/TouchablePreview';
import {Provider} from 'react-redux';

import {store} from '../../app/store';
import UsersList from './components/UsersList';

const Home: NavigationFunctionComponent<Props> = props => (
    <Provider store={store}>
        <SafeAreaView style={styles.root}>
            <UsersList {...props} />
        </SafeAreaView>
    </Provider>
);

const styles = StyleSheet.create({root: {flex: 1}});

export default Home;
