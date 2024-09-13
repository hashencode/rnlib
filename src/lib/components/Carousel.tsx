import { useState } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { default as CarouselX } from 'react-native-reanimated-carousel';
import { LayoutChangeEvent } from 'react-native/Libraries/Types/CoreEventTypes';
import PaginationDot from 'react-native-animated-pagination-dot';
import { SIZE } from '@/lib/scripts/const';
import { ICarouselProps } from '@/lib/_types/.components';
import useStyle from '@/lib/hooks/useStyle';

export default function Carousel(props: ICarouselProps) {
    const { dotConfig, rootConfig, items, showDot, style, height } = props;

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
        <View style={rootStyle} onLayout={handleWrapperLayout}>
            <CarouselX
                width={carouselWidth}
                data={items}
                renderItem={({ item, index }) => (
                    <View key={index} style={styles.content}>
                        {item}
                    </View>
                )}
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
    root: {
        position: 'relative',
    },
    content: {
        flex: 1,
    },
    dotContainer: {
        bottom: SIZE.space_sm,
        position: 'absolute',
        right: SIZE.space_md,
    },
});
