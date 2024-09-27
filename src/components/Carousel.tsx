import { ReactNode, useState } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { default as CarouselX } from 'react-native-reanimated-carousel';
import { LayoutChangeEvent } from 'react-native/Libraries/Types/CoreEventTypes';
import PaginationDot from 'react-native-animated-pagination-dot';
import { SIZE } from '../scripts/const';
import useStyle from '../hooks/useStyle';
import { IDotContainerProps } from 'react-native-animated-pagination-dot/src';
import { TCarouselProps } from 'react-native-reanimated-carousel/src/types';

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
