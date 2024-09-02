import { DefaultLayout, Head, Icon, Selector, Group, Card } from '../components';

export default function DemoSelector() {
    const optionsData = [
        { title: '选项 A', value: 'A' },
        { title: '选项 B', value: 'B' },
        { title: '选项 C', value: 'C' },
    ];
    const optionsDesc = [
        { title: '选项 A', value: 'A', desc: '描述文本' },
        { title: '选项 B', value: 'B', desc: '长长长长长描述文本' },
        { title: '选项 C', value: 'C', desc: '长长长长长描述文本' },
    ];
    const optionsCustom = [
        { value: 'A', content: <Icon name="arrow-left" /> },
        { value: 'B', content: <Icon name="arrow-up" /> },
        { value: 'C', content: <Icon name="arrow-right" /> },
    ];
    const optionDisabled = [
        { title: '选项 A', value: 'A', disabled: true },
        { title: '选项 B', value: 'B', disabled: true },
        { title: '选项 C', value: 'C', disabled: true },
    ];
    const defaultOptionStyle = { flexBasis: '30%', flexGrow: 1 };

    return (
        <DefaultLayout head={<Head title="选择组 Selector" />}>
            <Group header="单选" first>
                <Card>
                    <Selector defaultValue="A" options={optionsData} optionStyle={defaultOptionStyle} />
                </Card>
            </Group>
            <Group header="多选">
                <Card>
                    <Selector defaultValue={['A', 'B']} options={optionsData} multiple optionStyle={defaultOptionStyle} />
                </Card>
            </Group>
            <Group header="描述">
                <Card>
                    <Selector defaultValue="A" options={optionsDesc} optionStyle={defaultOptionStyle} />
                </Card>
            </Group>
            <Group header="自定义插槽">
                <Card>
                    <Selector options={optionsCustom} />
                </Card>
            </Group>
            <Group header="禁用">
                <Card>
                    <Selector defaultValue="A" options={optionDisabled} optionStyle={defaultOptionStyle} />
                </Card>
            </Group>
        </DefaultLayout>
    );
}
