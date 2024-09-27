/**
 * 改造自 https://github.com/jeanregisser/react-native-slider
 */
import { PureComponent } from 'react';
import { Animated, StyleSheet, PanResponder, View, Easing, ViewStyle } from 'react-native';

const TRACK_SIZE = 3;
const THUMB_SIZE = 16;

export interface SliderProps {
    value?: number;
    disabled?: boolean;
    minimumValue?: number;
    maximumValue?: number;
    step?: number;
    minimumTrackTintColor?: string;
    maximumTrackTintColor?: string;
    thumbTintColor?: string;
    thumbTouchSize?: { width: number; height: number };
    onValueChange?: (value: number) => void;
    onSlidingStart?: (value: number) => void;
    onSlidingComplete?: (value: number) => void;
    style?: ViewStyle;
    trackStyle?: ViewStyle;
    thumbStyle?: ViewStyle;
    animateTransitions?: boolean;
}

export default class Slider extends PureComponent<SliderProps> {
    static defaultProps = {
        value: 0,
        minimumValue: 0,
        maximumValue: 1,
        step: 0,
        minimumTrackTintColor: '#3f3f3f',
        maximumTrackTintColor: '#b3b3b3',
        thumbTintColor: '#343434',
        thumbTouchSize: { width: 40, height: 40 },
    };

    state = {
        containerSize: { width: 0, height: 0 },
        trackSize: { width: 0, height: 0 },
        thumbSize: { width: 0, height: 0 },
        allMeasured: false,
        value: new Animated.Value(this.props.value || 0),
    };

    _panResponder: any;
    _previousLeft: number = 0;
    _containerSize = undefined;
    _trackSize = undefined;
    _thumbSize = undefined;

