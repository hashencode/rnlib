import { ForwardedRef, forwardRef, useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, View, ViewStyle } from 'react-native';
import { COLOR, SIZE } from '../scripts/const';
import { TextBox, Flex, PressHighlight, Grabber } from '../components';
import { ActionSheetRef, default as ActionSheetOrigin } from 'react-native-actions-sheet';
import { mergeRefs } from '../scripts/utils';
import useStyle from '../hooks/useStyle';
import { IActionSheetOptionValue, IActionSheetProps } from '../_types/.components';

function ActionSheet(props: IActionSheetProps, ref: ForwardedRef<ActionSheetRef>) {
    const {
        options = [],
        showCancel = true,
        cancelText = '取消',
        visible,
        header,
        overlayClosable = true,
        backCloseable = true,
        style,
        onOpen,
        onCancel,
        onChange,
    } = props;

    const localRef = useRef<ActionSheetRef>(null);

    // 根节点样式
    const rootStyle = useStyle<ViewStyle>({
        defaultStyle: [styles.root],
        extraStyle: [style?.root],
    });

    // 头部节点样式
    const headerStyle = useStyle<ViewStyle>({
        defaultStyle: [styles.header],
        extraStyle: [style?.header],
    });

    // 选项节点样式
    const optionStyle = useStyle<ViewStyle>({
        defaultStyle: [styles.option],
        extraStyle: [style?.option],
    });

    // 选项节点样式
    const dividerStyle = useStyle<ViewStyle>({
        defaultStyle: [styles.divider],
        extraStyle: [style?.divider],
    });

    // 选项节点样式
    const cancelButtonStyle = useStyle<ViewStyle>({
        defaultStyle: [styles.option],
        extraStyle: [style?.cancelButton],
    });

    // 处理选项点击
    const handleOptionPress = (val: IActionSheetOptionValue) => {
        onChange?.(val);
    };

    // 处理取消按钮点击
    const handleCancel = () => {
        onCancel?.();
    };

    // 监听visible的变化
    useEffect(() => {
        const _ref = mergeRefs<ActionSheetRef>([ref, localRef]);
        if (visible && _ref) {
            _ref.current?.show();
        } else {
            _ref?.current?.hide();
        }
    }, [visible]);

    return (
        <ActionSheetOrigin
            ref={mergeRefs([ref, localRef])}
            containerStyle={rootStyle}
            enableRouterBackNavigation={backCloseable}
            closable={overlayClosable}
            onOpen={onOpen}
            onClose={onCancel}>
            <Flex alignItems="center" justifyContent="center" style={headerStyle}>
                <TextBox size={SIZE.font_h5} color={COLOR.text_desc} style={style?.headerText}>
                    {header}
                </TextBox>
            </Flex>

            <ScrollView>
                {options.map((item, index) => {
                    return (
                        <PressHighlight disabled={item.disabled} onPress={() => handleOptionPress(item.value)} key={index}>
                            <View style={optionStyle}>
                                <TextBox size={SIZE.font_h2} style={style?.title}>
                                    {item?.title}
                                </TextBox>
                                <TextBox color={COLOR.text_desc} style={style?.subtitle}>
                                    {item?.subtitle}
                                </TextBox>
                                {item?.children}
                            </View>
                            <View style={dividerStyle}></View>
                        </PressHighlight>
                    );
                })}
            </ScrollView>

            {showCancel ? (
                <>
                    <View style={styles.footerSpace} />
                    <PressHighlight onPress={handleCancel}>
                        <View style={cancelButtonStyle}>
                            <TextBox size={SIZE.font_h2} style={style?.cancelText}>
                                {cancelText}
                            </TextBox>
                        </View>
                    </PressHighlight>
                </>
            ) : null}

            <Grabber style={style?.grabber} />
        </ActionSheetOrigin>
    );
}

export default forwardRef(ActionSheet);

const styles = StyleSheet.create({
    root: {
        backgroundColor: COLOR.white,
    },
    header: {
        backgroundColor: COLOR.white,
        borderBottomWidth: SIZE.border_default,
        borderColor: COLOR.border_default,
        minHeight: SIZE.action_sheet_option_height,
        paddingHorizontal: SIZE.space_xl,
        paddingVertical: SIZE.space_md,
    },
    option: {
        alignItems: 'center',
        backgroundColor: COLOR.white,
        display: 'flex',
        justifyContent: 'center',
        minHeight: SIZE.action_sheet_option_height,
        paddingHorizontal: SIZE.space_xl,
        paddingVertical: SIZE.space_md,
        position: 'relative',
        rowGap: SIZE.space_xs,
    },
    divider: {
        borderBottomWidth: SIZE.border_default,
        borderColor: COLOR.border_default,
    },
    footerSpace: {
        backgroundColor: COLOR.bg_page,
        height: SIZE.space_lg,
    },
});
