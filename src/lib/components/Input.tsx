import React, { forwardRef, ReactNode, useImperativeHandle, useMemo, useRef } from 'react';
import { StyleSheet, TextInput, TextInputProps, ViewStyle } from 'react-native';
import { COLOR, SIZE } from '@/lib/scripts/const';
import _ from 'lodash';
import { useMergedState, useToggle } from '../hooks';
import { Flex, Icon, Text } from './index';
import PressHighlight from '@/lib/components/PressHighlight';
export type InputValueType = string | undefined;

export interface InputProProps extends Omit<TextInputProps, 'onChange'> {
    allowClear?: boolean; // 允许清空输入
    bordered?: boolean; // 显示边框
    disabled?: boolean; // 禁用
    prefix?: ReactNode | string; // 前缀
    round?: boolean; // 圆形外观
    size?: 'small' | 'middle' | 'large'; // 尺寸
    style?: ViewStyle; // 样式
    suffix?: ReactNode | string; // 后缀
    type?: 'password' | 'search'; // 预设类型
    onChange?: (val: InputValueType) => void; // 值变动事件回调
}

const defaultProps: Partial<TextInputProps> = {
    autoCapitalize: 'none',
    autoComplete: 'off',
    autoCorrect: false,
    cursorColor: COLOR.primary,
    maxLength: 100,
    placeholderTextColor: COLOR.text_placeholder,
};

function Input(props: InputProProps, ref?: React.Ref<unknown>) {
    const {
        allowClear,
        bordered = true,
        defaultValue,
        disabled,
        prefix,
        round,
        size = 'middle',
        style,
        suffix,
        type,
        value,
        onChange,
        ...rest
    } = props;

    const inputRef = useRef<any>(null);
    const [previewIcon, nodeIndex] = useToggle([
        <Icon name="eye-off" size={SIZE.icon_mini} color={COLOR.icon_touchable} />,
        <Icon name="eye" size={SIZE.icon_mini} color={COLOR.icon_touchable} />,
    ]);
    const [innerValue, handleChange] = useMergedState(undefined, {
        defaultValue,
        value,
        onChange,
    });
    const showClearIcon = useMemo(() => {
        if (disabled || !allowClear) {
            return false;
        }
        return innerValue && innerValue.length > 0;
    }, [innerValue, disabled, allowClear]);
    const isPasswordInput = useMemo(() => {
        return type === 'password';
    }, [type]);
    const isSearchInput = useMemo(() => {
        return type === 'search';
    }, [type]);

    // 处理清空按钮点击
    const handleClearPress = () => {
        inputRef?.current?.clear();
        inputRef?.current?.focus();
        handleChange('');
    };

    // 处理键入
    const handleInputChange = (val: any) => {
        handleChange(val.nativeEvent.text);
    };

    // 暴露内部方法
    useImperativeHandle(ref, () => ({
        focus: () => {
            inputRef?.current?.focus();
        },
        blur: () => {
            inputRef?.current?.blur();
        },
        clear: () => {
            inputRef?.current?.clear();
        },
        isFocused: () => {
            inputRef?.current?.isFocused();
        },
    }));

    // 渲染前后缀
    const renderPrefixSuffix = (content: ReactNode | string) => {
        if (_.isString(content)) {
            return (
                <Text style={StyleSheet.flatten([styles[`input_${size}`], { lineHeight: SIZE[`input_height_${size}`] }])}>{content}</Text>
            );
        }
        return content;
    };

    return (
        <Flex
            block
            alignItems="center"
            columnGap={SIZE.space_middle}
            style={StyleSheet.flatten([
                styles.wrapper,
                bordered ? styles.inputBorder : {},
                round ? styles[`round_${size}`] : {},
                disabled ? styles.disabled : {},
                style,
            ])}>
            {isSearchInput ? <Icon name="search" size={SIZE.icon_mini} color={COLOR.icon_touchable} /> : renderPrefixSuffix(prefix)}
            <TextInput
                ref={inputRef}
                secureTextEntry={isPasswordInput && nodeIndex === 0}
                style={StyleSheet.flatten([
                    styles.input,
                    styles[`input_${size}`],
                    { color: disabled ? COLOR.text_desc : COLOR.text_title },
                ])}
                {...defaultProps}
                {...rest}
                value={innerValue}
                onChange={handleInputChange}
            />

            {showClearIcon ? (
                <PressHighlight onPress={handleClearPress}>
                    <Icon name="x-circle" size={SIZE.icon_mini} color={COLOR.icon_touchable} />
                </PressHighlight>
            ) : null}

            {renderPrefixSuffix(suffix)}
            {isPasswordInput ? previewIcon : null}
        </Flex>
    );
}

export default forwardRef(Input);

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: COLOR.white,
        paddingHorizontal: SIZE.space_large,
        position: 'relative',
    },
    input: {
        flexGrow: 1,
        flexShrink: 1,
        margin: 0,
        padding: 0,
    },
    inputBorder: {
        borderColor: COLOR.border_controller,
        borderRadius: SIZE.radius_middle,
        borderWidth: SIZE.border_default,
    },
    input_small: {
        fontSize: SIZE.font_desc,
        height: SIZE.input_height_small,
    },
    input_middle: {
        fontSize: SIZE.font_h4,
        height: SIZE.input_height_middle,
    },
    input_large: {
        fontSize: SIZE.font_h2,
        height: SIZE.input_height_large,
    },
    round_small: {
        borderRadius: SIZE.input_height_small / 2,
        paddingHorizontal: SIZE.space_ultra,
    },
    round_middle: {
        borderRadius: SIZE.input_height_middle / 2,
        paddingHorizontal: SIZE.space_ultra,
    },
    round_large: {
        borderRadius: SIZE.input_height_large / 2,
        paddingHorizontal: SIZE.space_ultra,
    },
    disabled: {
        backgroundColor: COLOR.bg_disabled,
        borderColor: COLOR.border_disabled,
        pointerEvents: 'none',
    },
});
