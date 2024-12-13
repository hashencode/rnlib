import { ReactNode, useState } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import PaginationDot from 'react-native-animated-pagination-dot';
import { IDotContainerProps } from 'react-native-animated-pagination-dot/src';
import { default as CarouselX } from 'react-native-reanimated-carousel';
import { TCarouselProps } from 'react-native-reanimated-carousel/src/types';
import { LayoutChangeEvent } from 'react-native/Libraries/Types/CoreEventTypes';

import useStyle from '../hooks/useStyle';
import { SIZE } from '../scripts/const';

export interface ICarouselProps {
    dotConfig?: IDotContainerProps; // 指示器配置项
    height: ViewStyle['height']; // 高度
    items: ReactNode[]; // 内容项
    rootConfig?: TCarouselProps; // 内容配置项
    showDot?: boolean; // 是否显示指示器

    style?: {
        dotContainer?: StyleProp<ViewStyle>; // 指示器样式
        root?: StyleProp<ViewStyle>; // 根节点样式
    }; // 样式
}

export default function Carousel(props: ICarouselProps) {
    const { dotConfig, height, items, rootConfig, showDot, style } = props;

    const [carouselWidth, setCarouselWidth] = useState(1);
    const [currentPage, setCurrentPage] = useState(0);

    // 根节点样式
    const rootStyle = useStyle<ViewStyle>({
        defaultStyle: [styles.root],
        extraStyle: [style?.root, { height }],
    });

    // 点样式
    const dotContainerStyle = useStyle<ViewStyle>({
        defaultStyle: [styles.dotContainer],
        extraStyle: [style?.dotContainer],
    });

    const handleWrapperLayout = (event: LayoutChangeEvent) => {
        setCarouselWidth(event.nativeEvent.layout.width);
    };

    return (
        <View onLayout={handleWrapperLayout} style={rootStyle}>
            <CarouselX
                data={items}
                renderItem={({ index, item }) => (
                    <View key={index} style={styles.content}>
                        {item}
                    </View>
                )}
                width={carouselWidth}
                {...rootConfig}
                onScrollEnd={index => {
                    setCurrentPage(index);
                    rootConfig?.onScrollEnd?.(index);
                }}
            />
            {showDot ? (
                <View style={dotContainerStyle}>
                    <PaginationDot activeDotColor="white" curPage={currentPage} maxPage={items.length || 0} {...dotConfig} />
                </View>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    dotContainer: {
        bottom: SIZE.space_sm,
        position: 'absolute',
        right: SIZE.space_md,
    },
    root: {
        position: 'relative',
    },
});
