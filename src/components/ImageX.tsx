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
} from 'react-native';

export interface IImageXProps extends ImageProps {
    radius?: number;
    fallbackSource?: ImageSourcePropType;
    temporaryHeight?: number; // aspectRatio 还没算出前的临时高度
}

export default function ImageX(props: IImageXProps) {
    const {
        radius = 0,
        fallbackSource,
        style,
        source,
        onError,
        onLoad,
        width,
        height,
        resizeMode = 'cover',
        temporaryHeight = 200,
        ...rest
    } = props;

    const [hasError, setHasError] = useState(false);
    const [aspectRatio, setAspectRatio] = useState<number | undefined>(undefined);

    const bothUndefined = isUndefined(width) && isUndefined(height);

    /** source 变化时重置 */
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

    /** 自动计算宽高比 */
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

    /** 出错时显示 fallback */
    const imageSource = useMemo(() => {
        return hasError && fallbackSource ? fallbackSource : source;
    }, [hasError, source, fallbackSource]);

    /** 样式生成 */
    const imageStyle = useMemo<StyleProp<ImageStyle>>(() => {
        const s: ImageStyle = {
            borderRadius: radius,
        };

        if (!isUndefined(width)) s.width = width;
        if (!isUndefined(height)) s.height = height;

        // 宽高都没传
        if (bothUndefined) {
            s.width = '100%';

            if (!isUndefined(aspectRatio)) {
                s.aspectRatio = aspectRatio;
            } else {
                // ★ aspectRatio 未算出时使用临时高度，避免图片高度为 0
                s.height = temporaryHeight;
            }
        }

        return [s, style];
    }, [width, height, radius, style, bothUndefined, aspectRatio, temporaryHeight]);

    return <Image {...rest} source={imageSource} resizeMode={resizeMode} onError={handleError} onLoad={handleLoad} style={imageStyle} />;
}
