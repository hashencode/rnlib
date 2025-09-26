import { useState } from 'react';
import { Button, Card, DefaultLayout, Flex, Group, Icon, Picker } from '../../src/components';
import { COLOR, SIZE } from '../../src/scripts/const';

export default function DemoPicker() {
    const [openId, setOpenId] = useState('');

    const optionsData = [
        { title: '选项 A', value: 'A' },
        { title: '选项 B', value: 'B' },
        { title: '选项 C', value: 'C' },
        { title: '选项 D', subtitle: '选项副标题', value: 'D' },
        { title: '选项 禁用', value: 'N', disabled: true },
    ];
    const optionsDesc = optionsData.map(item => ({ ...item, desc: '描述文本' }));

    const resetOpenId = () => {
        setOpenId('');
    };

    return (
        <DefaultLayout head="选择 Picker">
            <Group header="模式" first>
                <Card>
                    <Flex rowGap={SIZE.space_md} columnGap={SIZE.space_md}>
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
            <Group header="自定义插槽">
                <Card>
                    <Button header="选项标题" onPress={() => setOpenId('slots')}>
                        头部/描述/按钮
                    </Button>
                </Card>
                <Picker
                    visible={openId === 'slots'}
                    options={optionsDesc}
                    title="多选"
                    cancelText="Cancel"
                    cancelButtonProps={{ style: { text: { color: COLOR.text_danger } } }}
                    multiple
                    checkIcon={<Icon name="arrow-left" size={SIZE.icon_xs} color={COLOR.primary} />}
                    onChange={resetOpenId}
                    onCancel={resetOpenId}
                />
            </Group>
        </DefaultLayout>
    );
}
