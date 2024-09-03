import { isValidElement, ReactElement, ReactNode } from 'react';
import { ImageStyle, StyleSheet, ViewStyle } from 'react-native';
import { COLOR, SIZE } from '@/lib/scripts/const';
import Button from './Button';
import { Flex, Image, Text } from '@/lib/components';
import { ImageSourcePropType } from 'react-native/Libraries/Image/Image';
import { IButtonProps } from '@/lib/_types/.components';

export interface ErrorBlockProps {
    buttons?: IButtonProps[]; // 按钮列表
    fullscreen?: boolean; // 全屏显示
    image?: ReactElement | ImageSourcePropType; // 主图
    imageStyle?: ImageStyle; // 主图样式
    style?: ViewStyle; // 样式
    subtitle?: ReactNode | string; // 副标题
    title?: ReactNode | string; // 标题
}

export default function ErrorBlock(props: ErrorBlockProps) {
    const { title, subtitle, buttons, fullscreen, image, imageStyle = {}, style } = props;
    const imageWidth = fullscreen ? SIZE.error_block_fullscreen_icon_size : SIZE.error_block_icon_size;

    const renderIcon = () => {
        if (!image) {
            return null;
        }
        if (isValidElement(image)) {
            return image;
        }
        return (
            <Image
                source={image as ImageSourcePropType}
                width={imageWidth}
                height={imageWidth}
                style={StyleSheet.flatten([styles.image, imageStyle])}
            />
        );
    };

    return (
        <Flex justifyContent="center" alignItems="center" column style={StyleSheet.flatten([styles.wrapper, style])}>
            {/* 图标 */}
            {renderIcon()}

            {fullscreen ? (
                <>
                    <Text size={SIZE.font_h1} style={styles.title}>
                        {title}
                    </Text>
                    <Text size={SIZE.font_secondary} color={COLOR.text_desc} style={styles.subtitle}>
                        {subtitle}
                    </Text>
                </>
            ) : (
                <Text size={SIZE.font_h5} color={COLOR.text_desc} style={styles.title}>
                    {title}
                </Text>
            )}

            {buttons ? (
                <Flex columnGap={SIZE.space_lg}>
                    {buttons.map(({ children, ...rest }, index) => {
                        return (
                            <Button size="sm" key={index} {...rest}>
                                {children}
                            </Button>
                        );
                    })}
                </Flex>
            ) : null}
        </Flex>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        paddingHorizontal: SIZE.space_xl,
    },
    image: {
        marginBottom: SIZE.space_lg,
    },
    title: {
        marginBottom: SIZE.space_md,
    },
    subtitle: {
        marginBottom: SIZE.space_2xl,
    },
});
