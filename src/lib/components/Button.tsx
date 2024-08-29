import React, { useMemo } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { COLOR, SIZE } from '@/lib/scripts/const';
import { TextStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import { Flex, PressHighlight, TextBox } from './index';
import { mergeElement } from '@/lib/scripts/utils';
import { IButtonProps } from '@/lib/_types/.components';
import { ButtonIconSize, ButtonLabelSize } from '@/lib/scripts/enum';
import useStyle from '@/lib/hooks/useStyle';

export default function Button(props: IButtonProps) {
    const { round, type = 'default', size = 'middle', ghost, danger, block, disabled, icon, children, style, onPress } = props;
    const isPrimary = type === 'primary';
    const borderRadius = round ? SIZE[`button_height_${size}`] / 2 : SIZE.radius_middle; // 按钮圆角

    // 根元素样式
    const rootStyle = useStyle<ViewStyle>({
        defaultStyle: [styles.root],
        extraStyle: [{ width: block ? '100%' : 'auto', borderRadius }, style?.root],
    });

    // 图标样式
    const iconStyle = useStyle<ViewStyle>({
        defaultStyle: [styles.icon],
        extraStyle: [style?.icon],
    });

    // 覆盖样式
    const underlayStyle = useMemo(() => {
        if (danger && !isPrimary) {
            return COLOR.underlay_danger;
        } else if (ghost && isPrimary) {
            return COLOR.underlay_primary;
        }
    }, [danger, isPrimary, ghost]);

    // 计算按钮样式
    const buttonStyle = useMemo(() => {
        const basicStyle = [styles.button, styles[`button_type_${type}`], { borderRadius, height: SIZE[`button_height_${size}`] }]; // 设置默认样式、高度、圆角
        if (danger) {
            basicStyle.push(styles[`button_danger_${type}`]); // 危险按钮基础样式
        }
        if (ghost) {
            basicStyle.push(styles.button_ghost_default); // 幽灵按钮透明背景、设置边框
            if (danger) {
                basicStyle.push(styles.button_ghost_danger); // 危险按钮设置边框色
            } else if (isPrimary) {
                basicStyle.push(styles.button_ghost_primary); // 主要按钮设置边框色
            }
        }
        if (style?.button) {
            basicStyle.push(style?.button);
        }
        return basicStyle;
    }, [danger, ghost, size, type, borderRadius, style]);

    // 计算文本、图标样式
    const textStyle: TextStyle = useMemo(() => {
        let color = ghost ? COLOR.white : COLOR.text_title;
        // 主按钮盒危险按钮因为有背景色，所以需要设置白色文本
        if (isPrimary || danger) {
            color = COLOR.white;
            if (ghost) {
                color = danger ? COLOR.danger : COLOR.primary; // 幽灵按钮没有背景色，需要设置成对应的颜色
            }
        }
        // 危险按钮需要设置文本颜色
        if (danger && !isPrimary) {
            color = COLOR.danger;
        }
        return { fontSize: ButtonLabelSize[size], color, textAlignVertical: 'center' };
    }, [ghost, isPrimary, danger, size, style]);

    // 图标节点
    const iconEl = useMemo(() => {
        return mergeElement(icon, { color: textStyle.color, size: ButtonIconSize[size], style: iconStyle });
    }, [icon, textStyle, size, iconStyle]);

    const renderButton = () => {
        return (
            <Flex alignItems="center" justifyContent="center" style={StyleSheet.flatten([buttonStyle, style?.button])}>
                {iconEl}
                <TextBox style={StyleSheet.flatten([textStyle, style?.text])}>{children}</TextBox>
            </Flex>
        );
    };

    return (
        <PressHighlight disabled={disabled} underlayColor={underlayStyle} onPress={onPress} style={rootStyle}>
            {renderButton()}
        </PressHighlight>
    );
}

const styles = StyleSheet.create({
    root: {
        overflow: 'hidden',
    },
    button: {
        borderColor: 'transparent',
        borderRadius: SIZE.radius_middle,
        borderWidth: SIZE.border_default,
        paddingHorizontal: SIZE.button_padding_horizontal,
        position: 'relative',
    },
    icon: {
        marginRight: SIZE.space_small,
    },
    // 类型-按钮
    button_type_default: {
        backgroundColor: COLOR.white,
        borderColor: COLOR.border_controller,
    },
    button_type_primary: {
        backgroundColor: COLOR.primary,
    },
    button_type_text: {},
    // 危险-按钮
    button_danger_default: {
        borderColor: COLOR.danger,
    },
    button_danger_primary: {
        backgroundColor: COLOR.danger,
        borderColor: COLOR.danger,
    },
    button_danger_text: {},
    // 幽灵按钮
    button_ghost_primary: {
        borderColor: COLOR.primary,
    },
    button_ghost_danger: {
        borderColor: COLOR.danger,
    },
    button_ghost_default: {
        backgroundColor: 'transparent',
        borderColor: COLOR.white,
    },
});
