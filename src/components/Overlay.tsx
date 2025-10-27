import { ReactNode, useEffect, useState } from 'react';
import { Keyboard, Modal, Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { useStyle } from '../hooks';
import { COLOR } from '../scripts/const';

export interface IOverlayProps {
    children?: ReactNode;
    backgroundColor?: string;
    visible?: boolean;
    modal?: boolean;
    onPress?: () => void;
    onRequestClose?: () => boolean;
    style?: {
        root?: StyleProp<ViewStyle>;
        content?: StyleProp<ViewStyle>;
    };
}

function Overlay(props: IOverlayProps) {
    const { visible, backgroundColor = COLOR.bg_overlay, style, onPress, modal = true, children } = props;

    const [keyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const showSub = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
        const hideSub = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
        return () => {
            showSub.remove();
            hideSub.remove();
        };
    }, []);

    const contentStyle = useStyle<ViewStyle>({
        defaultStyle: [styles.content],
        extraStyle: [style?.content],
    });

    return (
        <Modal transparent animationType="fade" visible={visible} onRequestClose={props.onRequestClose} statusBarTranslucent={true}>
            <Pressable
                onPress={onPress}
                style={({ pressed }) => [{ backgroundColor }, StyleSheet.absoluteFill, modal && { opacity: pressed ? 0.9 : 1 }]}
                pointerEvents={modal ? 'auto' : 'none'}
            />
            <View style={contentStyle} pointerEvents="box-none">
                {children}
            </View>

            {/* 键盘弹出时添加底部间距 */}
            {keyboardVisible && <View style={{ height: 250 }} />}
        </Modal>
    );
}

export default Overlay;

const styles = StyleSheet.create({
    content: {
        height: '100%',
        pointerEvents: 'box-none',
        width: '100%',
    },
});
