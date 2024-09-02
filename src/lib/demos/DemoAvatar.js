import { Avatar, DefaultLayout, Flex, Head, Group, Card } from '../components';
import { DEFAULT_IMAGE, SIZE } from '@/lib/scripts/const';

export default function DemoAvatar() {
    return (
        <DefaultLayout head={<Head title="头像 Avatar" />}>
            <Group header="尺寸" first>
                <Card>
                    <Flex columnGap={SIZE.space_middle} wrap="wrap">
                        <Avatar size="large" source={{ uri: DEFAULT_IMAGE }} />
                        <Avatar source={{ uri: DEFAULT_IMAGE }} />
                        <Avatar size="small" source={{ uri: DEFAULT_IMAGE }} />
                    </Flex>
                </Card>
            </Group>
            <Group header="形状">
                <Card>
                    <Flex columnGap={SIZE.space_middle} wrap="wrap">
                        <Avatar source={{ uri: DEFAULT_IMAGE }} shape="square" />
                        <Avatar source={{ uri: DEFAULT_IMAGE }} />
                    </Flex>
                </Card>
            </Group>
            <Group header="文本显示">
                <Card>
                    <Flex columnGap={SIZE.space_middle} wrap="wrap">
                        <Avatar size="large" alt="用户" />
                        <Avatar alt="用户" />
                        <Avatar size="small" alt="用户" />
                    </Flex>
                </Card>
            </Group>
        </DefaultLayout>
    );
}
