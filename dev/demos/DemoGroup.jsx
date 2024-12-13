import { Placeholder, PlaceholderLine } from 'rn-placeholder';

import { Card, DefaultLayout, Group } from '../../src/components';

export default function DemoGroup() {
    const content = (
        <Placeholder>
            <PlaceholderLine width={80} />
            <PlaceholderLine />
            <PlaceholderLine width={30} />
        </Placeholder>
    );

    return (
        <DefaultLayout head="分组 Group">
            <Group first header="组1">
                <Card>{content}</Card>
            </Group>
            <Group footer="底部文本" header="组2">
                <Card>{content}</Card>
            </Group>
        </DefaultLayout>
    );
}
