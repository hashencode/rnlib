import { useUpdateEffect } from 'ahooks';
import { ReactNode } from 'react';
import { Modal, Pressable, StyleProp, StyleSheet, useWindowDimensions, View, ViewStyle } from 'react-native';

import { useStyle } from '../hooks';
import { COLOR } from '../scripts/const';

export interface IOverlayProps {
    afterDestroy?: () => void; // 蒙层销毁回调
    backgroundColor?: string; // 底色
    children?: ReactNode; // 插槽
    onPress?: () => void; // 点击蒙层回调

    onRequestClose?: () => void; // 请求关闭回调

    style?: {
        content?: StyleProp<ViewStyle>; // 内容样式
        root?: StyleProp<ViewStyle>; // 根节点样式
    };
    visible?: boolean; // 显隐
}

function Overlay(props: IOverlayProps) {
    const { afterDestroy, backgroundColor = COLOR.bg_overlay, onPress, onRequestClose, style, visible } = props;

    const { height, width } = useWindowDimensions();

    // 关闭回调
    useUpdateEffect(() => {
        !visible && afterDestroy?.();
    }, [visible]);

    const contentStyle = useStyle<ViewStyle>({
        defaultStyle: [styles.content],
        extraStyle: [style?.content, { height, width }],
    });

    return (
        <Modal animationType="fade" onRequestClose={onRequestClose} style={style?.root} transparent={true} visible={visible}>
            <Pressable onPress={() => onPress?.()} style={[styles.overlay, { backgroundColor }]} />
            <View style={contentStyle}>{props.children}</View>
        </Modal>
    );
}

export default Overlay;

const styles = StyleSheet.create({
    content: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        pointerEvents: 'box-none',
    },
    overlay: {
        backgroundColor: COLOR.bg_overlay,
        height: '100%',
        left: 0,
        position: 'absolute',
        top: 0,
        width: '100%',
    },
});
