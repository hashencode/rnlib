import { ReactNode, useRef } from 'react';
import { RectButton } from 'react-native-gesture-handler';
import ReanimatedSwipeable, { SwipeableMethods } from 'react-native-gesture-handler/ReanimatedSwipeable';
import { SwipeableProps } from 'react-native-gesture-handler/ReanimatedSwipeable';

import { COLOR, SIZE } from '../scripts/const';

export interface ISwipeableRowActionItem {
    backgroundColor?: string; // 背景色
    content?: ReactNode; // 内容插槽
    onPress?: () => void; // 点击回调函数

    width: number; // 操作按钮宽度
}

export interface ISwipeableRowProps extends SwipeableProps {
    leftActions?: ISwipeableRowActionItem[];
    rightActions?: ISwipeableRowActionItem[];
}

export default function SwipeableRow(props: ISwipeableRowProps) {
    const { children, leftActions, rightActions, ...rest } = props;
    const swipeableRow = useRef<SwipeableMethods>(null);

    const Action = (actionProps: { actions?: ISwipeableRowActionItem[] }) => {
        const { actions } = actionProps;
        if (!actions || actions?.length <= 0) {
            return null;
        }
        return (
            <>
                {actions.map((item, index) => {
                    const { backgroundColor = COLOR.bg_controller, content, onPress, width } = item;
                    return (
                        <RectButton
                            key={index}
                            onPress={() => {
                                swipeableRow.current!.close();
                                onPress?.();
                            }}
                            style={{
                                alignItems: 'center',
                                backgroundColor,
                                justifyContent: 'center',
                                width,
                            }}>
                            {content}
                        </RectButton>
                    );
                })}
            </>
        );
    };

    return (
        <ReanimatedSwipeable
            enableTrackpadTwoFingerGesture
            friction={1.5}
            overshootLeft={false}
            overshootRight={false}
            ref={swipeableRow}
            renderLeftActions={() => <Action actions={leftActions} />}
            renderRightActions={() => <Action actions={rightActions} />}
            {...rest}>
            {children}
        </ReanimatedSwipeable>
    );
}
