import React, { CSSProperties, ReactElement, ReactNode, useMemo } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { COLOR, SIZE } from '@/lib/scripts/const';
import _ from 'lodash';
import { TextStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import { Flex, PressHighlight, PressOpacity, Text } from './index';
import { mergeElement } from '@/lib/scripts/utils';

export interface ButtonProps {
    block?: boolean; // 占满整行
    children?: ReactNode; // 内容插槽
    danger?: boolean; // 危险
    disabled?: boolean; // 禁用
    ghost?: boolean; // 幽灵按钮
    icon?: ReactElement; // 图标
    round?: boolean; // 圆形外观
    size?: 'mini' | 'small' | 'middle' | 'large'; // 尺寸
    style?: {
        wrapper?: ViewStyle; // 最外层样式
        button?: ViewStyle; // 按钮主体样式
        text?: TextStyle; // 文本样式
        icon?: CSSProperties; // 图标样式
    }; // 样式
    type?: 'primary' | 'text' | 'default'; // 类型
    onPress?: () => void; // 点击事件回调
}

// 按钮尺寸-字体大小映射表
enum labelSizeMap {
    large = SIZE.font_h2,
    middle = SIZE.font_h3,
    small = SIZE.font_basic,
    mini = SIZE.font_desc,
}

// 按钮尺寸-图标大小映射表
enum iconSizeMap {
    large = SIZE.icon_mini,
    middle = SIZE.icon_mini,
    small = SIZE.icon_tiny,
    mini = SIZE.icon_tiny,
}

export default function Button(props: ButtonProps) {
    const { round, type = 'default', size = 'middle', ghost, danger, block, disabled, icon, style, onPress } = props;
    const isPrimary = type === 'primary';
    const borderRadius = round ? SIZE[`button_height_${size}`] / 2 : SIZE.radius_middle; // 按钮圆角

    // 最外层样式
    const wrapperStyle = useMemo<any>(() => {
        return [styles.wrapper, disabled ? styles.disabled : {}, { width: block ? '100%' : 'auto', borderRadius }, style?.wrapper];
    }, [disabled, borderRadius, style]);

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
        const basicStyle = [styles.button, styles[`button_type_${type}`], { borderRadius, height: SIZE[`button_height_${size}`] }];
        if (danger) {
            basicStyle.push(styles[`button_danger_${type}`]);
        }
        if (ghost) {
            basicStyle.push(styles.button_ghost_default);
            if (danger) {
                basicStyle.push(styles.button_ghost_danger);
            } else if (isPrimary) {
                basicStyle.push(styles.button_ghost_primary);
            }
        }
        if (style?.button) {
            basicStyle.push(style?.button);
        }
        return basicStyle;
    }, [danger, ghost, size, type, borderRadius, style]);

    // 计算文本样式
    const textStyle: (TextStyle | undefined)[] = useMemo(() => {
        let color = ghost ? COLOR.white : COLOR.text_title;
        if (isPrimary || danger) {
            color = COLOR.white;
            if (ghost) {
                color = danger ? COLOR.danger : COLOR.primary;
            }
        }
        if (danger && !isPrimary) {
            color = COLOR.danger;
        }
        return [{ fontSize: labelSizeMap[size], color, textAlignVertical: 'center' }, style?.text];
    }, [ghost, isPrimary, danger, size, style]);

    // 图标样式
    const iconColor = useMemo(() => {
        let color = ghost ? COLOR.white : COLOR.icon_touchable;
        if (isPrimary || danger) {
            color = COLOR.white;
            if (ghost) {
                color = danger ? COLOR.danger : COLOR.primary;
            }
        }
        if (danger && !isPrimary) {
            color = COLOR.danger;
        }
        return color;
    }, [ghost, isPrimary, danger]);

    const renderIconAndText = (renderType: 'icon' | 'text') => {
        if (renderType === 'text') {
            return <Text style={StyleSheet.flatten(textStyle)}>{props?.children}</Text>;
        }
        // 图标
        return mergeElement(icon, { color: iconColor, size: iconSizeMap[size], style: { ...styles.icon, ...(style?.icon || {}) } });
    };

    const renderButton = () => {
        return (
            <Flex alignItems="center" justifyContent="center" style={StyleSheet.flatten(buttonStyle)}>
                {renderIconAndText('icon')}
                {_.isString(props?.children) ? renderIconAndText('text') : props?.children}
            </Flex>
        );
    };

    if (disabled) {
        return <View style={StyleSheet.flatten([...wrapperStyle, styles.disabled])}>{renderButton()}</View>;
    }

    switch (type) {
        case 'text':
            return (
                <PressOpacity style={wrapperStyle} onPress={onPress}>
                    {renderButton()}
                </PressOpacity>
            );
        default:
            return (
                <PressHighlight underlayColor={underlayStyle} style={wrapperStyle} onPress={onPress}>
                    {renderButton()}
                </PressHighlight>
            );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        overflow: 'hidden',
    },
    button: {
        borderColor: 'transparent',
        borderRadius: SIZE.radius_middle,
        borderWidth: SIZE.border_default,
        paddingHorizontal: SIZE.button_padding_horizontal,
        position: 'relative',
    },
    disabled: {
        opacity: COLOR.opacity_disabled_controller,
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
