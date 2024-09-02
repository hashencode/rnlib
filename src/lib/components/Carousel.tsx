import { ReactNode, useState } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { default as CarouselX } from 'react-native-reanimated-carousel';
import { LayoutChangeEvent } from 'react-native/Libraries/Types/CoreEventTypes';
import { TCarouselProps } from 'react-native-reanimated-carousel/src/types';
import PaginationDot from 'react-native-animated-pagination-dot';
import { SIZE } from '@/lib/scripts/const';
import { IDotContainerProps } from 'react-native-animated-pagination-dot/src';

export interface CarouselProps {
    dotConfig?: IDotContainerProps; // 指示器配置项
    dotStyle?: ViewStyle; // 指示器样式
    items: ReactNode[]; // 内容项
    itemsConfig?: TCarouselProps; // 内容配置项
    showDot?: boolean; // 是否显示指示器
    style?: ViewStyle; // 样式
}

export default function Carousel(props: CarouselProps) {
    const { dotConfig, itemsConfig, items, showDot, style, dotStyle } = props;

    const [carouselWidth, setCarouselWidth] = useState(1);
    const [currentPage, setCurrentPage] = useState(0);

    const handleWrapperLayout = (event: LayoutChangeEvent) => {
        setCarouselWidth(event.nativeEvent.layout.width);
    };

    return (
        <View style={StyleSheet.flatten([styles.wrapper, style])} onLayout={handleWrapperLayout}>
            <CarouselX
                {...itemsConfig}
                width={carouselWidth}
                data={items}
                onScrollEnd={index => setCurrentPage(index)}
                renderItem={({ item, index }) => (
                    <View key={index} style={styles.content}>
                        {item}
                    </View>
                )}
            />
            {showDot ? (
                <View style={StyleSheet.flatten([styles.dots, dotStyle])}>
                    <PaginationDot activeDotColor="white" curPage={currentPage} maxPage={items.length || 0} {...dotConfig} />
                </View>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'relative',
    },
    content: {
        flex: 1,
    },
    dots: {
        bottom: SIZE.space_small,
        position: 'absolute',
        right: SIZE.space_middle,
    },
});
