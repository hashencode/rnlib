import { COLOR, DEFAULT_IMAGE, SIZE } from '@/lib/scripts/const';
import { Placeholder, PlaceholderLine } from 'rn-placeholder';
import { Button, Card, DefaultLayout, Flex, Head, Icon, Text, Group, Image } from '../components';

export default function DemoCard() {
    return (
        <DefaultLayout head={<Head title="卡片 Card" />}>
            <Group header="无标题" first>
                <Card>
                    <Placeholder>
                        <PlaceholderLine width={80} />
                        <PlaceholderLine />
                        <PlaceholderLine width={30} />
                    </Placeholder>
                </Card>
            </Group>
            <Group header="标题">
                <Card title="标题">
                    <Placeholder>
                        <PlaceholderLine width={80} />
                        <PlaceholderLine />
                        <PlaceholderLine width={30} />
                    </Placeholder>
                </Card>
            </Group>
            <Group header="自定义插槽">
                <Card
                    title="标题"
                    icon={<Image source={{ uri: DEFAULT_IMAGE }}></Image>}
                    extra={
                        <Flex alignItems="center">
                            <Text color={COLOR.text_desc}>更多</Text>
                            <Icon name="chevron-right" size={SIZE.icon_mini} color={COLOR.icon_touchable} />
                        </Flex>
                    }>
                    <Placeholder>
                        <PlaceholderLine width={80} />
                        <PlaceholderLine />
                        <PlaceholderLine width={30} />
                    </Placeholder>
                </Card>
            </Group>
            <Group>
                <Card
                    title="标题"
                    icon={<Icon name="alarm-clock" />}
                    extra={
                        <Button size="mini" type="primary" ghost>
                            动作按钮
                        </Button>
                    }>
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
