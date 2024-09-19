import { View } from 'react-native';
import { IFlexProps } from '@/lib/_types/.components';
import useStyle from '@/lib/hooks/useStyle';

export default function Flex(props: IFlexProps) {
    const {
        alignItems = 'flex-start',
        alignSelf = 'auto',
        block,
        column,
        columnGap,
        gap,
        grow = 0,
        justifyContent = 'flex-start',
        rowGap,
        shrink = 1,
        style = {},
        wrap = 'nowrap',
        ...rest
    } = props;

    const rootStyle = useStyle({
        defaultStyle: [
            {
                display: 'flex',
                flexWrap: wrap,
                flexGrow: grow,
                flexShrink: shrink,
                width: block ? '100%' : 'auto',
                flexDirection: column ? 'column' : 'row',
                justifyContent,
                alignItems,
                alignSelf,
                rowGap,
                columnGap,
                gap,
            },
        ],
        extraStyle: [style],
    });

    return (
        <View {...rest} style={rootStyle}>
            {props?.children}
        </View>
    );
}
