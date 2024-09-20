import { Card, DefaultLayout, Group, Tabs, Text } from '../lib/components';

export default function DemoTabs() {
    const basicItems = [
        { label: '选项A', value: 'A' },
        { label: '选项B', value: 'B' },
        { label: '选项C', value: 'C' },
        { label: '禁用选项', value: 'D', disabled: true },
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
        { label: '选项A', value: 'A', children: <Text>A</Text> },
        { label: '选项B', value: 'B', children: <Text>B</Text> },
        { label: '选项C', value: 'C', children: <Text>C</Text> },
        { label: '选项D', value: 'D', children: <Text>D</Text> },
    ];

    return (
        <DefaultLayout head="选项卡 Tabs">
            <Group header="基础" first>
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
                    <Tabs items={basicItems} defaultValue="B" />
                </Card>
            </Group>
            <Group>
                <Card>
                    <Tabs items={manyItems} scrollable defaultValue="G" />
                </Card>
            </Group>
            <Group header="内容联动">
                <Card>
                    <Tabs items={contentItems} defaultValue="A" />
                </Card>
            </Group>
        </DefaultLayout>
    );
}