    constructor(props: SliderProps) {
        super(props);
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
            onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
            onPanResponderGrant: this._handlePanResponderGrant,
            onPanResponderMove: this._handlePanResponderMove,
            onPanResponderRelease: this._handlePanResponderEnd,
            onPanResponderTerminationRequest: this._handlePanResponderRequestEnd,
            onPanResponderTerminate: this._handlePanResponderEnd,
        });
    }

    componentDidUpdate(prevProps: SliderProps) {
        if (this.props.value !== prevProps.value) {
            if (this.props.animateTransitions) {
                this._setCurrentValueAnimated(this.props.value || 0);
            } else {
                this._setCurrentValue(this.props.value || 0);
            }
        }
    }

    render() {
        const {
            minimumValue,
            maximumValue,
            minimumTrackTintColor,
            maximumTrackTintColor,
            thumbTintColor,
            style,
            trackStyle,
            thumbStyle,
            ...otherProps
        } = this.props;
        const { value, containerSize, thumbSize, allMeasured } = this.state;
        const thumbLeft = value.interpolate({
            inputRange: [minimumValue || 0, maximumValue || 1],
            outputRange: [0, containerSize.width - thumbSize.width],
        });
        const minimumTrackWidth = value.interpolate({
            inputRange: [minimumValue || 0, maximumValue || 1],
            outputRange: [0, containerSize.width - thumbSize.width],
        });
        const valueVisibleStyle: ViewStyle = {};
        if (!allMeasured) {
            valueVisibleStyle.opacity = 0;
        }

        const minimumTrackStyle: ViewStyle = {
            position: 'absolute',
            width: Animated.add(minimumTrackWidth, thumbSize.width / 2),
            backgroundColor: minimumTrackTintColor,
            ...valueVisibleStyle,
        };

        const touchOverflowStyle = this._getTouchOverflowStyle();

        return (
            <View style={[styles.container, style]} onLayout={this._measureContainer} {...otherProps}>
                <View style={[{ backgroundColor: maximumTrackTintColor }, styles.track, trackStyle]} onLayout={this._measureTrack} />
                <Animated.View style={[styles.track, trackStyle, minimumTrackStyle]} />
                <Animated.View
                    style={[
                        { backgroundColor: thumbTintColor },
                        styles.thumb,
                        thumbStyle,
                        {
                            transform: [{ translateX: thumbLeft }, { translateY: 0 }],
                            ...valueVisibleStyle,
                        },
                    ]}
                    onLayout={this._measureThumb}
                />
                <View style={[styles.touchArea, touchOverflowStyle]} {...this._panResponder.panHandlers} />
            </View>
        );
    }

    _handleStartShouldSetPanResponder = (e: any): boolean => this._thumbHitTest(e);

    _handleMoveShouldSetPanResponder = (): boolean => false;

    _handlePanResponderGrant = (): void => {
        this._previousLeft = this._getThumbLeft(this._getCurrentValue());
        this._fireChangeEvent('onSlidingStart');
    };

    _handlePanResponderMove = (e: any, gestureState: any): void => {
        if (this.props.disabled) {
            return;
        }

        this._setCurrentValue(this._getValue(gestureState));
        this._fireChangeEvent('onValueChange');
    };

    _handlePanResponderRequestEnd = (): boolean => false;

    _handlePanResponderEnd = (e: any, gestureState: any): void => {
        if (this.props.disabled) {
            return;
        }

        this._setCurrentValue(this._getValue(gestureState));
        this._fireChangeEvent('onSlidingComplete');
    };

    _measureContainer = (x: any): void => {
        this._handleMeasure('containerSize', x);
    };

    _measureTrack = (x: any): void => {
        this._handleMeasure('trackSize', x);
    };

    _measureThumb = (x: any): void => {
        this._handleMeasure('thumbSize', x);
    };

    _handleMeasure = (name: string, x: any): void => {
        const { width, height } = x.nativeEvent.layout;
        const size = { width, height };

        const storeName = `_${name}`;
        // @ts-ignore
        const currentSize = this[storeName];
        if (currentSize && width === currentSize.width && height === currentSize.height) {
            return;
        }
        // @ts-ignore
        this[storeName] = size;

        if (this._containerSize && this._trackSize && this._thumbSize) {
            this.setState({
                containerSize: this._containerSize,
                trackSize: this._trackSize,
                thumbSize: this._thumbSize,
                allMeasured: true,
            });
        }
    };

    _getRatio = (value: number): number =>
        (value - (this.props.minimumValue || 0)) / ((this.props.maximumValue || 1) - (this.props.minimumValue || 0));

    _getThumbLeft = (value: number): number => {
        return this._getRatio(value) * (this.state.containerSize.width - this.state.thumbSize.width);
    };

    _getValue = (gestureState: any): number => {
        const length = this.state.containerSize.width - this.state.thumbSize.width;
        const thumbLeft = this._previousLeft + gestureState.dx;

        const ratio = thumbLeft / length;

        if (this.props.step) {
            return Math.max(
                this.props.minimumValue || 0,
                Math.min(
                    this.props.maximumValue || 1,
                    (this.props.minimumValue || 0) +
                        Math.round((ratio * ((this.props.maximumValue || 1) - (this.props.minimumValue || 0))) / (this.props.step || 1)) *
                            (this.props.step || 1),
                ),
            );
        }
        return Math.max(
            this.props.minimumValue || 0,
            Math.min(
                this.props.maximumValue || 1,
                ratio * ((this.props.maximumValue || 1) - (this.props.minimumValue || 0)) + (this.props.minimumValue || 0),
            ),
        );
    };

    // @ts-ignore
    _getCurrentValue = (): number => this.state.value?.__getValue();

    _setCurrentValue = (value: number): void => {
        this.state.value.setValue(value);
    };

    _setCurrentValueAnimated = (value: number): void => {
        Animated.timing(this.state.value, {
            useNativeDriver: false,
            toValue: value,
            duration: 150,
            easing: Easing.inOut(Easing.ease),
            delay: 0,
        }).start();
    };

    _fireChangeEvent = (event: 'onSlidingComplete' | 'onValueChange' | 'onSlidingStart'): void => {
        this.props[event]?.(this._getCurrentValue());
    };

    _getTouchOverflowSize = (): { width?: number; height?: number } => {
        const state = this.state;
        const props = this.props;

        const size = { width: 0, height: 0 };
        if (state.allMeasured) {
            size.width = Math.max(0, (props.thumbTouchSize?.width || 0) - (state.thumbSize.width || 0));
            size.height = Math.max(0, (props.thumbTouchSize?.height || 0) - (state.containerSize.height || 0));
        }

        return size;
    };

    _getTouchOverflowStyle = (): any => {
        const { width, height } = this._getTouchOverflowSize();

        const touchOverflowStyle: ViewStyle = {};
        if (width !== undefined && height !== undefined) {
            const verticalMargin = -height / 2;
            touchOverflowStyle.marginTop = verticalMargin;
            touchOverflowStyle.marginBottom = verticalMargin;

            const horizontalMargin = -width / 2;
            touchOverflowStyle.marginLeft = horizontalMargin;
            touchOverflowStyle.marginRight = horizontalMargin;
        }

        return touchOverflowStyle;
    };

    _thumbHitTest = (e: any): boolean => {
        const nativeEvent = e.nativeEvent;
        const thumbTouchRect = this._getThumbTouchRect();
        return thumbTouchRect.containsPoint(nativeEvent.locationX, nativeEvent.locationY);
    };

    _getThumbTouchRect = () => {
        const state = this.state;
        const props = this.props;
        const touchOverflowSize = this._getTouchOverflowSize();

        // @ts-ignore
        return new Rect(
            (touchOverflowSize.width || 0) / 2 +
                this._getThumbLeft(this._getCurrentValue()) +
                ((state.thumbSize.width || 0) - (props.thumbTouchSize?.width || 0)) / 2,
            (touchOverflowSize.width || 0) / 2 + ((state.containerSize.height || 0) - (props.thumbTouchSize?.height || 0)) / 2,
            props.thumbTouchSize?.width || 0,
            props.thumbTouchSize?.height || 0,
        );
    };
}

const styles = StyleSheet.create({
    container: {
        height: 40,
        justifyContent: 'center',
    },
    track: {
        borderRadius: TRACK_SIZE / 2,
        height: TRACK_SIZE,
    },
    thumb: {
        borderRadius: THUMB_SIZE / 2,
        height: THUMB_SIZE,
        position: 'absolute',
        width: THUMB_SIZE,
    },
    touchArea: {
        backgroundColor: 'transparent',
        bottom: 0,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
    },
});

function Rect(this: any, x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

Rect.prototype.containsPoint = function (x: number, y: number) {
    return x >= this.x && y >= this.y && x <= this.x + this.width && y <= this.y + this.height;
};
