import { ReactNode, useState } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { COLOR, SIZE } from '../scripts/const';
import _ from 'lodash';
import { useMergedState } from '../hooks';
import { Flex, Icon, PressHighlight, TextX } from './index';
import useStyle from '../hooks/useStyle';
import { TextStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

export type ISelectorRawValue = number | string;
export type ISelectorValue = ISelectorRawValue | ISelectorRawValue[] | undefined;
export interface ISelectorOption {
    content?: ReactNode; // 内容插槽
    disabled?: boolean; // 禁用
    subtitle?: ReactNode; // 副标题
    title?: ReactNode; // 主文本
    value: ISelectorRawValue; // 选项值
}
export interface ISelectorProps {
    defaultValue?: ISelectorValue; // 默认值
    multiple?: boolean; // 多选
    options: ISelectorOption[]; // 选项
    value?: ISelectorValue; // 受控值

    style?: {
        active?: StyleProp<ViewStyle>; // 激活样式
        checkIcon?: StyleProp<TextStyle>; // 选中图标样式
        corner?: StyleProp<ViewStyle>; // 角落样式
        option?: StyleProp<ViewStyle>; // 选项样式
        root: StyleProp<ViewStyle>; // 根节点样式
        subtitle?: StyleProp<TextStyle>; // 副标题样式
        title?: StyleProp<TextStyle>; // 标题样式
    }; // 样式

    onChange?: (val: ISelectorValue) => void; // 值变动事件回调
}

export default function Selector(props: ISelectorProps) {
    const { defaultValue, multiple, options = [], style, value, onChange } = props;

    const [innerValue, handleChange] = useMergedState<ISelectorValue>(multiple ? [] : undefined, {
        defaultValue,
        value,
    });
    const [valueCache, setValueCache] = useState<ISelectorRawValue[]>(innerValue as ISelectorRawValue[]);

    // 选项节点样式
    const optionStyle = useStyle<ViewStyle>({
        defaultStyle: [styles.option],
        extraStyle: [style?.option],
    });

    // 勾选图标样式
    const checkIconStyle = useStyle<TextStyle>({
        defaultStyle: [styles.checkIcon],
        extraStyle: [style?.checkIcon],
    });

    // 激活背景样式
    const activeStyle = useStyle<ViewStyle>({
        defaultStyle: [styles.active],
        extraStyle: [style?.active],
    });

    // 角落节点样式
    const cornerStyle = useStyle<ViewStyle>({
        defaultStyle: [styles.corner],
        extraStyle: [style?.corner],
    });

    // 处理选项点击
    const handleOptionPress = (val: ISelectorRawValue) => {
        if (multiple) {
            if (_.isArray(valueCache)) {
                const newValue = valueCache?.includes(val) ? valueCache.filter(item => item !== val) : [...valueCache, val];
                setValueCache(newValue);
            } else {
                console.error('innerValue is not array');
                setValueCache([val]);
            }
        } else {
            handleChange(val);
            onChange?.(val);
        }
    };

    return (
        <Flex wrap="wrap" gap={SIZE.space_lg} style={style?.root}>
            {options.map(option => {
                const isActive = (multiple && valueCache?.includes(option.value)) || (!multiple && option?.value === innerValue);
                return (
                    <PressHighlight
                        disabled={option.disabled}
                        onPress={() => handleOptionPress(option.value)}
                        key={option.value}
                        style={[optionStyle, isActive ? activeStyle : {}]}>
                        <Flex alignItems="center" column rowGap={SIZE.space_xs}>
                            <TextX
                                size={SIZE.font_h5}
                                color={isActive ? COLOR.text_primary : COLOR.text_title}
                                numberOfLines={1}
                                style={style?.title}>
                                {option.title}
                            </TextX>
                            <TextX
                                size={SIZE.font_secondary}
                                color={COLOR.text_desc}
                                numberOfLines={1}
                                ellipsizeMode="tail"
                                style={style?.subtitle}>
                                {option.subtitle}
                            </TextX>
                            {option?.content}
                        </Flex>
                        {isActive ? (
                            <>
                                <View style={cornerStyle} />
                                <Icon
                                    name="check"
                                    size={SIZE.selector_icon_size}
                                    strokeWidth={SIZE.icon_stroke_xl}
                                    color={COLOR.white}
                                    style={checkIconStyle}
                                />
                            </>
                        ) : null}
                    </PressHighlight>
                );
            })}
        </Flex>
    );
}

const styles = StyleSheet.create({
    option: {
        backgroundColor: COLOR.selector_option_background,
        borderRadius: SIZE.radius_md,
        overflow: 'hidden',
        paddingHorizontal: SIZE.space_lg,
        paddingVertical: SIZE.space_md,
        position: 'relative',
    },
    active: {
        backgroundColor: COLOR.underlay_primary,
    },
    disabled: {
        opacity: COLOR.opacity_disabled_controller,
    },
    corner: {
        borderBottomColor: COLOR.primary,
        borderLeftColor: 'transparent',
        borderRightColor: COLOR.primary,
        borderTopColor: 'transparent',
        borderWidth: SIZE.selector_icon_size - 2,
        bottom: 0,
        height: 0,
        position: 'absolute',
        right: 0,
        width: 0,
    },
    checkIcon: {
        bottom: 0,
        position: 'absolute',
        right: 0,
    },
});
