import { useState } from 'react';

import { Button, Card, DefaultLayout, Flex, Group, Picker } from '../../src/components';
import { Icon } from '../../src/components';
import { COLOR, SIZE } from '../../src/scripts/const';

export default function DemoPicker() {
    const [openId, setOpenId] = useState('');

    const optionsData = [
        { title: '选项 A', value: 'A' },
        { title: '选项 B', value: 'B' },
        { title: '选项 C', value: 'C' },
        { subtitle: '选项副标题', title: '选项 D', value: 'D' },
        { disabled: true, title: '选项 禁用', value: 'N' },
    ];
    const optionsDesc = optionsData.map(item => ({ ...item, desc: '描述文本' }));

    const resetOpenId = () => {
        setOpenId('');
    };

    return (
        <DefaultLayout head="选择 Picker">
            <Group first header="模式">
                <Card>
                    <Flex columnGap={SIZE.space_md} rowGap={SIZE.space_md}>
                        <Button onPress={() => setOpenId('single')}>单选</Button>
                        <Button onPress={() => setOpenId('multiple')}>多选</Button>
                    </Flex>
                </Card>

                <Picker
                    defaultValue="B"
                    onCancel={resetOpenId}
                    onChange={resetOpenId}
                    options={optionsData}
                    visible={openId === 'single'}
                />
                <Picker
                    defaultValue={['A', 'B']}
                    multiple
                    onCancel={resetOpenId}
                    onChange={resetOpenId}
                    options={optionsData}
                    visible={openId === 'multiple'}
                />
            </Group>
            <Group header="自定义插槽">
                <Card>
                    <Button header="选项标题" onPress={() => setOpenId('slots')}>
                        头部/描述/按钮
                    </Button>
                </Card>
                <Picker
                    cancelButtonProps={{ style: { text: { color: COLOR.text_danger } } }}
                    cancelText="Cancel"
                    checkIcon={<Icon color={COLOR.primary} name="arrow-left" size={SIZE.icon_xs} />}
                    multiple
                    onCancel={resetOpenId}
                    onChange={resetOpenId}
                    options={optionsDesc}
                    title="多选"
                    visible={openId === 'slots'}
                />
            </Group>
        </DefaultLayout>
    );
}
