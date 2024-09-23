import { View, StyleSheet, ViewStyle, Pressable } from 'react-native';
import { COLOR, SIZE } from '../scripts/const';
import { useNavigation } from '@react-navigation/native';
import { Flex, Icon, TextX } from './index';
import { IHeadProps } from '../_types/components';
import useStyle from '../hooks/useStyle';

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

    const handleGoBack = () => {
        if (onBack) {
            onBack();
        } else {
            navigation.goBack();
        }
    };

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
