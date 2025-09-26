import { useState } from 'react';
import { ActionSheet, Button, Card, Group } from '../../src/components';
import DefaultLayout from './DefaultLayout';

export default function DemoActionSheet() {
    const [openId, setOpenId] = useState('');

    const optionsBasic = [
        { title: '选项 A', value: 'A' },
        { title: '选项 B', value: 'B', subtitle: '自定义副标题' },
        { title: '选项禁用', value: 'C', disabled: true },
    ];

    const resetOpenId = () => {
        setOpenId('');
    };

    return (
        <DefaultLayout head="动作面板 ActionSheet">
            <Group header="选项" first>
                <Card>
                    <Button onPress={() => setOpenId('basic')}>基础</Button>
                </Card>
                <ActionSheet
                    header="基础"
                    visible={openId === 'basic'}
                    options={optionsBasic}
                    onChange={resetOpenId}
                    onCancel={resetOpenId}
                />
            </Group>
        </DefaultLayout>
    );
}
