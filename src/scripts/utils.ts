import { merge } from 'lodash';
import { cloneElement, isValidElement, ReactElement } from 'react';
import { ms } from 'react-native-size-matters';

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
        return cloneElement(element, merge({}, defaultProps, element.props));
    } else if (element) {
        return element;
    }
    return null;
}

// 尺寸缩放
export const scale = (size: number) => {
    return ms(size, 0.1);
};
