/**
 * @format
 */

import {Navigation} from 'react-native-navigation';
import {HOME} from './src/app/navigation';

Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
        root: {
            stack: {
                children: [
                    {
                        component: {
                            name: HOME,
                        },
                    },
                ],
            },
        },
    });
});
