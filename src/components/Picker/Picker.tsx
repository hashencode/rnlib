import { isArray } from 'lodash';
import { ReactNode, useEffect, useState } from 'react';
import { Dimensions, Pressable, ScrollView, StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useMergedState } from '../../hooks';
import useStyle from '../../hooks/useStyle.tsx';
import { COLOR, SIZE } from '../../scripts/const.ts';
import Button, { IButtonProps } from '../Button.tsx';
import { Flex, Grabber, Icon, IListItemProps, List, TextX } from '../index.tsx';

export type IPickerRawValue = number | string;
export type IPickerValue = IPickerRawValue | IPickerRawValue[] | undefined;
export interface IPickerOption extends IListItemProps {
    value: IPickerRawValue; // 选项值
}

export interface IPickerProps {
    backCloseable?: boolean;
    cancelButtonProps?: IButtonProps;
    cancelText?: string;
    checkIcon?: ReactNode;
    defaultValue?: IPickerValue;
    maxHeight?: number;
    multiple?: boolean;
    okButtonProps?: IButtonProps;
    okText?: string;
    options: IPickerOption[];
    overlayClosable?: boolean;
    title?: ReactNode;
    value?: IPickerValue;
    visible?: boolean;
    afterClose?: () => void;

    style?: {
        cancelButton?: StyleProp<ViewStyle>;
        cancelText?: StyleProp<TextStyle>;
        checkIcon?: StyleProp<TextStyle>;
        divider?: StyleProp<ViewStyle>;
        grabber?: StyleProp<ViewStyle>;
        header?: StyleProp<ViewStyle>;
        headerText?: StyleProp<TextStyle>;
        root: StyleProp<ViewStyle>;
    };

    onCancel?: () => void;
    onChange?: (val: IPickerValue) => void;
}

const ANIMATION_DURATION = 300;

