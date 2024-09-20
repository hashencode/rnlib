import { useState } from 'react';
import { ActionSheet, Button, Card, DefaultLayout, Group, Text, Icon, Flex } from '../../src/components';
import { COLOR } from '../../src/scripts/const';

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
                    onCancel={resetOpenId}>
                    <Text>123</Text>
                </ActionSheet>
            </Group>
            <Group header="自定义">
                <Card>
                    <Button onPress={() => setOpenId('slots')}>自定义头部/隐藏取消按钮</Button>
                </Card>
                <ActionSheet
                    visible={openId === 'slots'}
                    options={optionsBasic}
                    header={
                        <Flex justifyContent="center" style={{ backgroundColor: COLOR.primary, paddingVertical: 12 }}>
                            <Icon name="earth" color={COLOR.white}></Icon>
                        </Flex>
                    }
                    showCancel={false}
                    onChange={resetOpenId}
                    onCancel={resetOpenId}
                />
            </Group>
        </DefaultLayout>
    );
}
