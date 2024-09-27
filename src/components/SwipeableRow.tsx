import ReanimatedSwipeable, { SwipeableMethods } from 'react-native-gesture-handler/ReanimatedSwipeable';
import { RectButton } from 'react-native-gesture-handler';
import { COLOR, SIZE } from '../scripts/const';
import { ReactNode, useRef } from 'react';
import { SwipeableProps } from 'react-native-gesture-handler/ReanimatedSwipeable';

export interface ISwipeableRowActionItem {
    backgroundColor?: string; // 背景色
    content?: ReactNode; // 内容插槽
    width: number; // 操作按钮宽度

    onPress?: () => void; // 点击回调函数
}

export interface ISwipeableRowProps extends SwipeableProps {
    leftActions?: ISwipeableRowActionItem[];
    rightActions?: ISwipeableRowActionItem[];
}

export default function SwipeableRow(props: ISwipeableRowProps) {
    const { leftActions, rightActions, children, ...rest } = props;
    const swipeableRow = useRef<SwipeableMethods>(null);

    const Action = (actionProps: { actions?: ISwipeableRowActionItem[] }) => {
        const { actions } = actionProps;
        if (!actions || actions?.length <= 0) {
            return null;
        }
        return (
            <>
                {actions.map((item, index) => {
                    const { width, backgroundColor = COLOR.bg_controller, content, onPress } = item;
                    return (
                        <RectButton
                            key={index}
                            style={{
                                width,
                                backgroundColor,
                                paddingHorizontal: SIZE.space_md,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                            onPress={() => {
                                swipeableRow.current!.close();
                                onPress?.();
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
            ref={swipeableRow}
            friction={1.5}
            overshootRight={false}
            overshootLeft={false}
            enableTrackpadTwoFingerGesture
            renderLeftActions={() => <Action actions={leftActions} />}
            renderRightActions={() => <Action actions={rightActions} />}
            {...rest}>
            {children}
        </ReanimatedSwipeable>
    );
}
