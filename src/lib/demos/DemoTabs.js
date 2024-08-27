import React from 'react';
import { Card, DefaultLayout, Group, Head, Tabs, Text } from '../components';

export default function DemoTabs() {
    const basicItems = [
        { title: '选项A', value: 'A' },
        { title: '选项B', value: 'B' },
        { title: '选项C', value: 'C' },
        { title: '选项D', value: 'D' },
    ];

    const manyItems = [
        { title: '选项A', value: 'A' },
        { title: '选项B', value: 'B' },
        { title: '选项C', value: 'C' },
        { title: '选项D', value: 'D' },
        { title: '选项E', value: 'E' },
        { title: '选项F', value: 'F' },
        { title: '选项G', value: 'G' },
        { title: '选项H', value: 'H' },
        { title: '选项I', value: 'I' },
        { title: '选项J', value: 'J' },
        { title: '选项K', value: 'K' },
        { title: '选项L', value: 'L' },
        { title: '选项M', value: 'M' },
    ];

    const contentItems = [
        { title: '选项A', value: 'A', content: <Text>1</Text> },
        { title: '选项B', value: 'B', content: <Text>2</Text> },
        { title: '选项C', value: 'C', content: <Text>3</Text> },
        { title: '选项D', value: 'D', content: <Text>4</Text> },
    ];

    return (
        <DefaultLayout head={<Head title="选项卡 Tabs" />}>
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
