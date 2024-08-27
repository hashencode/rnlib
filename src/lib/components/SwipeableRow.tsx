import React, { useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { RectButton, SwipeableProps } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { COLOR, SIZE } from '@/lib/scripts/const';
import _ from 'lodash';
import { ListItemActions } from './ListItem';
import { Flex } from './index';

export interface SwipeableRowProps extends SwipeableProps {
    actions: ListItemActions[];
}

const defaultActionWidth = SIZE.list_action_width;

export default function SwipeableRow(props: SwipeableRowProps) {
    const { actions } = props;
    const swipeableRowRef = useRef<any>(null);

    const renderRightAction = ({ content, color, x, width = defaultActionWidth, onPress, progress }: any, index: number) => {
        const trans = progress.interpolate({
            inputRange: [0, 1],
            outputRange: [x, 0],
        });
        const handlePress = () => {
            onPress?.();
            close();
        };

        return (
            <Animated.View style={{ flexGrow: 1, flexShrink: 0, width, transform: [{ translateX: trans }] }} key={index}>
                <RectButton style={[styles.rightAction, { backgroundColor: color }]} onPress={handlePress}>
                    <Flex alignItems="center" justifyContent="center" style={{ width }}>
                        {content && _.isString(content) ? <Text style={styles.actionText}>{content}</Text> : content}
                    </Flex>
                </RectButton>
            </Animated.View>
        );
    };

    const renderRightActions = (
        progress: Animated.AnimatedInterpolation<number>,
        _dragAnimatedValue: Animated.AnimatedInterpolation<number>,
    ) => {
        const widthArray = actions.map(item => item?.width || defaultActionWidth);
        return (
            <View
                style={{
                    width: _.sum(widthArray),
                    flexDirection: 'row',
                }}>
                {actions.map(({ content, width, color = COLOR.gray }, index) => {
                    const x = _.sum(widthArray.slice(index));
                    return renderRightAction({ content, color, x, width, progress }, index);
                })}
            </View>
        );
    };

    const close = () => {
        swipeableRowRef?.current?.close();
    };

    return (
        <Swipeable
            ref={swipeableRowRef}
            friction={1.5}
            enableTrackpadTwoFingerGesture
            leftThreshold={30}
            rightThreshold={40}
            renderRightActions={renderRightActions}>
            {props?.children}
        </Swipeable>
    );
}

const styles = StyleSheet.create({
    rightAction: {
        alignItems: 'flex-start',
        flexGrow: 1,
        flexShrink: 0,
        justifyContent: 'center',
        width: 500,
    },
    actionText: {
        backgroundColor: 'transparent',
        color: COLOR.text_white,
        fontSize: SIZE.font_h4,
        padding: SIZE.space_large,
    },
});
