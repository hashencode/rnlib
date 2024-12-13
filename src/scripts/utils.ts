import _ from 'lodash';
import { cloneElement, ForwardedRef, isValidElement, ReactElement, RefObject } from 'react';
import { Platform } from 'react-native';
import { ms } from 'react-native-size-matters';

export function isAndroid() {
    return Platform.OS === 'android';
}

// 克隆节点，设置部分默认属性
export function mergeElement(element?: ReactElement, defaultProps?: {}): null | ReactElement {
    if (isValidElement(element) && defaultProps) {
        return cloneElement(element, _.merge({}, defaultProps, element.props));
    } else if (element) {
        return element;
    }
    return null;
}

// 合并Ref
export function mergeRefs<T>(refs: Array<ForwardedRef<T> | null | RefObject<T> | undefined>): RefObject<T> {
    return refs.filter(ref => !!ref)[0] as RefObject<T>;
}

// 生成随机字符串
export function randomId() {
    let id = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i < 4; i++) {
        id += characters.charAt(Math.floor(Math.random() * 26));
    }
    const timestamp = new Date().getTime().toString().slice(-4);
    return `${id}${timestamp}`;
}

// 将秒时长转换成可读文本
export const convertSecondsDisplay = (ms: number) => {
    if (!ms || ms <= 0) {
        return '-';
    }

    // 计算总秒数
    const totalSeconds = Math.floor(ms);
    // 计算秒数
    const seconds = totalSeconds % 60;
    // 计算总分钟数
    const totalMinutes = Math.floor(totalSeconds / 60);
    // 计算分钟数
    const minutes = totalMinutes % 60;
    // 计算小时数
    const hours = Math.floor(totalMinutes / 60);

    // 根据条件生成格式化字符串
    let formattedTime = '';
    if (hours > 0) {
        formattedTime += String(hours).padStart(2, '0') + ':';
    }
    formattedTime += String(minutes).padStart(2, '0') + ':';
    formattedTime += String(seconds).padStart(2, '0');
    return formattedTime;
};

// 尺寸缩放
export const scale = (size: number) => {
    return ms(size, 0.1);
};
