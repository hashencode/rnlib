import { isArray } from 'lodash';
import { ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { useMergedState } from '../hooks';
import useStyle from '../hooks/useStyle';
import { COLOR, SIZE } from '../scripts/const';
import Button, { IButtonProps } from './Button';
import { Flex, IListItemProps, Icon, List, Overlay, TextX } from './index';

export type IPickerRawValue = number | string;
export type IPickerValue = IPickerRawValue | IPickerRawValue[] | undefined;
export interface IPickerOption extends IListItemProps {
    value: IPickerRawValue; // 选项值
}

export interface IPickerProps {
    backCloseable?: boolean; // 允许返回操作关闭
    cancelButtonProps?: IButtonProps; // 取消按钮属性
    cancelText?: string; // 取消按钮文案
    checkIcon?: ReactNode; // 自定义选中图标
    defaultValue?: IPickerValue; // 默认值
    maxHeight?: number; // 最大高度
    multiple?: boolean; // 多选
    okButtonProps?: IButtonProps; // 确定按钮属性
    okText?: string; // 确认按钮文案（多选）
    options: IPickerOption[]; // 选项
    overlayClosable?: boolean; // 允许点击蒙层关闭
    title?: ReactNode; // 头部标题插槽
    value?: IPickerValue; // 受控值
    visible?: boolean; // 显隐

    style?: {
        cancelButton?: StyleProp<ViewStyle>; // 取消按钮样式
        cancelText?: StyleProp<TextStyle>; // 取消按钮文本样式
        checkIcon?: StyleProp<TextStyle>; // 选中图标样式
        divider?: StyleProp<ViewStyle>; // 分割线样式
        grabber?: StyleProp<ViewStyle>; // 抓手样式
        header?: StyleProp<ViewStyle>; // 头部样式
        headerText?: StyleProp<TextStyle>; // 头部文本样式
        root: StyleProp<ViewStyle>; // 根节点样式
    }; // 样式

    onCancel?: () => void; // 取消按钮点击事件回调
    onChange?: (val: IPickerValue) => void; // 值变动事件回调
}

function Picker(props: IPickerProps) {
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
        onCancel,
        onChange,
    } = props;

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
    const { t } = useTranslation('rnlib');

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
        <Overlay visible={visible} onPress={handleOverlayPress} onRequestClose={() => backCloseable}>
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
                                {t(cancelText)}
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
                                {t(okText)}
                            </Button>
                        </View>
                    </Flex>
                ) : null}

                {/* 内容 */}
                <ScrollView style={{ maxHeight: maxHeight }}>
                    <List items={formatOptions} style={{ root: style?.root, divider: style?.divider }} />
                </ScrollView>
            </View>
        </Overlay>
    );
}

export default Picker;

const styles = StyleSheet.create({
    root: {
        bottom: 0,
        left: 0,
        position: 'absolute',
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
