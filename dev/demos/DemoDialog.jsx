import { useState } from 'react';
import { SIZE } from '../../src';
import { Button, Card, Flex, Group, Input } from '../../src/components';
import { useDialog } from '../../src/hooks';
import DefaultLayout from './DefaultLayout';

export default function DemoDialog() {
    const [openId, setOpenId] = useState('');
    const { createDialog, destroyDialog } = useDialog();

    const defaultPressFunc = () => {
        destroyDialog('cn');
    };

    const config = {
        id: 'cn',
        title: '弹窗提示',
        content: '点击按钮或遮罩关闭弹窗',
        onCancel: defaultPressFunc,
    };

    const okButton = {
        children: '确定',
        onPress: defaultPressFunc,
    };

    const cancelButton = {
        children: '取消',
        onPress: defaultPressFunc,
    };

    const primaryButton = {
        children: '主操作',
        onPress: defaultPressFunc,
    };

    return (
        <DefaultLayout head="对话框 Dialog">
            <Group header="按钮数量" first>
                <Card>
                    <Flex columnGap={SIZE.space_md}>
                        <Button
                            onPress={() =>
                                createDialog({
                                    ...config,
                                    buttons: [okButton],
                                })
                            }>
                            单个按钮
                        </Button>
                        <Button
                            onPress={() =>
                                createDialog({
                                    ...config,
                                    buttons: [cancelButton, okButton],
                                })
                            }>
                            两个按钮
                        </Button>
                        <Button
                            onPress={() =>
                                createDialog({
                                    ...config,
                                    buttons: [primaryButton, okButton, cancelButton],
                                })
                            }>
                            三个及以上
                        </Button>
                    </Flex>
                </Card>
            </Group>
            <Group header="动作按钮">
                <Card>
                    <Flex columnGap={SIZE.space_md}>
                        <Button
                            onPress={() =>
                                createDialog({
                                    ...config,
                                    actions: [primaryButton],
                                })
                            }>
                            仅主操作
                        </Button>
                        <Button
                            onPress={() =>
                                createDialog({
                                    ...config,
                                    actions: [primaryButton, cancelButton],
                                })
                            }>
                            包含副操作
                        </Button>
                    </Flex>
                </Card>
            </Group>
            <Group header="自定义插槽">
                <Card columnGap={SIZE.space_md}>
                    <Button
                        onPress={() =>
                            createDialog({
                                ...config,
                                content: <Input placeholder="输入一些文字" />,
                                buttons: [okButton],
                            })
                        }>
                        输入框
                    </Button>
                </Card>
            </Group>
        </DefaultLayout>
    );
}
