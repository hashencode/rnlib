import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { COLOR, SIZE } from '@/lib/scripts/const';
import { useNavigation } from '@react-navigation/native';
import _ from 'lodash';
import { Flex, Icon, PressOpacity, Text } from './index';

export interface HeadProps {
    backButtonLabel?: ReactNode; // 返回按钮文本
    backgroundColor?: string; // 背景色
    children?: ReactNode; // 内容插槽
    extra?: ReactNode; // 额外元素
    lightMode?: boolean; // 明亮模式
    showBackButton?: boolean; // 显示返回按钮
    style?: {
        wrapper?: ViewStyle; // 最外层样式
    }; // 样式
    subtitle?: ReactNode; // 副标题
    title?: ReactNode; // 标题
    onBackButtonPress?: () => void; // 返回按钮点击事件回调
}

function Head(props: HeadProps) {
    const { backgroundColor, showBackButton = true, lightMode, title, subtitle, extra, backButtonLabel, style, onBackButtonPress } = props;

    const bg = backgroundColor || COLOR.white;
    const isLight = _.isUndefined(lightMode) ? !!backgroundColor : lightMode;
    const textColor = isLight ? COLOR.text_white : COLOR.text_title;

    const navigation = useNavigation();

    const handleGoBack = () => {
        if (onBackButtonPress) {
            onBackButtonPress();
        } else {
            navigation.goBack();
        }
    };

    return (
        <Flex
            justifyContent="space-between"
            alignItems="center"
            block
            style={StyleSheet.flatten([styles.wrapper, { backgroundColor: bg }, style?.wrapper])}>
            {showBackButton ? (
                <PressOpacity onPress={handleGoBack} style={{ zIndex: 2 }}>
                    <Flex alignItems="center">
                        <Icon name="chevron-left" size={SIZE.icon_large} color={COLOR[isLight ? 'white' : 'icon_default']} />
                        {_.isString(backButtonLabel) ? (
                            <Text size={SIZE.font_h2} color={textColor}>
                                {backButtonLabel}
                            </Text>
                        ) : (
                            backButtonLabel
                        )}
                    </Flex>
                </PressOpacity>
            ) : (
                <View />
            )}

            {title || subtitle ? (
                <View style={styles.center}>
                    {_.isString(title) ? (
                        <Text size={SIZE.font_h2} color={textColor} weight={SIZE.weight_title}>
                            {title}
                        </Text>
                    ) : (
                        title
                    )}
                    {_.isString(subtitle) ? (
                        <Text size={SIZE.font_desc} color={textColor}>
                            {subtitle}
                        </Text>
                    ) : (
                        subtitle
                    )}
                </View>
            ) : null}

            {extra ? <View>{extra}</View> : null}

            {props.children}
        </Flex>
    );
}

const styles = StyleSheet.create({
    center: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1,
    },
    wrapper: {
        height: SIZE.navigator_height,
        paddingLeft: SIZE.space_small,
        paddingRight: SIZE.space_large,
    },
    goBack: {
        width: SIZE.icon_small,
    },
});

export default Head;
