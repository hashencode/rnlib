import React, { useState } from 'react';
import { Button, DefaultLayout, Dialog, Flex, Head, Input, Group, Card } from '../components';
import { useDialog } from '../hooks';
import { COLOR, SIZE } from '@/lib/scripts/const';

export default function DemoDialog() {
    const [openId, setOpenId] = useState('');
    const { createDialog, destroyDialog } = useDialog();

    const defaultPressFunc = () => {
        setOpenId('');
    };
    const config = {
        title: '弹窗提示',
        content: '点击按钮或遮罩关闭弹窗',
        onRequestClose: defaultPressFunc,
        onCancel: defaultPressFunc,
    };
    const okButton = {
        text: '确定',
        onPress: defaultPressFunc,
    };
    const cancelButton = {
        text: '取消',
        onPress: defaultPressFunc,
    };
    const primaryButton = {
        text: '主操作',
        onPress: defaultPressFunc,
    };
    const createDialogByMethod = () => {
        createDialog({ ...config, buttons: [{ text: '我知道了', onPress: () => destroyDialog('cn') }], id: 'cn' });
    };

    return (
        <DefaultLayout head={<Head title="对话框 Dialog" />}>
            <Group header="按钮数量" first>
                <Card>
                    <Flex columnGap={SIZE.space_middle}>
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
                    <Flex columnGap={SIZE.space_middle}>
                        <Button onPress={() => setOpenId('actions_main')}>仅主操作</Button>
                        <Button onPress={() => setOpenId('actions_all')}>包含副操作</Button>
                    </Flex>
                </Card>
                <Dialog {...config} visible={openId === 'actions_main'} actions={[{ ...primaryButton }]} />
                <Dialog {...config} visible={openId === 'actions_all'} actions={[{ ...primaryButton }, cancelButton]} />
            </Group>
            <Group header="按钮文本颜色">
                <Card columnGap={SIZE.space_middle}>
                    <Button onPress={() => setOpenId('danger')}>危险</Button>
                </Card>
                <Dialog
                    {...config}
                    visible={openId === 'danger'}
                    buttons={[cancelButton, { ...okButton, style: { text: { color: COLOR.text_danger } } }]}
                />
            </Group>
            <Group header="自定义插槽">
                <Card columnGap={SIZE.space_middle}>
                    <Button onPress={() => setOpenId('extra')}>输入框</Button>
                </Card>
                <Dialog {...config} visible={openId === 'extra'} buttons={[okButton]}>
                    <Input placeholder="输入一些文字" />
                </Dialog>
            </Group>
            <Group header="静态方法创建">
                <Card columnGap={SIZE.space_middle}>
                    <Button onPress={() => createDialogByMethod()}>非组件形式创建</Button>
                </Card>
            </Group>
        </DefaultLayout>
    );
}
