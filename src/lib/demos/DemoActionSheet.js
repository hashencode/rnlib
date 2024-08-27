import React, { useState } from 'react';
import Head from '../components/Head';
import { SIZE } from '@/lib/scripts/const';
import { ActionSheet, Button, Card, DefaultLayout, Flex, Group } from '../components';

export default function DemoActionSheet() {
    const [openId, setOpenId] = useState('');

    const optionsBasic = [
        { title: '选项 A', value: 'A' },
        { title: '选项 B', value: 'B' },
        { title: '选项 C', value: 'C' },
    ];

    const optionsDesc = [
        { title: '选项 A', value: 'A', desc: '描述文本' },
        { title: '选项 B', value: 'B', desc: '描述文本' },
        { title: '选项 C', value: 'C', desc: '描述文本' },
    ];

    const optionsDisable = [
        { title: '选项 A', value: 'A' },
        { title: '选项 B', value: 'B', disabled: true },
        { title: '选项 C', value: 'C', disabled: true },
    ];

    const optionsDanger = [
        { title: '选项 A', value: 'A' },
        { title: '选项 B', value: 'B' },
        { title: '选项 C', value: 'C' },
    ];

    const resetOpenId = () => {
        setOpenId('');
    };

    return (
        <DefaultLayout head={<Head title="动作面板 ActionSheet" />}>
            <Group header="选项" first>
                <Card>
                    <Flex rowGap={SIZE.space_middle} columnGap={SIZE.space_middle}>
                        <Button onPress={() => setOpenId('basic')}>基础</Button>
                        <Button onPress={() => setOpenId('desc')}>描述</Button>
                        <Button onPress={() => setOpenId('danger')}>危险按钮</Button>
                        <Button onPress={() => setOpenId('disabled')}>禁用</Button>
                    </Flex>
                </Card>
                <ActionSheet visible={openId === 'basic'} options={optionsBasic} onChange={resetOpenId} onCancel={resetOpenId} />
                <ActionSheet visible={openId === 'desc'} options={optionsDesc} onChange={resetOpenId} onCancel={resetOpenId} />
                <ActionSheet visible={openId === 'disabled'} options={optionsDisable} onChange={resetOpenId} onCancel={resetOpenId} />
                <ActionSheet visible={openId === 'danger'} options={optionsDanger} onChange={resetOpenId} onCancel={resetOpenId} />
            </Group>
            <Group header="自定义插槽">
                <Card>
                    <Button onPress={() => setOpenId('slots')}>自定义头部</Button>
                </Card>
                <ActionSheet
                    visible={openId === 'slots'}
                    options={optionsBasic}
                    header="自定义标题"
                    onChange={resetOpenId}
                    onCancel={resetOpenId}
                />
            </Group>
            <Group header="隐藏取消按钮">
                <Card>
                    <Button onPress={() => setOpenId('cancel')}>隐藏取消按钮</Button>
                </Card>
                <ActionSheet
                    visible={openId === 'cancel'}
                    options={optionsBasic}
                    showCancelButton={false}
                    onChange={resetOpenId}
                    onCancel={resetOpenId}
                />
            </Group>
        </DefaultLayout>
    );
}
