import { useBackHandler } from '@react-native-community/hooks';
import { ReactNode, useEffect } from 'react';
import { Keyboard, Modal, Pressable, StyleProp, StyleSheet, useWindowDimensions, View, ViewStyle } from 'react-native';
import { useStyle } from '../hooks';
import { COLOR } from '../scripts/const';
import { useUpdateEffect } from 'ahooks';

export interface IOverlayProps {
    afterDestroy?: () => void; // 蒙层销毁回调
    children?: ReactNode; // 插槽
    backgroundColor?: string; // 底色
    visible?: boolean; // 是否显示

    onPress?: () => void; // 点击蒙层回调
    onRequestClose?: () => boolean; // 请求关闭回调

    style?: {
        root?: StyleProp<ViewStyle>; // 根节点样式
        content?: StyleProp<ViewStyle>; // 内容样式
    };
}

function Overlay(props: IOverlayProps) {
    const { visible, backgroundColor = COLOR.bg_overlay, afterDestroy, style, onPress, onRequestClose } = props;

    const { height, width } = useWindowDimensions();

    // 处理返回操作
    useBackHandler(() => {
        if (visible && onRequestClose) {
            return onRequestClose();
        }
        return false;
    });

    useEffect(() => {
        Keyboard.dismiss();
        return () => {
            Keyboard.dismiss();
        };
    }, []);

    // 关闭回调
    useUpdateEffect(() => {
        !visible && afterDestroy?.();
    }, [visible]);

    const contentStyle = useStyle<ViewStyle>({
        defaultStyle: [styles.content],
        extraStyle: [style?.content, { height, width }],
    });

    return (
        <Modal transparent animationType="fade" visible={visible}>
            <Pressable onPress={() => onPress?.()} style={[styles.overlay, { backgroundColor }]} />
            <View style={contentStyle}>{props.children}</View>
        </Modal>
    );
}

export default Overlay;

const styles = StyleSheet.create({
    content: {
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
