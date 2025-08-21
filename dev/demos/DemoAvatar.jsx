import { Avatar, DefaultLayout, Flex, Group, Card } from '../../src/components';
import { SIZE } from '../../src/scripts/const';
import { DEFAULT_IMAGE } from '../screens/Demo';

export default function DemoAvatar() {
    return (
        <DefaultLayout head="头像 Avatar">
            <Group header="尺寸" first>
                <Card>
                    <Flex columnGap={SIZE.space_md} wrap="wrap">
                        <Avatar size="lg" source={{ uri: DEFAULT_IMAGE }} />
                        <Avatar source={{ uri: DEFAULT_IMAGE }} />
                        <Avatar size="sm" source={{ uri: DEFAULT_IMAGE }} />
                    </Flex>
                </Card>
            </Group>
            <Group header="形状">
                <Card>
                    <Flex columnGap={SIZE.space_md} wrap="wrap">
                        <Avatar source={{ uri: DEFAULT_IMAGE }} shape="square" />
                        <Avatar source={{ uri: DEFAULT_IMAGE }} />
                    </Flex>
                </Card>
            </Group>
            <Group header="文本显示">
                <Card>
                    <Flex columnGap={SIZE.space_md} wrap="wrap">
                        <Avatar size="lg">用户</Avatar>
                        <Avatar>用户</Avatar>
                        <Avatar size="sm">用户</Avatar>
                    </Flex>
                </Card>
            </Group>
        </DefaultLayout>
    );
}
