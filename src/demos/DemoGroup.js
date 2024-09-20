import { DefaultLayout, Group, Card } from '../lib/components';
import { Placeholder, PlaceholderLine } from 'rn-placeholder';

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
            <Group header="组1" first>
                <Card>{content}</Card>
            </Group>
            <Group header="组2" footer="底部文本">
                <Card>{content}</Card>
            </Group>
        </DefaultLayout>
    );
}
