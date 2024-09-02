import { useState } from 'react';
import { Button, Card, DefaultLayout, Flex, Group, Head, Picker } from '../components';
import { SIZE } from '@/lib/scripts/const';

export default function DemoPicker() {
    const [openId, setOpenId] = useState('');

    const optionsData = [
        { title: '选项 A', value: 'A' },
        { title: '选项 B', value: 'B' },
        { title: '选项 C', value: 'C' },
        { title: '选项 D', value: 'D' },
        { title: '选项 E', value: 'E' },
    ];
    const optionsDesc = optionsData.map(item => ({ ...item, desc: '描述文本' }));

    const resetOpenId = () => {
        setOpenId('');
    };

    return (
        <DefaultLayout head={<Head title="选择 Picker" />}>
            <Group header="模式" first>
                <Card>
                    <Flex rowGap={SIZE.space_middle} columnGap={SIZE.space_middle}>
                        <Button onPress={() => setOpenId('single')}>单选</Button>
                        <Button onPress={() => setOpenId('multiple')}>多选</Button>
                    </Flex>
                </Card>

                <Picker
                    visible={openId === 'single'}
                    defaultValue="B"
                    options={optionsData}
                    onChange={resetOpenId}
                    onCancel={resetOpenId}
                />
                <Picker
                    visible={openId === 'multiple'}
                    defaultValue={['A', 'B']}
                    options={optionsData}
                    onChange={resetOpenId}
                    onCancel={resetOpenId}
                    multiple
                />
            </Group>
            <Group header="禁用选项">
                <Card>
                    <Flex rowGap={SIZE.space_middle} columnGap={SIZE.space_middle}>
                        <Button onPress={() => setOpenId('singleDisabled')}>单选</Button>
                        <Button onPress={() => setOpenId('multipleDisabled')}>多选</Button>
                    </Flex>
                </Card>
                <Picker
                    visible={openId === 'singleDisabled'}
                    defaultValue="A"
                    options={optionsData.map((item, index) => ({ ...item, disabled: index === 2 }))}
                    onChange={resetOpenId}
                    onCancel={resetOpenId}
                />
                <Picker
                    visible={openId === 'multipleDisabled'}
                    defaultValue={['A', 'B', 'C']}
                    options={optionsData.map((item, index) => ({ ...item, disabled: index === 2 }))}
                    onChange={resetOpenId}
                    onCancel={resetOpenId}
                    multiple
                />
            </Group>
            <Group header="自定义插槽">
                <Card>
                    <Button header="选项标题" onPress={() => setOpenId('slots')}>
                        头部/描述/按钮
                    </Button>
                </Card>
                <Picker
                    visible={openId === 'slots'}
                    options={optionsDesc}
                    title="选项标题"
                    cancelText="关闭"
                    confirmText="保存"
                    multiple
                    onChange={resetOpenId}
                    onCancel={resetOpenId}
                />
            </Group>
        </DefaultLayout>
    );
}
