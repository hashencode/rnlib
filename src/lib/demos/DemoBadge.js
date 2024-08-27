import React from 'react';
import { DefaultLayout, Flex, Head, Group, Badge, Card } from '../components';
import { COLOR, SIZE } from '@/lib/scripts/const';

export default function DemoBadge() {
    return (
        <DefaultLayout head={<Head title="徽标数 Badge" />}>
            <Group header="基本">
                <Card>
                    <Flex columnGap={SIZE.space_middle} wrap="wrap" first>
                        <Badge>新</Badge>
                        <Badge>1</Badge>
                        <Badge>99</Badge>
                        <Badge>9999</Badge>
                    </Flex>
                </Card>
            </Group>
            <Group header="无边框">
                <Card>
                    <Flex columnGap={SIZE.space_middle} wrap="wrap">
                        <Badge bordered={false}>新</Badge>
                        <Badge bordered={false}>1</Badge>
                        <Badge bordered={false}>99</Badge>
                        <Badge bordered={false}>9999</Badge>
                    </Flex>
                </Card>
            </Group>
            <Group header="展示为红点">
                <Card>
                    <Badge dot>新</Badge>
                </Card>
            </Group>
        </DefaultLayout>
    );
}
