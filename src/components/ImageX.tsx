import { isUndefined } from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import {
    Image,
    ImageErrorEvent,
    ImageLoadEvent,
    ImageProps,
    ImageSourcePropType,
    ImageStyle,
    ImageURISource,
    StyleProp,
    StyleSheet,
} from 'react-native';

export interface IImageXProps extends ImageProps {
    radius?: number;
    fallbackSource?: ImageSourcePropType;
    temporaryHeight?: number; // aspectRatio 未算出前的临时高度
}

export default function ImageX(props: IImageXProps) {
    const { radius = 0, fallbackSource, style, source, onError, onLoad, resizeMode = 'cover', temporaryHeight = 200, ...rest } = props;

    const [hasError, setHasError] = useState(false);
    const [aspectRatio, setAspectRatio] = useState<number | undefined>(undefined);

    /** 从 style 中读取宽高 */
    const flatStyle = StyleSheet.flatten(style) || {};
    const styleWidth = flatStyle.width;
    const styleHeight = flatStyle.height;

    /** props + style 的最终宽高 */
    const finalWidth = props.width ?? styleWidth;
    const finalHeight = props.height ?? styleHeight;

    const bothUndefined = isUndefined(finalWidth) && isUndefined(finalHeight);

    /** source 变化重置 */
    useEffect(() => {
        setHasError(false);
        setAspectRatio(undefined);
    }, [source]);

    /** 图片加载错误 */
    const handleError = (ev: ImageErrorEvent) => {
        setHasError(true);
        onError?.(ev);
    };

    /** 图片加载成功 */
    const handleLoad = (ev: ImageLoadEvent) => {
        onLoad?.(ev);
    };

    /** 自动计算宽高比（仅在宽高都未指定时） */
    useEffect(() => {
        let cancelled = false;

        async function getSize() {
            if (!source || !bothUndefined) return;

            try {
                let w = 0,
                    h = 0;
                const src = source as ImageURISource;

                if (src?.uri) {
                    // 网络图
                    await new Promise<void>((resolve, reject) => {
                        Image.getSize(
                            src.uri!,
                            (width, height) => {
                                if (!cancelled) {
                                    w = width;
                                    h = height;
                                }
                                resolve();
                            },
                            err => reject(err),
                        );
                    });
                } else {
                    // 本地图
                    const local = Image.resolveAssetSource(source);
                    w = local?.width ?? 0;
                    h = local?.height ?? 0;
                }

                if (!cancelled && w > 0 && h > 0) {
                    setAspectRatio(w / h);
                }
            } catch (e) {
                console.error(e);
                if (!cancelled) {
                    setAspectRatio(undefined);
                }
            }
        }

        getSize();
        return () => {
            cancelled = true;
        };
    }, [source, bothUndefined]);

    /** 错误时 fallbackSource */
    const imageSource = useMemo(() => {
        return hasError && fallbackSource ? fallbackSource : source;
    }, [hasError, source, fallbackSource]);

    /** 样式合成 */
    const imageStyle = useMemo<StyleProp<ImageStyle>>(() => {
        const s: ImageStyle = {
            borderRadius: radius,
        };

        // 优先使用 props.width/height，其次 style 的宽高
        if (!isUndefined(finalWidth)) s.width = finalWidth;
        if (!isUndefined(finalHeight)) s.height = finalHeight;

        // 宽高都未指定，用 aspectRatio
        if (bothUndefined) {
            s.width = '100%';

            if (!isUndefined(aspectRatio)) {
                s.aspectRatio = aspectRatio;
            } else {
                s.height = temporaryHeight;
            }
        }

        return [s, style];
    }, [finalWidth, finalHeight, radius, style, bothUndefined, aspectRatio, temporaryHeight]);

    return <Image {...rest} source={imageSource} resizeMode={resizeMode} onError={handleError} onLoad={handleLoad} style={imageStyle} />;
}
