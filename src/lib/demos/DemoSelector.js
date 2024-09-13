import { DefaultLayout, Head, Icon, Selector, Group, Card } from '../components';

export default function DemoSelector() {
    const optionsData = [
        { title: '选项 A', value: 'A', desc: '描述文本' },
        { title: '选项 B', value: 'B', desc: '描述文本描述文本描述文本描述文本' },
        { title: '选项 C', value: 'C', desc: '描述文本描述文本描述文本描述文本' },
    ];
    const optionsCustom = [
        { value: 'A', content: <Icon name="arrow-left" /> },
        { value: 'B', content: <Icon name="arrow-up" /> },
        { value: 'C', content: <Icon name="arrow-right" /> },
    ];

    const basicStyle = { option: { flexBasis: '30%', flexGrow: 1 } };

    return (
        <DefaultLayout head={<Head title="选择组 Selector" />}>
            <Group header="单选" first>
                <Card>
                    <Selector defaultValue="A" options={optionsData} style={basicStyle} />
                </Card>
            </Group>
            <Group header="多选">
                <Card>
                    <Selector defaultValue={['A', 'B']} options={optionsData} multiple style={basicStyle} />
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
