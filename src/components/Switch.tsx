import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { useMergedState } from '../hooks';
import useStyle from '../hooks/useStyle';
import { COLOR, SIZE } from '../scripts/const';
import { Flex, PressHighlight } from './index';

export interface ISwitchProps {
    defaultValue?: boolean; // 默认值
    disabled?: boolean; // 禁用
    size?: 'sm' | 'md'; // 尺寸
    value?: boolean; // 受控值,

    style?: {
        root?: StyleProp<ViewStyle>; // 根节点样式
    };

    onChange?: (value: boolean) => void; // 值变动事件回调
    onPress?: () => void; // 点击事件回调
}

export default function Switch(props: ISwitchProps) {
    const { size = 'md', style, disabled, onPress, onChange, value, defaultValue } = props;

    const [innerValue, handleChange] = useMergedState(false, {
        defaultValue,
        value,
        onChange,
    });

    // 激活样式
    const activeBodyStyle = useStyle<ViewStyle>({
        defaultStyle: [styles.body],
        extraStyle: [styles[`body_${size}`], innerValue ? styles.body_active : {}],
    });

    // 处理点击事件
    const handlePress = () => {
        if (disabled) {
            return;
        }
        handleChange(!innerValue);
        onPress?.();
    };

    return (
        <PressHighlight underlayColor="transparent" disabled={disabled} style={[styles.root, style?.root]} onPress={handlePress}>
            <Flex alignItems="center" style={activeBodyStyle}>
                <View style={[styles.handle, styles[`handle_${size}`]]} />
            </Flex>
        </PressHighlight>
    );
}

const handleMd = SIZE.switch_height_md - 2 * SIZE.switch_border_md;
const handleSm = SIZE.switch_height_sm - 2 * SIZE.switch_border_sm;

const styles = StyleSheet.create({
    root: {
        overflow: 'hidden',
        position: 'relative',
    },
    body: {
        alignItems: 'center',
        backgroundColor: COLOR.switch_close_background,
        borderColor: COLOR.switch_close_background,
        borderRadius: SIZE.switch_radius,
    },
    body_active: {
        backgroundColor: COLOR.primary,
        borderColor: COLOR.primary,
        justifyContent: 'flex-end',
    },
    body_sm: {
        borderWidth: SIZE.switch_border_sm,
        height: SIZE.switch_height_sm,
        width: SIZE.switch_width_sm,
    },
    body_md: {
        borderWidth: SIZE.switch_border_md,
        height: SIZE.switch_height_md,
        width: SIZE.switch_width_md,
    },
    handle: {
        backgroundColor: COLOR.white,
    },
    handle_sm: {
        borderRadius: handleSm,
        height: handleSm,
        width: handleSm,
    },
    handle_md: {
        borderRadius: handleMd,
        height: handleMd,
        width: handleMd,
    },
});
