import { Pressable, StyleSheet, View } from 'react-native';
import { COLOR } from '../scripts/const';
import { IPressHighlightProps } from '../_types/components';

export default function PressHighlight(props: IPressHighlightProps) {
    const { underlayColor = COLOR.underlay_touchable, style, disabled, ...rest } = props;

    const renderContent = (pressed: boolean) => {
        return (
            <>
                <View style={StyleSheet.flatten([styles.overlay, { backgroundColor: pressed ? underlayColor : 'transparent' }])} />
                {props?.children}
            </>
        );
    };

    return (
        <Pressable
            disabled={disabled}
            style={StyleSheet.flatten([{ opacity: disabled ? COLOR.opacity_disabled_controller : 1 }, style])}
            {...rest}>
            {({ pressed }) => renderContent(pressed)}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    overlay: {
        bottom: 0,
        left: 0,
        pointerEvents: 'none',
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1,
    },
});
