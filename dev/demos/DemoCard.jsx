import { Placeholder, PlaceholderLine } from 'rn-placeholder';

import { Card, DefaultLayout, Flex, Group, Icon, ImageX, TextX } from '../../src/components';
import { COLOR, DEFAULT_IMAGE, SIZE } from '../../src/scripts/const';

export default function DemoCard() {
    return (
        <DefaultLayout head="卡片 Card">
            <Group first header="无标题">
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
                    extra={
                        <Flex alignItems="center">
                            <TextX color={COLOR.text_desc}>更多</TextX>
                            <Icon color={COLOR.icon_touchable} name="chevron-right" size={SIZE.icon_xs} />
                        </Flex>
                    }
                    footer={<TextX>页脚内容</TextX>}
                    icon={<ImageX source={{ uri: DEFAULT_IMAGE }}></ImageX>}
                    title="标题">
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
