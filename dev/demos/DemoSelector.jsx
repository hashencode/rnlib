import { Card, DefaultLayout, Group, Icon, Selector } from '../../src/components';

export default function DemoSelector() {
    const optionsData = [
        { desc: '描述文本', title: '选项 A', value: 'A' },
        { desc: '描述文本描述文本描述文本描述文本', title: '选项 B', value: 'B' },
        { desc: '描述文本描述文本描述文本描述文本', title: '选项 C', value: 'C' },
    ];
    const optionsCustom = [
        { content: <Icon name="arrow-left" />, value: 'A' },
        { content: <Icon name="arrow-up" />, value: 'B' },
        { content: <Icon name="arrow-right" />, value: 'C' },
    ];

    const basicStyle = { option: { flexBasis: '30%', flexGrow: 1 } };

    return (
        <DefaultLayout head="选择组 Selector">
            <Group first header="单选">
                <Card>
                    <Selector defaultValue="A" options={optionsData} style={basicStyle} />
                </Card>
            </Group>
            <Group header="多选">
                <Card>
                    <Selector defaultValue={['A', 'B']} multiple options={optionsData} style={basicStyle} />
                </Card>
            </Group>
            <Group header="自定义插槽">
                <Card>
                    <Selector options={optionsCustom} />
                </Card>
            </Group>
        </DefaultLayout>
    );
}
