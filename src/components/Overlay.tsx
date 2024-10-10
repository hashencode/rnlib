import { ReactNode, useEffect } from 'react';
import { Modal, Pressable, StyleProp, StyleSheet, useWindowDimensions, View, ViewStyle } from 'react-native';
import { COLOR } from '../scripts/const';
import { useUpdateEffect } from 'ahooks';
import { useStyle } from '../hooks';

export interface IOverlayProps {
    afterDestroy?: () => void; // 蒙层销毁回调
    children?: ReactNode; // 插槽
    backgroundColor?: string; // 底色
    visible?: boolean; // 显隐

    style?: {
        root?: StyleProp<ViewStyle>; // 根节点样式
        content?: StyleProp<ViewStyle>; // 内容样式
    };

    onPress?: () => void; // 点击蒙层回调
    onRequestClose?: () => void; // 请求关闭回调
}

function Overlay(props: IOverlayProps) {
    const { visible, backgroundColor = COLOR.bg_overlay, afterDestroy, style, onPress, onRequestClose } = props;

    const { height, width } = useWindowDimensions();

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

    const contentStyle = useStyle<ViewStyle>({
        defaultStyle: [styles.content],
        extraStyle: [style?.content, { height, width }],
    });

    return (
        <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={onRequestClose} style={style?.root}>
            <Pressable onPress={() => onPress?.()} style={[styles.overlay, { backgroundColor }]} />
            <View style={contentStyle}>{props.children}</View>
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
        justifyContent: 'center',
        pointerEvents: 'box-none',
    },
});
