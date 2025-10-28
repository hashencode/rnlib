import { COLOR, SIZE } from '../../src';
import { Button, Card, Flex, Group, Icon } from '../../src/components';
import usePicker from '../../src/hooks/usePicker';
import DefaultLayout from './DefaultLayout';

export default function DemoPicker() {
    const { createPicker, destroyPicker } = usePicker();

    const optionsData = [
        { title: '选项 A', value: 'A' },
        { title: '选项 B', value: 'B' },
        { title: '选项 C', value: 'C' },
        { title: '选项 D', subtitle: '选项副标题', value: 'D' },
        { title: '选项 禁用', value: 'N', disabled: true },
    ];
    const optionsDesc = optionsData.map(item => ({ ...item, desc: '描述文本' }));

    return (
        <DefaultLayout head="选择 Picker">
            <Group header="模式" first>
                <Card>
                    <Flex rowGap={SIZE.space_md} columnGap={SIZE.space_md}>
                        <Button
                            onPress={() =>
                                createPicker({
                                    id: 'cn',
                                    defaultValue: 'B',
                                    options: optionsData,
                                    onChange: () => destroyPicker('cn'),
                                    onCancel: () => destroyPicker('cn'),
                                })
                            }>
                            单选
                        </Button>
                        <Button
                            onPress={() =>
                                createPicker({
                                    id: 'cn',
                                    defaultValue: ['A', 'B'],
                                    options: optionsData,
                                    onChange: () => destroyPicker('cn'),
                                    onCancel: () => destroyPicker('cn'),
                                    multiple: true,
                                })
                            }>
                            多选
                        </Button>
                    </Flex>
                </Card>
            </Group>
            <Group header="自定义插槽">
                <Card>
                    <Button
                        onPress={() =>
                            createPicker({
                                id: 'cn',
                                title: '头部/描述/按钮',
                                defaultValue: ['A', 'B'],
                                options: optionsDesc,
                                multiple: true,
                                cancelText: 'Cancel',
                                cancelButtonProps: { style: { text: { color: COLOR.text_danger } } },
                                checkIcon: <Icon name="arrow-left" size={SIZE.icon_xs} color={COLOR.primary} />,
                                onChange: () => destroyPicker('cn'),
                                onCancel: () => destroyPicker('cn'),
                            })
                        }>
                        头部/描述/按钮
                    </Button>
                </Card>
            </Group>
        </DefaultLayout>
    );
}
