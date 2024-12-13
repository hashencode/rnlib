import { useState } from 'react';

import { ActionSheet, Button, Card, DefaultLayout, Group, TextX } from '../../src/components';

export default function DemoActionSheet() {
    const [openId, setOpenId] = useState('');

    const optionsBasic = [
        { title: '选项 A', value: 'A' },
        { subtitle: '自定义副标题', title: '选项 B', value: 'B' },
        { disabled: true, title: '选项禁用', value: 'C' },
    ];

    const resetOpenId = () => {
        setOpenId('');
    };

    return (
        <DefaultLayout head="动作面板 ActionSheet">
            <Group first header="选项">
                <Card>
                    <Button onPress={() => setOpenId('basic')}>基础</Button>
                </Card>
                <ActionSheet
                    header="基础"
                    onCancel={resetOpenId}
                    onChange={resetOpenId}
                    options={optionsBasic}
                    visible={openId === 'basic'}>
                    <TextX>123</TextX>
                </ActionSheet>
            </Group>
        </DefaultLayout>
    );
}
