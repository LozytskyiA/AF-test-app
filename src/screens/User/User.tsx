import React, {useCallback, useEffect, useState} from 'react';
import {Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {NavigationFunctionComponent} from 'react-native-navigation';
import {Props} from 'react-native-navigation/lib/dist/src/adapters/TouchablePreview';

import {likeUser, unLikeUser} from '../../app/actions/users';
import {fetchUser, TUser} from '../../app/API';
import {ACTIVE_OPACITY} from '../../app/constants';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {IMAGES} from '../../app/images';
import {getLikedUsers} from '../../app/selectors/users';
import {ImagePlaceholder} from '../../components/ImagePlaceholder/ImagePlaceholder';
import {Loader} from '../../components/Loader';
import {COMMON_STYLES} from '../../styles';

const User: NavigationFunctionComponent<Props & {userId: number}> = props => {
    const [user, setUser] = useState<TUser | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const likedUsers = useAppSelector(getLikedUsers);
    const dispatch = useAppDispatch();

    const isLikedUser = user && likedUsers.includes(user.id);

    const getUser = useCallback(async () => {
        setIsLoading(true);

        try {
            const {data} = await fetchUser(props.userId);
            setUser(data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [props.userId]);

    useEffect(() => {
        getUser();
    }, [getUser]);

    const handleLikeUser = useCallback(() => {
        dispatch(likeUser(user?.id as number));
    }, [dispatch, user?.id]);

    const handleUnLikeUser = useCallback(() => {
        dispatch(unLikeUser(user?.id as number));
    }, [dispatch, user?.id]);

    const renderImage = useCallback(
        () => (
            <View style={styles.imageContainer}>
                {user?.avatar ? <Image style={styles.image} source={{uri: user.avatar}} /> : <ImagePlaceholder />}
            </View>
        ),
        [user?.avatar],
    );

    const renderDescription = useCallback(
        () => (
            <View style={styles.text}>
                <Text>id: {user?.id}</Text>
                <Text>Name: {user?.name}</Text>
                <Text>Age: {user?.age}</Text>
            </View>
        ),
        [user?.id, user?.name, user?.age],
    );

    const renderHeartImage = () => (
        <TouchableOpacity
            activeOpacity={ACTIVE_OPACITY}
            onPress={isLikedUser ? handleUnLikeUser : handleLikeUser}
            style={styles.heartContainer}>
            <Image style={styles.heart} source={isLikedUser ? IMAGES.heartRed : IMAGES.heartBlack} />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.root}>
            {isLoading ? (
                <Loader />
            ) : (
                <View style={styles.container}>
                    {renderImage()}
                    {renderDescription()}
                    {renderHeartImage()}
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    container: {
        ...COMMON_STYLES.mh_2,
        ...COMMON_STYLES.mt_3,
        flexDirection: 'row',
    },
    imageContainer: {
        height: 200,
        flex: 1.5,
        borderWidth: 1,
        borderRadius: 16,
    },
    image: {
        height: '100%',
        width: '100%',
        borderRadius: 16,
    },
    text: {
        flex: 1,
        ...COMMON_STYLES.ml_2,
    },
    heartContainer: {
        position: 'absolute',
        bottom: -14,
        left: 0,
        width: 36,
        height: 36,
    },
    heart: {
        width: 36,
        height: 36,
        opacity: 0.8,
    },
});

export default User;
