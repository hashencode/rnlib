import { DefaultLayout, Flex, Group, Badge, Card } from '../../src/components';
import { SIZE } from '../../src/scripts/const';

export default function DemoBadge() {
    return (
        <DefaultLayout head="徽标数 Badge">
            <Group header="基本">
                <Card>
                    <Flex columnGap={SIZE.space_md} wrap="wrap" first>
                        <Badge>新</Badge>
                        <Badge>1</Badge>
                        <Badge>99</Badge>
                        <Badge>9999</Badge>
                    </Flex>
                </Card>
            </Group>
            <Group header="无边框">
                <Card>
                    <Flex columnGap={SIZE.space_md} wrap="wrap">
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
