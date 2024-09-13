import { ForwardedRef, forwardRef, useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, View, ViewStyle } from 'react-native';
import { COLOR, SIZE } from '@/lib/scripts/const';
import _ from 'lodash';
import { useMergedState } from '../hooks';
import Button from './Button';
import { Flex, Grabber, Icon, PressHighlight, TextBox } from '@/lib/components';
import useStyle from '@/lib/hooks/useStyle';
import { IPickerProps, IPickerRawValue, IPickerValue, PickerOption } from '@/lib/_types/.components';
import { ActionSheetRef, default as ActionSheetOrigin } from 'react-native-actions-sheet';
import { mergeRefs } from '@/lib/scripts/utils';

function Picker(props: IPickerProps, ref: ForwardedRef<ActionSheetRef>) {
    const {
        backCloseable = true,
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
        onOpen,
        onCancel,
        onChange,
    } = props;

    const localRef = useRef<ActionSheetRef>(null);

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

    // 选项节点样式
    const optionStyle = useStyle<ViewStyle>({
        defaultStyle: [styles.option],
        extraStyle: [style?.option],
    });

    // 选项节点样式
    const dividerStyle = useStyle<ViewStyle>({
        defaultStyle: [styles.divider],
        extraStyle: [style?.divider],
    });

    const [innerValue, handleChange] = useMergedState<IPickerValue>(multiple ? [] : undefined, {
        defaultValue,
        value,
    });
    const [valueCache, setValueCache] = useState<IPickerRawValue[]>(innerValue as IPickerRawValue[]);

    // 处理选项点击
    const handleOptionPress = (val: IPickerRawValue) => {
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

    // 多选模式下点击确定
    const handleConfirm = () => {
        handleChange(valueCache);
        onChange?.(valueCache);
    };

    // 处理取消按钮点击
    const handleCancel = () => {
        if (multiple) {
            setValueCache(innerValue as IPickerRawValue[]);
        }
        onCancel?.();
    };

    // 监听visible的变化
    useEffect(() => {
        const _ref = mergeRefs<ActionSheetRef>([ref, localRef]);
        if (visible && _ref) {
            _ref.current?.show();
        } else {
            _ref?.current?.hide();
        }
    }, [visible]);

    // 渲染选中图标
    const renderCheckIcon = (option: PickerOption) => {
        if ((multiple && valueCache?.includes(option.value)) || (!multiple && option?.value === innerValue)) {
            return checkIcon || <Icon name="check" color={COLOR.primary} size={SIZE.icon_xs} style={style?.checkIcon} />;
        }
        return null;
    };

    return (
        <ActionSheetOrigin
            ref={mergeRefs([ref, localRef])}
            containerStyle={rootStyle}
            enableRouterBackNavigation={backCloseable}
            closable={overlayClosable}
            onOpen={onOpen}
            onClose={onCancel}>
            {/* 头部 */}
            {title || multiple ? (
                <Flex alignItems="center" justifyContent="space-between" style={headerStyle}>
                    {/* 取消按钮 */}
                    <View style={styles.actionButton}>
                        <Button type="text" style={{ text: { color: COLOR.text_subtitle } }} onPress={handleCancel} {...cancelButtonProps}>
                            {cancelText}
                        </Button>
                    </View>
                    {/* 标题文本 */}
                    <Flex justifyContent="center" alignItems="center" grow={1}>
                        <TextBox size={SIZE.font_h2} weight={SIZE.weight_title}>
                            {title}
                        </TextBox>
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
                {options.map(option => {
                    return (
                        <PressHighlight disabled={option.disabled} onPress={() => handleOptionPress(option.value)} key={option.value}>
                            <Flex alignItems="center" justifyContent="space-between" style={optionStyle}>
                                <Flex alignItems="center" grow={1}>
                                    <Flex column shrink={0} rowGap={SIZE.space_xs}>
                                        <TextBox size={SIZE.font_h2} style={style?.title}>
                                            {option.title}
                                        </TextBox>
                                        <TextBox color={COLOR.text_desc} style={style?.subtitle}>
                                            {option.subtitle}
                                        </TextBox>
                                    </Flex>
                                    <Flex grow={1}>{option?.children}</Flex>
                                </Flex>
                                <Flex alignItems="center" justifyContent="flex-end" shrink={0}>
                                    {renderCheckIcon(option)}
                                </Flex>
                            </Flex>
                            <View style={dividerStyle}></View>
                        </PressHighlight>
                    );
                })}
            </ScrollView>

            <Grabber style={style?.grabber} />
        </ActionSheetOrigin>
    );
}

export default forwardRef(Picker);

const styles = StyleSheet.create({
    root: {
        backgroundColor: COLOR.white,
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
    option: {
        backgroundColor: COLOR.white,
        minHeight: SIZE.picker_item_height,
        paddingHorizontal: SIZE.space_xl,
        paddingVertical: SIZE.space_md,
    },
    divider: {
        borderBottomWidth: SIZE.border_default,
        borderColor: COLOR.border_default,
    },
});
