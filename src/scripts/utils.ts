import { Platform } from 'react-native';
import { cloneElement, ForwardedRef, isValidElement, ReactElement, RefObject } from 'react';
import _ from 'lodash';

export function isAndroid() {
    return Platform.OS === 'android';
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

// 克隆节点，设置部分默认属性
export function mergeElement(element?: ReactElement, defaultProps?: {}): ReactElement | null {
    if (isValidElement(element) && defaultProps) {
        return cloneElement(element, _.merge({}, defaultProps, element.props));
    } else if (element) {
        return element;
    }
    return null;
}

// 合并Ref
export function mergeRefs<T>(refs: Array<RefObject<T> | ForwardedRef<T> | undefined | null>): RefObject<T> {
    return refs.filter(ref => !!ref)[0] as RefObject<T>;
}
