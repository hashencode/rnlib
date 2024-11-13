import { View, StyleSheet, ViewStyle, Pressable, StyleProp, TextStyle } from 'react-native';
import { COLOR, SIZE } from '../scripts/const';
import { useNavigation } from '@react-navigation/native';
import { Flex, Icon, TextX } from './index';
import useStyle from '../hooks/useStyle';
import { ReactNode } from 'react';
import _ from 'lodash';

export interface IHeadProps {
    backIcon?: ReactNode; // 返回按钮图标
    backText?: ReactNode; // 返回按钮文本
    extra?: ReactNode; // 额外节点
    hideBack?: Boolean; // 隐藏返回按钮
    subtitle?: ReactNode; // 副标题
    title?: ReactNode; // 标题

    style?: {
        backIcon?: StyleProp<TextStyle>; // 返回图标样式
        backText?: StyleProp<TextStyle>; // 返回文本样式
        body?: StyleProp<ViewStyle>; // 主体节点样式
        root?: StyleProp<ViewStyle>; // 根节点样式
        subtitle?: StyleProp<TextStyle>; // 副标题样式
        title?: StyleProp<TextStyle>; // 标题样式
    }; // 样式

    onBack?: () => void; // 返回按钮点击事件回调
}

function Head(props: IHeadProps) {
    const { backText, backIcon, hideBack, title, subtitle, extra, style, onBack } = props;

    const navigation = useNavigation();

    // 根节点样式
    const rootStyle = useStyle<ViewStyle>({
        defaultStyle: [styles.root],
        extraStyle: [style?.root],
    });

    // 主体样式
    const bodyStyle = useStyle<ViewStyle>({
        defaultStyle: [styles.body],
        extraStyle: [style?.body],
    });

    const handleGoBack = _.throttle(() => {
        if (onBack) {
            onBack();
        } else {
            navigation.goBack();
        }
    }, 500);

    return (
        <Flex justifyContent="space-between" alignItems="center" block style={rootStyle}>
            {!hideBack ? (
                <Pressable onPress={handleGoBack} style={{ zIndex: 2 }}>
                    <Flex alignItems="center" gap={SIZE.space_sm}>
                        {backIcon || <Icon name="chevron-left" size={SIZE.icon_lg} style={style?.backIcon} />}
                        <TextX size={SIZE.font_h2} style={style?.backText}>
                            {backText}
                        </TextX>
                    </Flex>
                </Pressable>
            ) : null}

            <View style={bodyStyle}>
                <TextX size={SIZE.font_h2} weight={SIZE.weight_title} style={style?.title}>
                    {title}
                </TextX>
                <TextX size={SIZE.font_desc} style={style?.subtitle}>
                    {subtitle}
                </TextX>
            </View>

            <View>{extra}</View>
        </Flex>
    );
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: COLOR.white,
        height: SIZE.navigator_height,
        paddingHorizontal: SIZE.space_md,
    },
    body: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1,
    },
});

export default Head;
