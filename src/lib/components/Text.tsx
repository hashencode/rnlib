import React, { ReactNode, useMemo } from 'react';
import { StyleSheet, Text as TextOrigin, TextProps as TextOriginProps } from 'react-native';
import { TextStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import { COLOR, SIZE } from '@/lib/scripts/const';

export interface TextProps extends TextOriginProps {
    allowEmpty?: boolean; // 允许为空时显示
    children?: ReactNode; // 插槽
    color?: string; // 颜色
    size?: number; // 字体大小
    weight?: TextStyle['fontWeight']; // 字重
    style?: TextStyle; // 样式
}

export default function Text(props: TextProps) {
    const { allowEmpty, style = {}, weight, size = SIZE.font_basic, color, ...rest } = props;

    const defaultStyle: TextStyle = useMemo(() => {
        let fontFamily = 'PingFang-SC-Regular';
        const fontWeight = weight || style.fontWeight || '400';
        switch (fontWeight) {
            case '500':
                fontFamily = 'PingFang-SC-Medium';
                break;
            case '600':
            case '700':
            case 'bold':
                fontFamily = 'PingFang-SC-Bold';
                break;
            case '800':
            case '900':
                fontFamily = 'PingFang-SC-Heavy';
                break;
        }
        // 根据字重设置不同的字体
        return {
            fontFamily,
            fontSize: size,
            color: color || COLOR.text_title,
            fontWeight,
            includeFontPadding: false,
        };
    }, [size, color, weight, style]);

    if (!allowEmpty && !props.children) {
        return null;
    }

    return (
        <TextOrigin style={StyleSheet.flatten([defaultStyle, style])} {...rest}>
            {props?.children}
        </TextOrigin>
    );
}
