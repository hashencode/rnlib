/**
 * 改造自 https://github.com/jeanregisser/react-native-slider
 */
import { PureComponent } from 'react';
import { Animated, Easing, PanResponder, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

const TRACK_SIZE = 3;
const THUMB_SIZE = 13;

export interface ISliderProps {
    animateTransitions?: boolean;
    disabled?: boolean;
    maximumTrackTintColor?: string;
    maximumValue?: number;
    minimumTrackTintColor?: string;
    minimumValue?: number;
    onChange?: (value: number) => void;
    onSlidingComplete?: (value: number) => void;
    onSlidingStart?: (value: number) => void;
    orientation?: 'horizontal' | 'vertical';
    step?: number;
    style?: StyleProp<ViewStyle>;
    thumbStyle?: StyleProp<ViewStyle>;
    thumbTintColor?: string;
    thumbTouchSize?: { height: number; width: number };
    trackStyle?: StyleProp<ViewStyle>;
    value?: number;
}

export default class Slider extends PureComponent<ISliderProps> {
    static defaultProps = {
        maximumTrackTintColor: '#b3b3b3',
        maximumValue: 1,
        minimumTrackTintColor: '#3f3f3f',
        minimumValue: 0,
        orientation: 'horizontal',
        step: 0,
        thumbTintColor: '#343434',
        thumbTouchSize: { height: 40, width: 40 },
        value: 0,
    };

    _containerSize = undefined;

    _panResponder: any;
    _previousLeft: number = 0;
    _thumbSize = undefined;
    _trackSize = undefined;
    state = {
        allMeasured: false,
        containerSize: { height: 0, width: 0 },
        thumbSize: { height: 0, width: 0 },
        trackSize: { height: 0, width: 0 },
        value: new Animated.Value(this.props.value || 0),
    };

    constructor(props: ISliderProps) {
        super(props);
        this._panResponder = PanResponder.create({
            onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
            onPanResponderGrant: this._handlePanResponderGrant,
            onPanResponderMove: this._handlePanResponderMove,
            onPanResponderRelease: this._handlePanResponderEnd,
            onPanResponderTerminate: this._handlePanResponderEnd,
            onPanResponderTerminationRequest: this._handlePanResponderRequestEnd,
            onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
        });
    }

    _fireChangeEvent = (event: 'onChange' | 'onSlidingComplete' | 'onSlidingStart'): void => {
        this.props[event]?.(this._getCurrentValue());
    };

    // @ts-ignore
    _getCurrentValue = (): number => this.state.value?.__getValue();

    _getRatio = (value: number): number =>
        (value - (this.props.minimumValue || 0)) / ((this.props.maximumValue || 1) - (this.props.minimumValue || 0));

    _getThumbLeft = (value: number): number => {
        return this._getRatio(value) * (this.state.containerSize.width - this.state.thumbSize.width);
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

    _getTouchOverflowSize = (): { height?: number; width?: number } => {
        const state = this.state;
        const props = this.props;

        const size = { height: 0, width: 0 };
        if (state.allMeasured) {
            size.width = Math.max(0, (props.thumbTouchSize?.width || 0) - (state.thumbSize.width || 0));
            size.height = Math.max(0, (props.thumbTouchSize?.height || 0) - (state.containerSize.height || 0));
        }

        return size;
    };

    _getTouchOverflowStyle = (): any => {
        const { height, width } = this._getTouchOverflowSize();

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

    _getValue = (gestureState: any): number => {
        const length = this.state.containerSize.width - this.state.thumbSize.width;
        const thumbLeft = this._previousLeft + gestureState[this.props.orientation === 'horizontal' ? 'dx' : 'dy'];

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

    _handleMeasure = (name: string, x: any): void => {
        const { height, width } = x.nativeEvent.layout;
        const size = { height, width };
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
                allMeasured: true,
                containerSize: this._containerSize,
                thumbSize: this._thumbSize,
                trackSize: this._trackSize,
            });
        }
    };

    _handleMoveShouldSetPanResponder = (): boolean => false;

    _handlePanResponderEnd = (e: any, gestureState: any): void => {
        if (this.props.disabled) {
            return;
        }

        this._setCurrentValue(this._getValue(gestureState));
        this._fireChangeEvent('onSlidingComplete');
    };

    _handlePanResponderGrant = (): void => {
        this._previousLeft = this._getThumbLeft(this._getCurrentValue());
        this._fireChangeEvent('onSlidingStart');
    };

    _handlePanResponderMove = (e: any, gestureState: any): void => {
        if (this.props.disabled) {
            return;
        }

        this._setCurrentValue(this._getValue(gestureState));
        this._fireChangeEvent('onChange');
    };

    _handlePanResponderRequestEnd = (): boolean => false;

    _handleStartShouldSetPanResponder = (e: any): boolean => this._thumbHitTest(e);

    _measureContainer = (x: any): void => {
        this._handleMeasure('containerSize', x);
    };

    _measureThumb = (x: any): void => {
        this._handleMeasure('thumbSize', x);
    };

    _measureTrack = (x: any): void => {
        this._handleMeasure('trackSize', x);
    };

    _setCurrentValue = (value: number): void => {
        this.state.value.setValue(value);
    };

    _setCurrentValueAnimated = (value: number): void => {
        Animated.timing(this.state.value, {
            delay: 0,
            duration: 150,
            easing: Easing.inOut(Easing.ease),
            toValue: value,
            useNativeDriver: false,
        }).start();
    };

    _thumbHitTest = (e: any): boolean => {
        const nativeEvent = e.nativeEvent;
        const thumbTouchRect = this._getThumbTouchRect();
        return thumbTouchRect.containsPoint(nativeEvent.locationX, nativeEvent.locationY);
    };

    componentDidUpdate(prevProps: ISliderProps) {
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
            maximumTrackTintColor,
            maximumValue,
            minimumTrackTintColor,
            minimumValue,
            style,
            thumbStyle,
            thumbTintColor,
            trackStyle,
            ...otherProps
        } = this.props;
        const { allMeasured, containerSize, thumbSize, value } = this.state;
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
            backgroundColor: minimumTrackTintColor,
            position: 'absolute',
            width: Animated.add(minimumTrackWidth, thumbSize.width / 2),
            ...valueVisibleStyle,
        };

        const touchOverflowStyle = this._getTouchOverflowStyle();

        return (
            <View onLayout={this._measureContainer} style={[styles.container, style]} {...otherProps}>
                <View onLayout={this._measureTrack} style={[{ backgroundColor: maximumTrackTintColor }, styles.track, trackStyle]} />
                <Animated.View style={[styles.track, trackStyle, minimumTrackStyle]} />
                <Animated.View
                    onLayout={this._measureThumb}
                    style={[
                        { backgroundColor: thumbTintColor },
                        styles.thumb,
                        thumbStyle,
                        {
                            transform: [{ translateX: thumbLeft }, { translateY: 0 }],
                            ...valueVisibleStyle,
                        },
                    ]}
                />
                <View style={[styles.touchArea, touchOverflowStyle]} {...this._panResponder.panHandlers} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 40,
        justifyContent: 'center',
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
    track: {
        borderRadius: TRACK_SIZE / 2,
        height: TRACK_SIZE,
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
