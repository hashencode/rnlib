import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Keyboard, ScrollView, StatusBar, TextInput } from 'react-native';

interface Props extends React.ComponentProps<typeof ScrollView> {
    additionalScrollHeight?: number;
}

const offsetY = 20;

const _KeyboardScrollView = ({ additionalScrollHeight, children, contentContainerStyle, ...props }: Props) => {
    const scrollViewRef = useRef<ScrollView>(null);
    const scrollPositionRef = useRef<number>(0);
    const scrollContentSizeRef = useRef<number>(0);
    const scrollViewSizeRef = useRef<number>(0);

    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
    const [additionalPadding, setAdditionalPadding] = useState(0);

    const scrollToPosition = useCallback((toPosition: number, animated?: boolean) => {
        scrollViewRef.current?.scrollTo({ animated: !!animated, y: toPosition });
        scrollPositionRef.current = toPosition;
    }, []);

    const additionalScroll = useMemo(() => additionalScrollHeight ?? 0, [additionalScrollHeight]);
    const androidStatusBarOffset = useMemo(() => StatusBar.currentHeight ?? 0, []);

    useEffect(() => {
        const didShowListener = Keyboard.addListener('keyboardDidShow', frames => {
            const keyboardY = frames.endCoordinates.screenY;

            const keyboardHeight = frames.endCoordinates.height + offsetY;
            setAdditionalPadding(keyboardHeight);

            setTimeout(() => {
                setIsKeyboardVisible(true);
            }, 100);

            const currentlyFocusedInput = TextInput.State.currentlyFocusedInput();
            const currentScrollY = scrollPositionRef.current;

            currentlyFocusedInput.measureInWindow((_x, y, _width, height) => {
                const endOfInputY = y + height + androidStatusBarOffset;
                const deltaToScroll = endOfInputY - keyboardY + offsetY;

                if (deltaToScroll < 0) {
                    return;
                }
                const scrollPositionTarget = currentScrollY + deltaToScroll + additionalScroll;
                scrollToPosition(scrollPositionTarget, true);
            });
        });

        const didHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setAdditionalPadding(0);
            setIsKeyboardVisible(false);
        });

        const willHideListener = Keyboard.addListener('keyboardWillHide', frames => {
            // iOS only, scroll back to initial position to avoid flickering
            const keyboardHeight = frames.endCoordinates.height;
            const currentScrollY = scrollPositionRef.current;

            /*
                  Added this early return to avoid a bug with react-navigation, where moving from a screen to another, this event was triggered twice
                  In any case, no need to scroll back if we are already at the top so this early return should be safe
                */
            if (currentScrollY <= 0) {
                return;
            }

            const scrollPositionTarget = currentScrollY - keyboardHeight;
            scrollToPosition(scrollPositionTarget, true);
        });

        return () => {
            didShowListener.remove();
            didHideListener.remove();
            willHideListener.remove();
        };
    }, [additionalScroll, androidStatusBarOffset, scrollToPosition]);

    return (
        <ScrollView
            contentContainerStyle={[contentContainerStyle, { paddingBottom: additionalPadding }]}
            keyboardShouldPersistTaps="handled"
            onContentSizeChange={(_width, height) => {
                const currentContentHeight = scrollContentSizeRef.current;
                const contentSizeDelta = height - currentContentHeight;
                scrollContentSizeRef.current = height;

                if (!isKeyboardVisible) {
                    return;
                }

                const currentScrollY = scrollPositionRef.current;
                const scrollPositionTarget = currentScrollY + contentSizeDelta;
                scrollToPosition(scrollPositionTarget, true);
            }}
            onLayout={event => {
                scrollViewSizeRef.current = event.nativeEvent.layout.height;
            }}
            onMomentumScrollEnd={event => {
                scrollPositionRef.current = event.nativeEvent.contentOffset.y;
            }}
            onScrollEndDrag={event => {
                scrollPositionRef.current = event.nativeEvent.contentOffset.y;
            }}
            ref={scrollViewRef}
            {...props}>
            {children}
        </ScrollView>
    );
};

export default _KeyboardScrollView;
