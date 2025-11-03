import { isUndefined } from 'lodash';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
    Animated,
    Easing,
    Image,
    ImageErrorEvent,
    ImageLoadEvent,
    ImageProps,
    ImageSourcePropType,
    ImageStyle,
    ImageURISource,
    LayoutChangeEvent,
    StyleProp,
    View,
} from 'react-native';

export interface IImageXProps extends ImageProps {
    /** 圆角 */
    radius?: number;
    /** 加载失败时的备用图片 */
    fallbackSource?: ImageSourcePropType;
    /** 是否启用淡入动画 */
    enableFadeIn?: boolean;
}

export default function ImageX(props: IImageXProps) {
    const {
        radius = 0,
        fallbackSource,
        style,
        source,
        onError,
        onLoad,
        onLayout,
        width,
        height,
        resizeMode = 'cover',
        enableFadeIn = true,
        ...rest
    } = props;

    const [hasError, setHasError] = useState(false);
    const [aspectRatio, setAspectRatio] = useState<number | undefined>();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const isImageLoadedRef = useRef(false);

    // 使用 useMemo 优化性能
    const bothDimensionsUndefined = useMemo(() => isUndefined(width) && isUndefined(height), [width, height]);

    // 重置状态当 source 变化时
    useEffect(() => {
        setHasError(false);
        isImageLoadedRef.current = false;
        if (enableFadeIn) {
            fadeAnim.setValue(0);
        }
        // 重置 aspectRatio 以便重新计算
        setAspectRatio(undefined);
    }, [source, enableFadeIn, fadeAnim]);

    /** 处理图片加载错误 */
    const handleError = (ev: ImageErrorEvent) => {
        setHasError(true);
        isImageLoadedRef.current = false;
        onError?.(ev);
    };

    /** 图片加载完成后执行淡入动画 */
    const handleLoad = (ev: ImageLoadEvent) => {
        isImageLoadedRef.current = true;
        if (enableFadeIn) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
                easing: Easing.out(Easing.ease),
            }).start();
        }
        onLoad?.(ev);
    };

    /** 获取图片尺寸并计算宽高比 */
    useEffect(() => {
        let cancelled = false;

        async function fetchImageSize() {
            if (!source) return;

            // 如果宽高都已提供，不需要计算 aspectRatio
            if (!bothDimensionsUndefined) {
                setAspectRatio(undefined);
                return;
            }

            try {
                let imgWidth: number = 0,
                    imgHeight: number = 0;

                if ('uri' in (source as ImageURISource) && (source as ImageURISource).uri) {
                    // 网络图片
                    await new Promise<void>((resolve, reject) => {
                        Image.getSize(
                            (source as ImageURISource).uri as string,
                            (w, h) => {
                                if (!cancelled) {
                                    imgWidth = w;
                                    imgHeight = h;
                                    resolve();
                                }
                            },
                            err => {
                                reject(typeof err === 'string' ? new Error(err) : err);
                            },
                        );
                    });
                } else {
                    // 本地图片
                    const resolvedSource = Image.resolveAssetSource(source);
                    if (resolvedSource && resolvedSource.width > 0) {
                        imgWidth = resolvedSource.width;
                        imgHeight = resolvedSource.height;
                    } else {
                        console.error('Invalid local image source');
                    }
                }

                if (!cancelled && imgWidth > 0) {
                    setAspectRatio(imgWidth / imgHeight);
                }
            } catch (error) {
                console.warn('Failed to get image size:', error);
                if (!cancelled) {
                    setAspectRatio(undefined);
                }
            }
        }

        fetchImageSize();

        return () => {
            cancelled = true;
        };
    }, [source, bothDimensionsUndefined]); // 添加缺失的依赖

    /** 根据加载状态选择图片源 */
    const imageSource = useMemo(() => {
        return hasError && fallbackSource ? fallbackSource : source;
    }, [source, fallbackSource, hasError]);

    /** 合并样式 */
    const imageStyle: StyleProp<ImageStyle> = useMemo(() => {
        const baseStyle: ImageStyle = {
            borderRadius: radius,
        };

        if (!isUndefined(width)) baseStyle.width = width;
        if (!isUndefined(height)) baseStyle.height = height;
        if (!isUndefined(aspectRatio)) baseStyle.aspectRatio = aspectRatio;
        if (enableFadeIn) baseStyle.opacity = fadeAnim;

        return [baseStyle, style];
    }, [width, height, aspectRatio, radius, style, enableFadeIn, fadeAnim]);

    /** 判断是否需要包装器 */
    const needsWrapper = useMemo(() => {
        return bothDimensionsUndefined || (hasError && fallbackSource);
    }, [bothDimensionsUndefined, hasError, fallbackSource]);

    const handleLayout = useCallback(
        (event: LayoutChangeEvent) => {
            onLayout?.(event);
        },
        [onLayout],
    );

    const ImageComponent = (
        <Animated.Image
            {...rest}
            source={imageSource}
            onError={handleError}
            onLoad={handleLoad}
            resizeMode={resizeMode}
            style={imageStyle}
        />
    );

    if (needsWrapper) {
        return (
            <View
                style={[
                    {
                        borderRadius: radius,
                        overflow: 'hidden',
                        width: width ?? '100%',
                        height: height ?? undefined,
                    },
                    bothDimensionsUndefined && { minHeight: 1 },
                ]}
                onLayout={handleLayout}>
                {ImageComponent}
            </View>
        );
    }

    return ImageComponent;
}
