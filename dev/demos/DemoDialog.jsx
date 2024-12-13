import { useState } from 'react';
import { Button, DefaultLayout, Dialog, Flex, Input, Group, Card } from '../../src/components';
import { useDialog } from '../../src/hooks';
import { SIZE } from '../../src/scripts/const';

export default function DemoDialog() {
    const [openId, setOpenId] = useState('');
    const { createDialog, destroyDialog } = useDialog();

    const defaultPressFunc = () => {
        setOpenId('');
    };

    const config = {
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

    const createDialogByMethod = () => {
        createDialog({
            ...config,
            buttons: [{ children: '我知道了', onPress: () => destroyDialog('cn') }],
            id: 'cn',
        });
    };

    return (
        <DefaultLayout head="对话框 Dialog">
            <Group header="按钮数量" first>
                <Card>
                    <Flex columnGap={SIZE.space_md}>
                        <Button onPress={() => setOpenId('one')}>单个按钮</Button>
                        <Button onPress={() => setOpenId('two')}>两个按钮</Button>
                        <Button onPress={() => setOpenId('three')}>三个及以上</Button>
                    </Flex>
                </Card>

                <Dialog {...config} visible={openId === 'one'} buttons={[okButton]} />
                <Dialog {...config} visible={openId === 'two'} buttons={[cancelButton, okButton]} />
                <Dialog {...config} visible={openId === 'three'} buttons={[primaryButton, okButton, cancelButton]} />
            </Group>
            <Group header="动作按钮">
                <Card>
                    <Flex columnGap={SIZE.space_md}>
                        <Button onPress={() => setOpenId('actions_main')}>仅主操作</Button>
                        <Button onPress={() => setOpenId('actions_all')}>包含副操作</Button>
                    </Flex>
                </Card>
                <Dialog {...config} visible={openId === 'actions_main'} actions={[{ ...primaryButton }]} />
                <Dialog {...config} visible={openId === 'actions_all'} actions={[{ ...primaryButton }, cancelButton]} />
            </Group>
            <Group header="自定义插槽">
                <Card columnGap={SIZE.space_md}>
                    <Button onPress={() => setOpenId('extra')}>输入框</Button>
                </Card>
                <Dialog
                    {...config}
                    content={<Input placeholder="输入一些文字" />}
                    visible={openId === 'extra'}
                    buttons={[cancelButton]}></Dialog>
            </Group>
            <Group header="静态方法创建">
                <Card columnGap={SIZE.space_md}>
                    <Button onPress={createDialogByMethod}>非组件形式创建</Button>
                </Card>
            </Group>
        </DefaultLayout>
    );
}
