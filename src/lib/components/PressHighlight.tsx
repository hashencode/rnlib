import { Pressable, StyleSheet, View } from 'react-native';
import { COLOR } from '@/lib/scripts/const';
import { IPressHighlightProps } from '@/lib/_types/.components';

export default function PressHighlight(props: IPressHighlightProps) {
    const { underlayColor = COLOR.underlay_touchable, style, ...rest } = props;

    const renderContent = (pressed: boolean) => {
        return (
            <>
                <View style={StyleSheet.flatten([styles.overlay, { backgroundColor: pressed ? underlayColor : 'transparent' }])} />
                {props?.children}
            </>
        );
    };

    return (
        <Pressable style={StyleSheet.flatten([styles.root, style])} {...rest}>
            {({ pressed }) => renderContent(pressed)}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    root: {
        position: 'relative',
        width: '100%',
    },
    overlay: {
        height: '100%',
        left: 0,
        pointerEvents: 'none',
        position: 'absolute',
        top: 0,
        width: '100%',
        zIndex: 1,
    },
});
