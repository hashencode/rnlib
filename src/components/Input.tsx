import { forwardRef, ReactNode, Ref, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { Pressable, StyleProp, StyleSheet, TextInput, TextInputProps, ViewStyle } from 'react-native';
import { TextStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import { useMergedState } from '../hooks';
import useStyle from '../hooks/useStyle';
import { COLOR, SIZE } from '../scripts/const';
import { Flex, Icon, TextX } from './index';

export interface IInputProps extends Omit<TextInputProps, 'onChange' | 'style'> {
    allowClear?: boolean; // 允许清空输入
    bordered?: boolean; // 显示边框
    disabled?: boolean; // 禁用
    onChange?: (val?: string) => void; // 值变动事件回调
    password?: boolean; // 密码输入
    prefix?: ReactNode | string; // 前缀
    round?: boolean; // 圆形外观
    size?: 'lg' | 'md' | 'sm'; // 尺寸

    style?: {
        main?: StyleProp<TextStyle>; // 主体样式
        prefix?: StyleProp<TextStyle>; // 前缀样式
        root?: StyleProp<ViewStyle>; // 根节点样式
        suffix?: StyleProp<TextStyle>; // 后缀样式
    }; // 样式

    suffix?: ReactNode | string; // 后缀
}

export interface IInputRef {
    blur: () => void;
    clear: () => void;
    focus: () => void;
    isFocused: () => boolean | undefined;
}

const defaultProps: Partial<TextInputProps> = {
    autoCapitalize: 'none',
    autoComplete: 'off',
    autoCorrect: false,
    cursorColor: COLOR.primary,
    maxLength: 100,
    placeholderTextColor: COLOR.text_placeholder,
};

function Input(props: IInputProps, ref?: Ref<IInputRef>) {
    const {
        allowClear,
        bordered = true,
        defaultValue,
        disabled,
        onChange,
        password,
        prefix,
        round,
        size = 'md',
        style,
        suffix,
        value,
        ...rest
    } = props;

    const inputRef = useRef<TextInput>(null);
    const [showPasswords, setShowPasswords] = useState(false);

    const [innerValue, handleChange] = useMergedState(undefined, {
        defaultValue,
        onChange,
        value,
    });

    // 根节点样式
    const rootStyle = useStyle<ViewStyle>({
        defaultStyle: [styles.root],
        extraStyle: [
            bordered ? styles.inputBorder : undefined,
            round ? styles[`round_${size}`] : undefined,
            disabled ? styles.disabled : undefined,
            style?.root,
        ],
    });

    // 主输入框样式
    const mainStyle = useStyle<TextStyle>({
        defaultStyle: [styles.main, styles[`input_${size}`]],
        extraStyle: [style?.main],
    });

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
        blur: () => {
            inputRef?.current?.blur();
        },
        clear: () => {
            inputRef?.current?.clear();
        },
        focus: () => {
            inputRef?.current?.focus();
        },
        isFocused: () => {
            return inputRef?.current?.isFocused();
        },
    }));

    // 渲染前缀
    const renderPrefix = () => {
        if (prefix) {
            return <TextX style={[styles[`input_${size}`], { lineHeight: SIZE[`input_height_${size}`] }, style?.prefix]}>{prefix}</TextX>;
        }
        return null;
    };

    // 渲染后缀
    const renderSuffix = () => {
        if (suffix) {
            return <TextX style={[styles[`input_${size}`], { lineHeight: SIZE[`input_height_${size}`] }, style?.suffix]}>{suffix}</TextX>;
        }
        return null;
    };

    // 渲染关闭按钮
    const renderCloseIcon = useMemo(() => {
        if (disabled || !allowClear || !(innerValue && innerValue.length)) {
            return null;
        }
        return (
            <Pressable disabled={disabled} onPress={handleClearPress}>
                <Icon color={COLOR.icon_touchable} name="x-circle" size={SIZE.icon_xs} />
            </Pressable>
        );
    }, [innerValue, disabled, allowClear]);

    return (
        <Flex alignItems="center" block columnGap={SIZE.space_md} style={rootStyle}>
            {renderPrefix()}

            <TextInput
                ref={inputRef}
                secureTextEntry={password && !showPasswords}
                style={mainStyle}
                {...defaultProps}
                {...rest}
                onChange={handleInputChange}
                value={innerValue}
            />

            {renderCloseIcon}
            {renderSuffix()}
            {password ? (
                <Pressable onPress={() => setShowPasswords(!showPasswords)}>
                    <Icon color={COLOR.icon_touchable} name={showPasswords ? 'eye' : 'eye-off'} size={SIZE.icon_xs} />
                </Pressable>
            ) : null}
        </Flex>
    );
}

export default forwardRef(Input);

const styles = StyleSheet.create({
    disabled: {
        backgroundColor: COLOR.bg_disabled,
        borderColor: COLOR.border_disabled,
    },
    input_lg: {
        fontSize: SIZE.font_h2,
        height: SIZE.input_height_lg,
    },
    input_md: {
        fontSize: SIZE.font_h4,
        height: SIZE.input_height_md,
    },
    input_sm: {
        fontSize: SIZE.font_secondary,
        height: SIZE.input_height_sm,
    },
    inputBorder: {
        borderColor: COLOR.border_controller,
        borderRadius: SIZE.radius_md,
        borderWidth: SIZE.border_default,
    },
    main: {
        flexGrow: 1,
        flexShrink: 1,
        margin: 0,
        padding: 0,
    },
    root: {
        backgroundColor: COLOR.white,
        paddingHorizontal: SIZE.space_lg,
        position: 'relative',
    },
    round_lg: {
        borderRadius: SIZE.input_height_lg / 2,
        paddingHorizontal: SIZE.space_xl,
    },
    round_md: {
        borderRadius: SIZE.input_height_md / 2,
        paddingHorizontal: SIZE.space_xl,
    },
    round_sm: {
        borderRadius: SIZE.input_height_sm / 2,
        paddingHorizontal: SIZE.space_xl,
    },
});
