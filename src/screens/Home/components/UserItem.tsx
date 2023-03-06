import React, {useCallback} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {TUser} from '../../../app/API';
import {ACTIVE_OPACITY} from '../../../app/constants';
import {useAppSelector} from '../../../app/hooks';
import {IMAGES} from '../../../app/images';
import {getLikedUsers} from '../../../app/selectors/users';
import {ImagePlaceholder} from '../../../components/ImagePlaceholder';
import {COMMON_STYLES} from '../../../styles';

interface IProps {
    item: TUser;
    onCardPress: (userId: number) => void;
    onRemove?: (id: number) => void;
}

export function UserItem(props: IProps) {
    const {item, onCardPress, onRemove} = props;
    const {avatar, name, id, age} = item;

    const likedUsers = useAppSelector(getLikedUsers);
    const isLikedUser = likedUsers.includes(id);

    const handleRemove = useCallback(() => onRemove?.(item.id), [item, onRemove]);
    const handleCardPress = useCallback(() => onCardPress(item.id), [item, onCardPress]);

    const renderDescription = useCallback(
        () => (
            <View style={styles.text}>
                <Text>id: {id}</Text>
                <Text>Name: {name}</Text>
                <Text>Age: {age}</Text>
            </View>
        ),
        [age, id, name],
    );

    const renderImage = useCallback(
        () => (
            <View style={styles.imageContainer}>
                {avatar ? <Image style={styles.image} source={{uri: avatar}} /> : <ImagePlaceholder />}
            </View>
        ),
        [avatar],
    );

    const renderRemoveButton = useCallback(
        () => (
            <TouchableOpacity onPress={handleRemove} style={styles.removeIconWrapper}>
                <Text style={styles.removeIcon}>x</Text>
            </TouchableOpacity>
        ),
        [handleRemove],
    );

    const renderHeartImage = useCallback(
        () => isLikedUser && <Image style={styles.heart} source={isLikedUser ? IMAGES.heartRed : IMAGES.heartBlack} />,
        [isLikedUser],
    );

    const renderBody = useCallback(() => {
        return (
            <View style={styles.body}>
                {renderImage()}
                {renderHeartImage()}
                {renderDescription()}
                {renderRemoveButton()}
            </View>
        );
    }, [renderDescription, renderHeartImage, renderImage, renderRemoveButton]);

    const renderContainer = useCallback(() => {
        return <View style={styles.container}>{renderBody()}</View>;
    }, [renderBody]);

    return (
        <TouchableOpacity activeOpacity={ACTIVE_OPACITY} onPress={handleCardPress} style={styles.root}>
            {renderContainer()}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    root: {
        height: 150,
        width: '100%',
    },
    body: {
        ...COMMON_STYLES.pv_2,
        ...COMMON_STYLES.ph_1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
        borderWidth: 1,
        borderRadius: 16,
    },
    container: {
        ...COMMON_STYLES.ph_1,
        ...COMMON_STYLES.pv_1,
        height: '100%',
        width: '100%',
    },
    imageContainer: {
        ...COMMON_STYLES.ml_1,
        height: 100,
        width: 100,
        borderWidth: 1,
        borderRadius: 16,
    },
    image: {
        height: '100%',
        width: '100%',
        borderRadius: 16,
    },
    text: {
        ...COMMON_STYLES.ml_2,
    },
    removeIcon: {
        fontSize: 24,
    },
    removeIconWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    heart: {
        width: 32,
        height: 32,
    },
});