export default function Picker(props: IPickerProps) {
    const {
        cancelText = '取消',
        okText = '确定',
        defaultValue,
        title,
        overlayClosable = true,
        maxHeight = 300,
        multiple,
        options = [],
        style,
        value,
        visible,
        checkIcon,
        cancelButtonProps,
        okButtonProps,
        onCancel,
        onChange,
        afterClose,
    } = props;

    const screenHeight = Dimensions.get('window').height;
    const translateY = useSharedValue(screenHeight);
    const opacity = useSharedValue(0);

    // 动画样式
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }],
        };
    });

    // 背景动画样式
    const bgAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
        };
    });

    // 动画效果
    useEffect(() => {
        if (visible) {
            // 进入动画
            translateY.value = withTiming(0, {
                duration: ANIMATION_DURATION,
                easing: Easing.out(Easing.cubic),
            });
            opacity.value = withTiming(1, {
                duration: ANIMATION_DURATION,
                easing: Easing.out(Easing.cubic),
            });
        } else if (opacity.value > 0) {
            // 退出动画
            translateY.value = withTiming(screenHeight, {
                duration: ANIMATION_DURATION,
                easing: Easing.in(Easing.cubic),
            });
            opacity.value = withTiming(0, {
                duration: ANIMATION_DURATION,
                easing: Easing.in(Easing.cubic),
            });

            // 动画完成后执行关闭回调
            setTimeout(() => {
                afterClose?.();
            }, ANIMATION_DURATION);
        }
    }, [visible]);

    // 根节点样式
    const rootStyle = useStyle<ViewStyle>({
        defaultStyle: [styles.root],
        extraStyle: [style?.root],
    });

    // 头部节点样式
    const headerStyle = useStyle<ViewStyle>({
        defaultStyle: [styles.header],
        extraStyle: [style?.header],
    });

    const [innerValue, handleChange] = useMergedState<IPickerValue>(multiple ? [] : undefined, {
        defaultValue,
        value,
    });
    const [valueCache, setValueCache] = useState<IPickerRawValue[]>(innerValue as IPickerRawValue[]);

    // 处理选项点击
    const handleOptionPress = (val: IPickerRawValue) => {
        if (multiple) {
            if (isArray(valueCache)) {
                const newValue = valueCache?.includes(val) ? valueCache.filter(item => item !== val) : [...valueCache, val];
                setValueCache(newValue);
            } else {
                console.error('innerValue is not array');
                setValueCache([val]);
            }
        } else {
            handleChange(val);
            onChange?.(val);
            onCancel?.();
        }
    };

    // 多选模式下点击确定
    const handleConfirm = () => {
        handleChange(valueCache);
        onChange?.(valueCache);
        onCancel?.();
    };

    // 处理取消按钮点击
    const handleCancel = () => {
        if (multiple) {
            setValueCache(innerValue as IPickerRawValue[]);
        }
        onCancel?.();
    };

    // 遮罩点击
    const handleOverlayPress = () => {
        if (overlayClosable) {
            handleCancel();
        }
    };

    // 格式化选项
    const formatOptions = options.map(option => {
        let extra = null;
        if ((multiple && valueCache?.includes(option.value)) || (!multiple && option?.value === innerValue)) {
            extra = checkIcon || <Icon name="check" color={COLOR.primary} size={SIZE.icon_xs} style={style?.checkIcon} />;
        }
        option.extra = extra;
        option.onPress = () => {
            handleOptionPress(option.value);
        };
        return option;
    });

    return (
        <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
            {/* 半透明遮罩 */}
            <Pressable onPress={handleOverlayPress} style={StyleSheet.absoluteFill}>
                <Animated.View
                    style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,0,0,0.5)' }, bgAnimatedStyle]}
                    pointerEvents="auto"
                />
            </Pressable>

            {/* Picker 内容 */}
            <Animated.View
                style={[
                    StyleSheet.absoluteFill,
                    animatedStyle,
                    {
                        top: 'auto',
                        zIndex: 98,
                    },
                ]}>
                <View style={rootStyle}>
                    {/* 头部 */}
                    {title || multiple ? (
                        <Flex alignItems="center" justifyContent="space-between" style={headerStyle}>
                            {/* 取消按钮 */}
                            <View style={styles.actionButton}>
                                <Button
                                    type="text"
                                    style={{ text: { color: COLOR.text_subtitle } }}
                                    onPress={handleCancel}
                                    {...cancelButtonProps}>
                                    {cancelText}
                                </Button>
                            </View>
                            {/* 标题文本 */}
                            <Flex justifyContent="center" alignItems="center" grow={1}>
                                <TextX size={SIZE.font_h2} weight={SIZE.weight_title}>
                                    {title}
                                </TextX>
                            </Flex>
                            {/*确定按钮*/}
                            <View style={styles.actionButton}>
                                <Button type="text" style={{ text: { color: COLOR.primary } }} onPress={handleConfirm} {...okButtonProps}>
                                    {okText}
                                </Button>
                            </View>
                        </Flex>
                    ) : null}

                    {/* 内容 */}
                    <ScrollView style={{ maxHeight: maxHeight }}>
                        <List
                            items={formatOptions}
                            style={{
                                root: style?.root,
                                divider: style?.divider,
                            }}
                        />
                    </ScrollView>
                </View>

                <Grabber style={style?.grabber} />
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: COLOR.white,
        borderTopLeftRadius: SIZE.radius_lg,
        borderTopRightRadius: SIZE.radius_lg,
        paddingBottom: SIZE.space_md,
    },
    header: {
        backgroundColor: COLOR.white,
        borderBottomWidth: SIZE.border_default,
        borderColor: COLOR.border_default,
        minHeight: SIZE.action_sheet_option_height,
        paddingHorizontal: SIZE.space_sm,
        paddingVertical: SIZE.space_md,
        position: 'relative',
    },
    actionButton: {
        flexShrink: 0,
    },
});
