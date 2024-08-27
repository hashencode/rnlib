import React from 'react';
import { DefaultLayout, Divider, Flex, Head, Text, Group, Card } from '../components';

export default function DemoDivider() {
    return (
        <DefaultLayout head={<Head title="分割线 Divider" />}>
            <Group header="水平分割线" first>
                <Card>
                    <Divider />
                </Card>
            </Group>
            <Group header="垂直分割线">
                <Card>
                    <Flex alignItems="center">
                        <Text>A</Text>
                        <Divider type="vertical" />
                        <Text>B</Text>
                    </Flex>
                </Card>
            </Group>
            <Group header="文本位置">
                <Card>
                    <Divider orientation="left">左侧文本</Divider>
                    <Divider>中间文本</Divider>
                    <Divider orientation="right">右侧文本</Divider>
                </Card>
            </Group>
        </DefaultLayout>
    );
}
