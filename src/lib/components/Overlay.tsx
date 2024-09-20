import { ReactNode, useEffect } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { COLOR, SIZE } from '../scripts/const';
import { useUpdateEffect } from 'ahooks';

export interface OverlayProps {
    afterDestroy?: () => void; // 蒙层销毁回调
    children?: ReactNode; // 插槽
    position?: 'middle' | 'bottom'; // 主容器样式
    backgroundColor?: string; // 底色
    visible?: boolean; // 显隐
    onPress?: () => void; // 点击蒙层回调
    onRequestClose?: () => void; // 请求关闭回调
}

function Overlay(props: OverlayProps) {
    const { visible, position = 'middle', backgroundColor = COLOR.bg_overlay, afterDestroy, onPress, onRequestClose } = props;

    // 关闭回调
    useUpdateEffect(() => {
        !visible && afterDestroy?.();
    }, [visible]);

    // 通过hooks调用的关闭回调
    useEffect(() => {
        return () => {
            visible && afterDestroy?.();
        };
    }, []);

    return (
        <Modal visible={visible} transparent={true} statusBarTranslucent={true} animationType="fade" onRequestClose={onRequestClose}>
            <Pressable onPress={() => onPress?.()} style={StyleSheet.flatten([styles.overlay, { backgroundColor }])} />
            <View style={StyleSheet.flatten([styles.content, styles[`position_${position}`]])}>{props.children}</View>
        </Modal>
    );
}

export default Overlay;

const styles = StyleSheet.create({
    overlay: {
        backgroundColor: COLOR.bg_overlay,
        height: '100%',
        left: 0,
        position: 'absolute',
        top: 0,
        width: '100%',
    },
    content: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        pointerEvents: 'box-none',
    },
    position_middle: {
        justifyContent: 'center',
        marginTop: -SIZE.navigator_height,
    },
    position_bottom: {
        justifyContent: 'flex-end',
    },
});
