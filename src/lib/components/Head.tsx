import { View, StyleSheet, Pressable, ViewStyle } from 'react-native';
import { SIZE } from '@/lib/scripts/const';
import { useNavigation } from '@react-navigation/native';
import _ from 'lodash';
import { Flex, Icon, TextBox } from '@/lib/components';
import { IHeadProps } from '@/lib/_types/.components';
import useStyle from '@/lib/hooks/useStyle';

function Head(props: IHeadProps) {
    const { backText, backIcon, title, subtitle, extra, style, onBack } = props;

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
            <Pressable onPress={handleGoBack} style={{ zIndex: 2 }}>
                <Flex alignItems="center" gap={SIZE.space_small}>
                    {_.isUndefined(backIcon) ? <Icon name="chevron-left" size={SIZE.icon_large} style={style?.backIcon} /> : backIcon}
                    <TextBox size={SIZE.font_h2} style={style?.backText}>
                        {backText}
                    </TextBox>
                </Flex>
            </Pressable>

            <View style={bodyStyle}>
                <TextBox size={SIZE.font_h2} weight={SIZE.weight_title} style={style?.title}>
                    {title}
                </TextBox>
                <TextBox size={SIZE.font_desc} style={style?.subtitle}>
                    {subtitle}
                </TextBox>
            </View>

            <View>{extra}</View>
        </Flex>
    );
}

const styles = StyleSheet.create({
    root: {
        height: SIZE.navigator_height,
        paddingHorizontal: SIZE.space_middle,
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
