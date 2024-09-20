import { COLOR, DEFAULT_IMAGE, SIZE } from '../lib/scripts/const';
import { Placeholder, PlaceholderLine } from 'rn-placeholder';
import { Card, DefaultLayout, Flex, Icon, Text, Group, Image } from '../lib/components';

export default function DemoCard() {
    return (
        <DefaultLayout head="卡片 Card">
            <Group header="无标题" first>
                <Card>
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
                            <Icon name="chevron-right" size={SIZE.icon_xs} color={COLOR.icon_touchable} />
                        </Flex>
                    }
                    footer={<Text>页脚内容</Text>}>
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
