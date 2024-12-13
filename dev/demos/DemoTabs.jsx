import { Card, DefaultLayout, Group, Tabs, TextX } from '../../src/components';

export default function DemoTabs() {
    const basicItems = [
        { label: '选项A', value: 'A' },
        { label: '选项B', value: 'B' },
        { label: '选项C', value: 'C' },
        { disabled: true, label: '禁用选项', value: 'D' },
    ];

    const manyItems = [
        { label: '选项A', value: 'A' },
        { label: '选项B', value: 'B' },
        { label: '选项C', value: 'C' },
        { label: '选项D', value: 'D' },
        { label: '选项E', value: 'E' },
        { label: '选项F', value: 'F' },
        { label: '选项G', value: 'G' },
        { label: '选项H', value: 'H' },
        { label: '选项I', value: 'I' },
        { label: '选项J', value: 'J' },
        { label: '选项K', value: 'K' },
        { label: '选项L', value: 'L' },
        { label: '选项M', value: 'M' },
    ];

    const contentItems = [
        { children: <TextX>A</TextX>, label: '选项A', value: 'A' },
        { children: <TextX>B</TextX>, label: '选项B', value: 'B' },
        { children: <TextX>C</TextX>, label: '选项C', value: 'C' },
        { children: <TextX>D</TextX>, label: '选项D', value: 'D' },
    ];

    return (
        <DefaultLayout head="选项卡 Tabs">
            <Group first header="基础">
                <Card>
                    <Tabs items={basicItems} />
                </Card>
            </Group>
            <Group header="横向滚动">
                <Card>
                    <Tabs items={manyItems} scrollable />
                </Card>
            </Group>
            <Group header="默认值">
                <Card>
                    <Tabs defaultValue="B" items={basicItems} />
                </Card>
            </Group>
            <Group>
                <Card>
                    <Tabs defaultValue="G" items={manyItems} scrollable />
                </Card>
            </Group>
            <Group header="内容联动">
                <Card>
                    <Tabs defaultValue="A" items={contentItems} />
                </Card>
            </Group>
        </DefaultLayout>
    );
}
