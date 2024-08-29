import React, { ReactNode } from 'react';
import { ScrollView, StyleSheet, View, ViewStyle } from 'react-native';
import { COLOR, SIZE } from '@/lib/scripts/const';
import _ from 'lodash';
import { Flex, Grabber, Overlay, PressHighlight, Separator, Text } from './index';

export type ActionSheetOptionValue = string | number;

export interface ActionSheetOption {
    content?: ReactNode; // 内容插槽
    danger?: boolean; // 危险选项
    desc?: string; // 描述文本
    disabled?: boolean; // 禁用
    title: string; // 主文本
    value: ActionSheetOptionValue; // 选项值
}

export interface ActionSheetProps {
    backCloseable?: boolean; // 允许返回操作关闭
    header?: ReactNode | string; // 头部插槽
    overlayClosable?: boolean; // 允许点击蒙层关闭
    maxHeight?: number; // 最大高度
    options: ActionSheetOption[]; // 选项
    showCancelButton?: boolean; // 显示取消按钮
    style?: ViewStyle; // 样式
    visible?: boolean; // 显隐
    onCancel?: () => void; // 取消按钮点击事件回调
    onChange?: (val: ActionSheetOptionValue) => void; // 点击选项事件回调
}

export default function ActionSheet(props: ActionSheetProps) {
    const {
        options = [],
        showCancelButton = true,
        visible,
        header,
        overlayClosable = true,
        backCloseable = true,
        maxHeight = 300,
        style,
        onCancel,
        onChange,
    } = props;

    // 遮罩点击
    const handleOverlayPress = () => {
        overlayClosable && handleCancel();
    };

    // 返回操作回调
    const handleBackClose = () => {
        backCloseable && handleCancel();
    };

    // 处理选项点击
    const handleOptionPress = (val: ActionSheetOptionValue) => {
        onChange?.(val);
    };

    // 处理取消按钮点击
    const handleCancel = () => {
        onCancel?.();
    };

    return (
        <Overlay visible={visible} position="bottom" onPress={handleOverlayPress} onRequestClose={handleBackClose}>
            <View style={StyleSheet.flatten([styles.wrapper, style])}>
                {header ? (
                    <Flex alignItems="center" justifyContent="center" style={styles.header}>
                        {_.isString(header) ? (
                            <Text size={SIZE.font_h5} color={COLOR.text_desc}>
                                {header}
                            </Text>
                        ) : (
                            header
                        )}
                    </Flex>
                ) : null}

                <ScrollView style={{ maxHeight: maxHeight }}>
                    {options.map((item, index) => {
                        return (
                            <PressHighlight disabled={item.disabled} onPress={() => handleOptionPress(item.value)} key={index}>
                                <View style={StyleSheet.flatten([styles.option, item.disabled ? styles.disabled : {}])}>
                                    <Text size={SIZE.font_h2} color={item.danger ? COLOR.text_danger : COLOR.text_title}>
                                        {item?.title}
                                    </Text>
                                    <Text color={COLOR.text_desc}>{item?.desc}</Text>
                                    {item?.content}
                                </View>
                            </PressHighlight>
                        );
                    })}
                </ScrollView>

                {showCancelButton ? (
                    <>
                        <View style={styles.footerDivider} />
                        <PressHighlight onPress={handleCancel}>
                            <View style={StyleSheet.flatten([styles.option, { borderBottomWidth: 0 }])}>
                                <Text size={SIZE.font_h2}>取消</Text>
                            </View>
                        </PressHighlight>
                    </>
                ) : null}

                <Grabber />
            </View>
        </Overlay>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: COLOR.white,
        borderTopEndRadius: SIZE.radius_large,
        borderTopStartRadius: SIZE.radius_large,
        overflow: 'hidden',
        width: '100%',
    },
    header: {
        backgroundColor: COLOR.white,
        borderBottomWidth: SIZE.border_default,
        borderColor: COLOR.border_default,
        minHeight: SIZE.action_sheet_option_height,
        paddingHorizontal: SIZE.space_ultra,
        paddingVertical: SIZE.space_middle,
    },
    option: {
        alignItems: 'center',
        backgroundColor: COLOR.white,
        display: 'flex',
        justifyContent: 'center',
        minHeight: SIZE.action_sheet_option_height,
        paddingHorizontal: SIZE.space_ultra,
        paddingVertical: SIZE.space_middle,
        position: 'relative',
    },
    disabled: {
        opacity: COLOR.opacity_disabled_option,
    },
    footerDivider: {
        backgroundColor: COLOR.bg_page,
        height: SIZE.space_large,
    },
});
