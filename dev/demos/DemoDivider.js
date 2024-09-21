import { DefaultLayout, Divider, Flex, Text, Group, Card } from '../../src/components';

export default function DemoDivider() {
    return (
        <DefaultLayout head="分割线 Divider">
            <Group header="水平分割线" first>
                <Card>
                    <Divider />
                </Card>
            </Group>
            <Group header="垂直分割线">
                <Card>
                    <Flex alignItems="center">
                        <TextBox>A</TextBox>
                        <Divider type="vertical" />
                        <TextBox>B</TextBox>
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
