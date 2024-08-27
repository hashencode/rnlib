import React from 'react';
import { DefaultLayout, Head, Group, Card } from '../components';
import { Placeholder, PlaceholderLine } from 'rn-placeholder';

export default function DemoGroup() {
    return (
        <DefaultLayout head={<Head title="分组 Group" />}>
            <Group header="组1" first>
                <Card>
                    <Placeholder>
                        <PlaceholderLine width={80} />
                        <PlaceholderLine />
                        <PlaceholderLine width={30} />
                    </Placeholder>
                </Card>
            </Group>
            <Group header="组2" footer="底部文本">
                <Card>
                    <Placeholder>
                        <PlaceholderLine width={80} />
                        <PlaceholderLine />
                        <PlaceholderLine width={30} />
                    </Placeholder>
                </Card>
            </Group>
        </DefaultLayout>
    );
}
